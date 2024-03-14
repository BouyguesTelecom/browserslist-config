# Bouygues Telecom web browser coverage

This repository contains code used to generate the web browser coverage report for Bouygues Telecom.

## Usage

In `package.json`:

```json
{
  "devDependencies": {
    "browserslist": "^4",
    "browserslist-config-bouyguestelecom": "*"
  },
  "browserslist": [
    "extends browserslist-config-bouyguestelecom/production",
    // or:
    "extends browserslist-config-bouyguestelecom/next",
    // and/or:
    "extends browserslist-config-bouyguestelecom/ssr"
  ]
}
```

Then proceed to use [autoprefixer](https://github.com/postcss/autoprefixer), [babel](https://github.com/babel/babel/tree/master/packages/babel-preset-env), [postcss](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env), [stylelint](https://github.com/RJWadley/stylelint-no-unsupported-browser-features), or any other tool that uses [Browserslist](https://github.com/browserslist/browserslist).
