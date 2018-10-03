import { TOOLBAR_ITEM } from './constants';

export const createInput = (commandId, title, type, execCommand) => {
  const input = document.createElement('input');
  input.dataset.commandId = commandId;
  input.className = TOOLBAR_ITEM;
  input.title = title;
  input.type = type;
  input.addEventListener('change', e => execCommand(commandId, e.target.value));

  return input;
};
