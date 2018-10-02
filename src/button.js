export const createButton = (commandId, title, children, execCommand) => {
  const button = document.createElement('button');
  button.dataset.commandId = commandId;
  button.className = '__toolbar-item';
  button.title = title;
  button.insertAdjacentElement('afterbegin', children);
  button.addEventListener('click', () => execCommand(commandId));

  return button;
};
