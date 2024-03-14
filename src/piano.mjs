/** @param {{ from: string, to: string, key: string, limit?: number, page?: number, space?: number }} args */
export const pianoExtract = async ({ from, to, key, limit = 1_000, page = 1, space = 632_354 }) => {
  /** @type {import('./types.js').DataOut} */
  const data = await (
    await fetch('https://api.atinternet.io/v3/data/getData', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
      body: JSON.stringify({
        columns: [
          'os',
          'browser',
          'browser_group',
          'browser_version',
          // 'm_unique_visitors',
          'm_page_loads',
          'os.uid',
          'browser.uid',
          'browser_group.uid',
          'browser_version.uid',
        ],
        sort: ['-m_page_loads'],
        space: { s: [space] },
        period: { p1: [{ type: 'D', start: from, end: to }] },
        'max-results': limit,
        'page-num': page,
        options: { ignore_null_properties: true, eco_mode: true },
      }),
    })
  ).json()

  return data.DataFeed.Rows
}
