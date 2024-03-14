export type DataOut = {
  DataFeed: {
    Columns: Array<{
      Category: 'Dimension' | 'Metric' | 'rowFilter'
      Name: string
      Type?: 'String' | 'Integer'
      CustomerType?: 'String' | 'Integer'
      Label: string
      Description: string
      Filterable: boolean
    }>
    Rows: Array<{
      browser: string
      browser_group: string
      browser_version: string
      os: string
      m_page_loads: number
      // m_unique_visitors: number
      'browser.uid': string
      'browser_group.uid': string
      'browser_version.uid': string
      'os.uid': string
    }>
    Context: {
      Periods: Array<{
        Value: string
      }>
    }
  }
}
