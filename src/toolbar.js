import { createSelect } from './select';
import { createButton } from './button';
import { createIcon } from './icon';
import { createInput } from './input';
import { BEFORE_END } from './constants';

const NO = 'no';

const createSeparator = () => {
  const separator = document.createElement('span');
  separator.className = '__toolbar-separator';

  return separator;
};

export const createToolbar = (options, execCommand) => {
  const toolbar = document.createElement('div');
  toolbar.className = '__toolbar';

  // Styles
  if (options.formatblock !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createSelect(
        'formatblock',
        'Styles',
        [
          { value: 'h1', text: 'Title 1' },
          { value: 'h2', text: 'Title 2' },
          { value: 'h3', text: 'Title 3' },
          { value: 'h4', text: 'Title 4' },
          { value: 'h5', text: 'Title 5' },
          { value: 'h6', text: 'Title 6' },
          { value: 'p', text: 'Paragraph', selected: true },
          { value: 'pre', text: 'Preformatted' }
        ],
        execCommand
      )
    );
  }

  // Font
  if (options.fontname !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createSelect(
        'fontname',
        'Font',
        [
          { value: 'serif', text: 'Serif', selected: true },
          { value: 'sans-serif', text: 'Sans Serif' },
          { value: 'monospace', text: 'Monospace' },
          { value: 'cursive', text: 'Cursive' },
          { value: 'fantasy', text: 'Fantasy' }
        ],
        execCommand
      )
    );
  }

  // Bold
  if (options.bold !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton('bold', 'Bold', createIcon('fas fa-bold'), execCommand)
    );
  }

  // Italic
  if (options.italic !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton('italic', 'Italic', createIcon('fas fa-italic'), execCommand)
    );
  }

  // Underline
  if (options.underline !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'underline',
        'Underline',
        createIcon('fas fa-underline'),
        execCommand
      )
    );
  }

  // Text color
  if (options.forecolor !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createInput('forecolor', 'Text color', 'color', execCommand)
    );
  }

  // Separator
  toolbar.insertAdjacentElement(BEFORE_END, createSeparator());

  // Left align
  if (options.justifyleft !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'justifyleft',
        'Left align',
        createIcon('fas fa-align-left'),
        execCommand
      )
    );
  }

  // Center align
  if (options.justifycenter !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'justifycenter',
        'Center align',
        createIcon('fas fa-align-center'),
        execCommand
      )
    );
  }

  // Right align
  if (options.justifyright !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'justifyright',
        'Right align',
        createIcon('fas fa-align-right'),
        execCommand
      )
    );
  }

  // Separator
  toolbar.insertAdjacentElement(BEFORE_END, createSeparator());

  // Numbered list
  if (options.insertorderedlist !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'insertorderedlist',
        'Numbered list',
        createIcon('fas fa-list-ol'),
        execCommand
      )
    );
  }

  // Bulleted list
  if (options.insertunorderedlist !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'insertunorderedlist',
        'Bulleted list',
        createIcon('fas fa-list-ul'),
        execCommand
      )
    );
  }

  // Decrease indent
  if (options.outdent !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'outdent',
        'Decrease indent',
        createIcon('fas fa-indent fa-flip-horizontal'),
        execCommand
      )
    );
  }

  // Increase indent
  if (options.indent !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'indent',
        'Increase indent',
        createIcon('fas fa-indent'),
        execCommand
      )
    );
  }

  // Separator
  toolbar.insertAdjacentElement(BEFORE_END, createSeparator());

  // Clear formatting
  if (options.removeFormat !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'removeFormat',
        'Clear formatting',
        createIcon('fas fa-eraser'),
        execCommand
      )
    );
  }

  return toolbar;
};
