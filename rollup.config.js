const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify.uglify()
  ]
};
