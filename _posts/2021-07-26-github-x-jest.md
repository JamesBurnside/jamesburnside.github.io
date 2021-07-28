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

Currently being written... ✍✍✍

<!-- * TOC
{:toc} -->

## Setup

My initial setup for this was:

- New [Create React App](https://create-react-app.dev/docs/getting-started/)

  ```bash
  npx create-react-app github-jest-test
  ```

- Single jest [snapshot test](https://jestjs.io/docs/snapshot-testing)

  ```js
  import React from 'react';
  import renderer from 'react-test-renderer';
  import App from './app';

  test('app render matches baseline', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  ```

- CI workflow that ensures tests must pass before

  ```yml
  # .github/workflows/ci.yml
  name: CI

  on:
    # Run this workflow for all Pull Requests
    pull_request:
  ```

## Using GitHub comments

Simplest way to achieve this would be to leave a comment on a GitHub PR asking

Then we can use the [GitHub comment trigger API](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#issue_comment) to run the action that will update our test.

### Create the GitHub comment action trigger

Firstly, have the action trigger anytime a PR has a new comment on:

```yml
on:
  issue_comment:
    types: [created]
```

Next, ensure the action only continues if the comment is our special key phrase update snapshots:

```yml
jobs:
  pr_commented:
    name: PR comment
    # This job will only run if the comment matches "update snapshots"
    if: ${{ github.event.comment == 'update snapshots'}}
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "Here we will add the code to have the action update the snapshots and commit them to our PR"
```

We can now have our action update snapshots. This project has a script in the package.json to run updates snapshots:

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
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE so job can access it
      - uses: actions/checkout@v2
      # Install test run dependencies
      - name: Install dependencies
        run: npm run install
      # Update the jest snapshots
      - name: Update snapshots
        run: npm run update-snapshots
```

Then have the GitHub action upload the results to our PR:

```yml
      # Commit changes to snapshot files.
      - name: Commit new snapshots
        run: |
          git add *.snap
          git commit -m 'Updating jest snapshots
          git push
```

Then lets see the results!
First we create a PR, and see our PR verification fails because the test snapshots are different:

Next we can see the action

You can see the full code of this action here:
