import { transformToEditor } from './editor';
import './style.css';

document.querySelectorAll('[data-tiny-editor]').forEach(transformToEditor);
window.transformToEditor = transformToEditor;
