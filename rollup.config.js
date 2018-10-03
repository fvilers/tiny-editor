const postcss = require('rollup-plugin-postcss');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    postcss({
      plugins: []
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify.uglify()
  ]
};
