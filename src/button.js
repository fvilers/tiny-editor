import { BEFORE_END, TOOLBAR_ITEM } from './constants';

export const createButton = (commandId, title, children, execCommand) => {
  const button = document.createElement('button');
  button.dataset.commandId = commandId;
  button.className = TOOLBAR_ITEM;
  button.title = title;
  button.type = 'button';
  button.insertAdjacentElement(BEFORE_END, children);
  button.addEventListener('click', () => execCommand(commandId));

  return button;
};
