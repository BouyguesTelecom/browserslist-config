const commonRules = `
  fully supports es6-module
  fully supports cryptography
  >= 0.2% in my stats
  last 3 years
`
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .join(' AND ')

export default {
  production: [commonRules, 'not dead'],
  next: [`${commonRules} AND fully supports css-color-function`, 'not dead'],
  ssr: ['maintained node versions', 'not node 21'],
}
