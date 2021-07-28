---
layout: post
title: "Accept Jest snapshot baselines with GitHub"
date: 2021-07-26 09:00:00 -0700
tags: [DevOps, GitHub, Jest]
categories: DevOps
image: github-x-jest.jpg
cover-image:
description: Reviewing & accepting jest snapshot changes as part of a GitHub Pull Request.
---

🚧🚧🚧 Currently being written 🚧🚧🚧

In this exploration we take a look at how to review and accept new Jest snapshots as part of a Pull Request _without having to jump back onto your development branch locally and rerun all the tests!_

* TOC
{:toc}

### Setup

My initial setup for this was a Simple react app:

  ```jsx
  export default App = () => {
    return <h1>A very simple react app!</h1>;
  }
  ```

A Single jest [snapshot test](https://jestjs.io/docs/snapshot-testing):

  ```js
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  ```

And a CI workflow that ensures tests must pass before a PR completes:

  ![Screenshot showing GitHub requiring build and tests to pass before a PR can be merged.]({{site.baseurl}}/assets/images/pr-requires-build-and-test.png)

View setup: <https://github.com/JamesBurnside/accept-new-changes-in-pr-exploration/tree/0.1.0>.

### Creating a GitHub slash command

Simplest way to achieve this would be to create a slash command in the form of a PR comment to trigger the snapshots to update

We can use the [GitHub comment trigger API](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#issue_comment) to run the action that will update our test.

Here is the final yml which we will breakdown in the next section:

```yml
{% raw %}
name: Update snapshots

on:
  # Run any time any issue has a new comment on (this includes PRs)
  issue_comment:
    types: [created]

jobs:
  snapshot_slash_command:
    name: Update snapshot slash command
    # This job will only run if the comment was on a pull requests and matches the slash command
    if: ${{ github.event.issue.pull_request && github.event.comment.body == '/update-snapshots'}}
    runs-on: ubuntu-latest
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE so job can access it
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
          # Use a machine account when checking out. This is to workaround the issue were GitHub
          # actions, when using the default account, cannot trigger other actions.
          token: ${{ secrets.MACHINE_ACCOUNT_PAT }}
      # Get the branch the PR is associated to
      - name: Get Branch
        id: getbranch
        run: |
          branch=$(\
            curl \
              -H 'authorization: Bearer ${{ secrets.GITHUB_TOKEN }}' \
              https://api.github.com/repos/${{ github.repository }}/pulls/${{ github.event.issue.number }} \
            | jq -r '.head.ref')
          echo "::set-output name=branch::$branch"
      # Hop into the PR branch
      - name: Checkout tag/branch
        run: git checkout ${{ steps.getbranch.outputs.branch }}
      # Ensure node is installed on the test runner
      - name: Install Node.js
        uses: actions/setup-node@v1
      # Install test run dependencies
      - name: Install dependencies
        run: npm install
      # Update the jest snapshots
      - name: Update snapshots
        run: npm run update-snapshots
      # Setup bot information for pushing new changes
      # Here we use the id from the github actions bot: https://api.github.com/users/better-informatics%5Bbot%5D
      - name: Setup bot git information
        run: |
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git config user.name "github-actions[bot]"
      # Commit changes to snapshot files.
      - name: Commit new snapshots
        run: |
          git add *.snap
          git commit -m 'Updating jest snapshots'
          git push
{% endraw %}
```

#### Slash command breakdown

Have the action trigger anytime a PR has a new comment on:

```yml
on:
  # Run any time any issue has a new comment on (this includes PRs)
  issue_comment:
    types: [created]
```

Ensure the action only continues if the comment is our slash command `/update-snapshots`:

```yml
{% raw %}
jobs:
  snapshot_slash_command:
    name: Update snapshot slash command
    # This job will only run if the comment matches "update snapshots"
    if: ${{ github.event.comment == 'update snapshots'}}
{% endraw %}
```

We are using a machine account personal access token (PAT) when performing the checkout. This is a workaround because GitHub does not, when using the default account, let actions trigger other actions. In our case we want to commit the updated snapshots and have our CI build be kicked off again. To make that happen we commit the changes on behalf of a machine account. This isn't ideal and you can read more about it here, as well as alternative workarounds [here](https://github.com/peter-evans/create-pull-request/issues/48) and [here](https://stackoverflow.com/questions/62750603/github-actions-trigger-another-action-after-one-action-is-completed/65698892#65698892).

```yml
{% raw %}
# Checkout the repo
- uses: actions/checkout@v2
  with:
    fetch-depth: 0
    # Use a machine account when checking out. This is to workaround the issue were GitHub
    # actions, when using the default account, cannot trigger other actions.
    token: ${{ secrets.MACHINE_ACCOUNT_PAT }}
{% endraw %}
```

To have the action be able to update the pull request it needs to hop onto the development branch and update the snapshots from there. Because this action is technically run off the main branch we have to grab the branch name using the GitHub REST API ([related pulls API docs](https://docs.github.com/en/rest/reference/pulls)) and use [`jq`](https://stedolan.github.io/jq/) json parser to get the branch name from the response:

```yml
# Get the branch the PR is associated to
- name: Get Branch
  id: getbranch
  run: |
    branch=$(\
      curl \
        -H 'authorization: Bearer ${{ secrets.GITHUB_TOKEN }}' \
        https://api.github.com/repos/${{ github.repository }}/pulls/${{ github.event.issue.number }} \
      | jq -r '.head.ref')
    echo "::set-output name=branch::$branch"
# Hop into the PR branch
- name: Checkout tag/branch
  run: git checkout ${{ steps.getbranch.outputs.branch }}
```

We can now have our action update the snapshots. This project has a script in the package.json to run updates snapshots:

```js
/// package.json
{
  ...
  "scripts": {
    ...
    "update-snapshots": "jest --update-snapshot"
  }
}
```

Which we can call inside the GitHub action:

```yml
# Install test run dependencies
- name: Install dependencies
  run: npm run install
# Update the jest snapshots
- name: Update snapshots
  run: npm run update-snapshots
```

Then have the GitHub action upload the results to our PR. By default, runners don't have any git credentials to associate the commits with, before committing our changes we give the runner a quick git username and email so the commit. The credentials we use are the same as the GitHub action bot so the profile image and name is contextually relevant in the GitHub Pull Request UI:

```yml
# Setup bot information for pushing new changes
# Here we use the id from the github actions bot: https://api.github.com/users/better-informatics%5Bbot%5D
- name: Setup bot git information
  run: |
    git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
    git config user.name "github-actions[bot]"
# Commit changes to snapshot files.
- name: Commit new snapshots
  run: |
    git add *.snap
    git commit -m 'Updating jest snapshots'
    git push
```

Then lets see the results!
First we create a PR and make a small change:

![Screenshot showing the GitHub diff, highlighting the text that has been changed.]({{site.baseurl}}/assets/images/github-x-jest-small-change.png)

We now see our PR verification fails:

![Screenshot the GitHub PR failing the 'build and test' status check.]({{site.baseurl}}/assets/images/github-x-jest-pr-failure.png)

Because the snapshots are different:

![Screenshot the GitHub PR failing the 'build and test' status check.]({{site.baseurl}}/assets/images/github-x-jest-pr-failure-details.png)

In this next gif, we can see slash command in action successfully updating the PR and making it pass the tests run in the CI:

![screen capture showing a user making use of the slash command to update their PR.]({{site.baseurl}}/assets/images/git-x-jest-slashcommand-runthrough.gif)

View final repo configuration: <https://github.com/JamesBurnside/accept-new-changes-in-pr-exploration/tree/0.2.0>
