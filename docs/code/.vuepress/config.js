// auto generated sidebar
const { sidebarTree } = require('../config');

const tree = { ...sidebarTree('Mainpage title') };

module.exports = {
  dest: 'dist',
  locales: {
    '/': {
      title: 'vuepress-jsdoc',
      description: 'Generate jsdoc markdown files for vuepress'
    }
  },
  themeConfig: {
    editLinks: true,
    sidebarDepth: 4,
    docsDir: 'code',
    sidebar: Object.keys(tree).map(path => {
      return { path, children: tree[path] };
    })
  }
};