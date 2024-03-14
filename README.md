# Bouygues Telecom web browser coverage

This repository contains code used to generate the web browser coverage report for Bouygues Telecom.

## Usage

In `package.json`:

```json
{
  "browserslist": [
    "extends browserslist-config-bouyguestelecom/production"
    // or:
    "extends browserslist-config-bouyguestelecom/next",
    // and/or:
    "extends browserslist-config-bouyguestelecom/ssr"
  ]
}
```
