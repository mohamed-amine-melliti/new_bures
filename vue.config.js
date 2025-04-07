module.exports = {
  pages: {
    reserver: {
      entry: 'src/main.ts',        // entry point of your Vue app
      template: 'public/reserver.html',
      filename: 'reserver.html',
      title: 'Réserver un VTC',
    },
    vitrine: {
      entry: 'src/empty.ts',       // dummy entry (not used, can be tiny)
      template: 'public/vitrine.html',
      filename: 'index.html',
      title: 'Vitrine',
    },
  },
}
