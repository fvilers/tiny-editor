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
      createButton(
        'bold',
        'Bold',
        createIcon('format_bold', options.iconset),
        execCommand
      )
    );
  }

  // Italic
  if (options.italic !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'italic',
        'Italic',
        createIcon('format_italic', options.iconset),
        execCommand
      )
    );
  }

  // Underline
  if (options.underline !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'underline',
        'Underline',
        createIcon('format_underline', options.iconset),
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
        createIcon('format_align_left', options.iconset),
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
        createIcon('format_align_center', options.iconset),
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
        createIcon('format_align_right', options.iconset),
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
        createIcon('format_list_numbered', options.iconset),
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
        createIcon('list', options.iconset),
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
        createIcon('format_indent_decrease', options.iconset),
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
        createIcon('format_indent_increase', options.iconset),
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
        createIcon('format_clear', options.iconset),
        execCommand
      )
    );
  }

  return toolbar;
};
