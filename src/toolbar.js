import { createButton } from './button';
import { createIcon } from './icon';

export const createToolbar = execCommand => {
  const toolbar = document.createElement('div');
  toolbar.className = '__toolbar';

  toolbar.insertAdjacentElement(
    'beforeend',
    createButton('bold', 'Bold', createIcon('fas fa-bold'), execCommand)
  );

  return toolbar;
};
