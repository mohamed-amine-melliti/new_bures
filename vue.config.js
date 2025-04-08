module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/vitrine.html' },
        { from: /^\/app/, to: '/index.html' },
      ],
    },
  },
}
