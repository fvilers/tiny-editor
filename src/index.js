import { transformToEditor } from './editor';

// TODO: this don't work with rollup, move CSS elsewhere
// import './style.css';

(function() {
  document.querySelectorAll('[data-tiny-editor]').forEach(transformToEditor);
})();
