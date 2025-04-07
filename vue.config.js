// vue.config.js
module.exports = {
  pages: {
    index: {
      entry: 'public/vitrine.js', // dummy file
      template: 'public/vitrine.html',
      filename: 'index.html'
    },
    reserver: {
      entry: 'src/main.ts', // your Vue app entry
      template: 'public/reserver.html',
      filename: 'reserver.html'
    }
  },
  filenameHashing: false
}
