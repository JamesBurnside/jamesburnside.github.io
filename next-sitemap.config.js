/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jamesburnside.github.io',
  generateRobotsTxt: true,
  autoLastmod: false,
  generateIndexSitemap: false
}
