# Dev Instructions

## Prerequisites

1. Install [Ruby](https://www.ruby-lang.org/en/downloads/) (with DevKit)
1. Install [Jekyll](https://jekyllrb.com/docs/installation/)

## Run site locally

1. Install dependencies

   ```bash
   bundle install
   ```

1. Run site

   ```bash
   bundle exec jekyll serve
   ```

## Troubleshooting

### `require': cannot load such file -- webrick

Run:

```bash
bundle add webrick
```
