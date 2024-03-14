#!/usr/bin/env node

/**
 * @example
 *  ./src/misc-cli.js
 */

process.on('SIGPIPE', process.exit)

// 0. Read stdin

const stdin = process.openStdin()
let data = ''
stdin.on('data', (chunk) => {
  data += chunk
})

stdin.on('end', () => {
  // we have all the data now, ready to parse
  const cov = JSON.parse(data)

  const versionCompare = (a, b) => {
    const partsA = a.split('.').map(Number)
    const partsB = b.split('.').map(Number)
    for (let i = 0; i < partsA.length; i++) {
      if (partsA[i] > partsB[i]) return 1
      if (partsA[i] < partsB[i]) return -1
    }
    return 0
  }

  // extract the minimum version for each browser
  const minimumVersions = cov.browsers.reduce((acc, browser) => {
    const [name, version] = browser.split(' ')
    const current = acc[name]
    if (!current) {
      acc[name] = version
    } else {
      acc[name] = versionCompare(current, version) === 1 ? version : current
    }
    return acc
  }, {})

  console.log(JSON.stringify(minimumVersions, null, 2))
})
