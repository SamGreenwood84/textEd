import { getDb, putDb } from './database';
import { header } from './header';

export default class Editor {
  constructor() {
    this.initializeEditor();
  }

  async initializeEditor() {
    await this.waitForCodeMirror();
    
    const localData = localStorage.getItem('content');
    const indexedDBData = await getDb();

    // Set the initial value of the editor
    const initialValue = indexedDBData || localData || header;
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: initialValue,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Event listener for changes in the editor content
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Event listener for when the editor loses focus
    this.editor.on('blur', () => {
      putDb(localStorage.getItem('content'));
    });
  }

  async waitForCodeMirror() {
    return new Promise((resolve) => {
      if (typeof CodeMirror !== 'undefined') {
        resolve();
      } else {
        // Wait for CodeMirror to be loaded
        document.addEventListener('codemirrorLoaded', resolve);
      }
    });
  }
}
