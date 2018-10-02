import { transformToEditor } from './editor';

(function() {
  document.querySelectorAll('[data-tiny-editor]').forEach(transformToEditor);
})();
