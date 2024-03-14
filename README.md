# Bouygues Telecom web browser coverage

This repository contains code used to generate the web browser coverage report for Bouygues Telecom.

## Motivation

A single source of truth for the web browser coverage provides the following benefits:

- ✅ **Consistency**: ensure a the same browser support accross projects;
- ⚡ **Performance**: reduce the amount of code sent to the client (when using a smart bundler);
- ♻️ **Green**: reduce the amount of energy used at build time (less transpiling & polyfilling) and runtime (less code to parse & execute);

## Usage

In `package.json`:

```json
{
  "devDependencies": {
    "browserslist": "^4",
    "browserslist-config-bouyguestelecom": "latest"
  },
  "browserslist": [
    "extends browserslist-config-bouyguestelecom",
    // or:
    "extends browserslist-config-bouyguestelecom/next",
    // and/or:
    "extends browserslist-config-bouyguestelecom/ssr"
  ]
}
```

Then proceed to use [autoprefixer](https://github.com/postcss/autoprefixer), [babel](https://github.com/babel/babel/tree/master/packages/babel-preset-env), [postcss](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env), [stylelint](https://github.com/RJWadley/stylelint-no-unsupported-browser-features), or any other tool that uses [Browserslist](https://github.com/browserslist/browserslist).

## Configurations

### `browserslist-config-bouyguestelecom`

Supported web browsers for production.

### `browserslist-config-bouyguestelecom/next`

Supported web browsers on the edge.

### `browserslist-config-bouyguestelecom/ssr`

Supported Node.js versions.
