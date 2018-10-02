export const createInput = (commandId, title, type, execCommand) => {
  const input = document.createElement('input');
  input.dataset.commandId = commandId;
  input.className = '__toolbar-item';
  input.title = title;
  input.type = type;
  input.addEventListener('change', e => execCommand(commandId, e.target.value));

  return input;
};
