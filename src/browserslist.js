const regex = {
  /** Operating System */
  os: {
    android: /^android/i,
    chromeos: /^chrome os/i,
    ios: /^(?:ios|ipados)/i,
    linux: /^linux/i,
    macos: /^(?:mac\s?os|OS\sX)/i,
    windows: /^windows/i,
  },
}

/** @type {Record<string, (browser: string, os: string) => any>} */
const browsers = {
  /** Chrome for Android */
  and_chr: (browser, os) => regex.os.android.test(os) && ['Chrome', 'N/A'].includes(browser),
  /** Firefox for Android */
  and_ff: (browser, os) => regex.os.android.test(os) && browser === 'Firefox',
  // and_qq
  // and_uc
  // android
  // baidu
  /** Chrome */
  chrome: (browser, os) => !regex.os.android.test(os) && ['Chrome', 'Brave'].includes(browser),
  /** Edge */
  edge: (browser) => browser === 'Edge',
  /** Firefox */
  firefox: (browser, os) => !regex.os.android.test(os) && browser === 'Firefox',
  /** Safari for iOS */
  ios_saf: (browser, os) => regex.os.ios.test(os) && ['Safari', 'Opera Touch'].includes('Safari'),
  // kaios
  /** Opera Mobile */
  op_mob: (browser) => browser === 'Opera Mobile',
  /** Opera */
  opera: (browser) => browser === 'Opera',
  /** Safari */
  safari: (browser, os) => !regex.os.ios.test(os) && browser === 'Safari',
  /** Samsung */
  samsung: (browser) => browser === 'Samsung Browser',

  unknown: (browser, os) => browser === 'N/A',

  // The following browsers are not included in the browserslist format
  avast: (browser) => browser === 'Avast Secure Browser',
  ccleaner: (browser) => browser === 'CCleaner Browser',
  duckduckgo: (browser) => browser === 'DuckDuckGo Private Browser',
  ecosia: (browser) => browser === 'Ecosia',
  huawei: (browser) => browser === 'Huawei Browser',
  miui: (browser) => browser === 'MIUI Browser',
  opera_gx: (browser) => browser === 'Opera GX',
}

/** @typedef {keyof typeof regex['os']} OS */
/** @typedef {keyof typeof browsers} Browser */

/** @arg {Browser} browser */
const versionFormat = (browser) => {
  const parts = significantVersionParts(browser)
  /** @arg {string} version */
  return (version) => version.split('.').slice(0, parts).join('.')
}

/** @arg {Browser} browser */
const significantVersionParts = (browser) => {
  switch (browser) {
    case 'ios':
    case 'ios_saf':
    case 'safari':
      return 2
    case 'samsung':
    case 'chrome':
    case 'edge':
    case 'firefox':
    case 'opera':
    case 'operamobile':
    default:
      return 1
  }
}

/** @arg {string} os */
const iosSafariVersion = (os) => {
  const v = os.match(/\d+(?:\.\d+)?/)?.[0]
  if (!v?.includes('.')) {
    return `${v}.0`
  }
  return v
}

const currentChromeAndroidVersion = async () => {
  return '122'
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

  const data = await (await fetch('https://browsersl.ist/api/browsers?q=last+1+chromeandroid+version')).json()

  return Object.keys(data?.browsers?.[0]?.versions)?.[0]
}

/** @arg {import('./types.js').DataOut['DataFeed']['Rows']} data */
export const toBrowserslistFormat = (data) => {
  const totalEvents = data.reduce((acc, row) => acc + row.m_page_loads, 0)

  /** @type {Record<Browser, Record<string, number>>} */
  const out = {}

  data.forEach(async (row) => {
    const os = Object.keys(regex.os).find(/** @arg {OS} os */ (os) => regex.os['android'].test(row.os))
    const browser = String(Object.keys(browsers).find((browser) => browsers[browser](row.browser_group, row.os)))
    const versionDetailed =
      row.browser_version === 'N/A' && browser === 'ios_saf' && !row.browser_version.match(/\d+/)?.[0]
        ? iosSafariVersion(row.os)
        : row.browser_version
    let version = versionFormat(browser)(versionDetailed)
    if (os === 'android' && browser === 'and_chr' && version === 'N/A') {
      version = await currentChromeAndroidVersion()
    }

    const share = (100 * row.m_page_loads) / totalEvents
    // 3 digits after the decimal point

    if (out[browser] === undefined) {
      out[browser] = {}
    }
    if (out[browser][version] === undefined) {
      out[browser][version] = 0
    }
    out[browser][version] = +(out[browser][version] + share).toFixed(3)
  })

  // sort the versions in ascending order
  Object.keys(out).forEach((browser) => {
    out[browser] = Object.fromEntries(
      Object.entries(out[browser]).sort(([versionA], [versionB]) => {
        const [majorA, minorA] = versionA.split('.').map(Number)
        const [majorB, minorB] = versionB.split('.').map(Number)

        if (majorA === majorB) {
          return minorA - minorB
        }
        return majorA - majorB
      })
    )
  })

  return out
}
