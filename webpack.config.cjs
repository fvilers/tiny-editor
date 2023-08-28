module.exports = (env) => {
  if (env.dev) {
    return require(`./webpack.dev.cjs`)
  }
  if (env.prod) {
    return require(`./webpack.prod.cjs`)
  }
}
