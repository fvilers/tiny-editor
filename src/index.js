import { transformToEditor } from './editor';
import './style.css';

(function() {
  document.querySelectorAll('[data-tiny-editor]').forEach(transformToEditor);
})();
