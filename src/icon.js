const getFontAwesomeIcon = icon => {
  const faIcons = {
    'format_bold': 'fas fa-bold',
    'format_italic': 'fas fa-italic',
    'format_underlined': 'fas fa-underline',
    'format_align_left': 'fas fa-align-left',
    'format_align_center': 'fas fa-align-center',
    'format_align_right': 'fas fa-align-left',
    'format_list_numbered': 'fas fa-list-ul',
    'list': 'fas fa-list-ol',
    'format_indent_decrease': 'fas fa-indent fa-flip-horizontal',
    'format_indent_increase': 'fas fa-indent',
    'format_clear': 'fas fa-eraser'
  };

  return faIcons[icon];
}

export const createIcon = (icon, iconset) => {
  const i = document.createElement('i');

  if (iconset == 'material-icons') {
    i.className = 'material-icons';
    i.innerHTML = icon;
  } else if (iconset == 'material-symbols') {
    i.className = 'material-symbols';
    i.innerHTML = icon;
  } else {
    i.className = getFontAwesomeIcon(icon);
  }

  return i;
};


