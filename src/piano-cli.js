#!/usr/bin/env node

/**
 * @example
 *  ./src/piano-cli.js --from 2024-01-01 --to 2024-01-31 --key <API_KEY>
 */

import minimist from 'minimist'
import { toBrowserslistFormat } from './browserslist.js'
import { pianoExtract } from './piano.js'

// 1. Extract the command line arguments

const args = minimist(process.argv.slice(2))
const { from, to, key, limit, page, space } = args

if (!key) {
  console.error('Error: missing --key argument')
  process.exit(1)
}

// 2. Fetch and extract piano data

/** @type {import('./types.js').DataOut['DataFeed']['Rows']} */
const data = await pianoExtract({ from, to, key, limit, page, space })

// console.log(JSON.stringify(data, null, 2))

// 3. Map the data to the browserslist format
const out = toBrowserslistFormat(data)

console.log(JSON.stringify(out, null, 2))
