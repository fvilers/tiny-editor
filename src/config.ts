import {
  faBold, faItalic, faUnderline,
  faAlignCenter, faAlignLeft, faAlignRight,
  faListOl, faListUl, faIndent, faEraser, faOutdent, type IconDefinition
} from '@fortawesome/free-solid-svg-icons'

export const allOptions = [
  'style',
  'font',
  'bold',
  'italic',
  'underline',
  '|',
  'justifyleft',
  'justifycenter',
  'justifyright',
  '|',
  'numlist',
  'bullist',
  'indent',
  'outdent',
  '|',
  'clear'
]

export const styleOptions = [
  { value: 'h1', text: 'Title 1' },
  { value: 'h2', text: 'Title 2' },
  { value: 'h3', text: 'Title 3' },
  { value: 'h4', text: 'Title 4' },
  { value: 'h5', text: 'Title 5' },
  { value: 'h6', text: 'Title 6' },
  { value: 'p', text: 'Paragraph' },
  { value: 'pre', text: 'Preformatted' }
]

export const fontOptions = [
  { value: 'serif', text: 'Serif' },
  { value: 'sans-serif', text: 'Sans Serif' },
  { value: 'monospace', text: 'Monospace' },
  { value: 'cursive', text: 'Cursive' },
  { value: 'fantasy', text: 'Fantasy' }
]

export interface ToolOption {
  tool: string
  title: string
  command?: string
  options?: Array<{ value: string, text: string }>
  defaultValue?: string
  icon?: IconDefinition
}

export const toolOptions: Record<string, ToolOption> = {
  style: { command: 'formatblock', tool: 'select', title: 'Styles', options: styleOptions, defaultValue: 'p' },
  font: { command: 'fontname', tool: 'select', title: 'Font', options: fontOptions, defaultValue: 'serif' },
  bold: { command: 'bold', tool: 'button', title: 'Bold', icon: faBold },
  italic: { command: 'italic', tool: 'button', title: 'Italic', icon: faItalic },
  underline: { command: 'underline', tool: 'button', title: 'Underline', icon: faUnderline },
  justifyleft: { command: 'justifyleft', tool: 'button', title: 'Left align', icon: faAlignLeft },
  justifycenter: { command: 'justifycenter', tool: 'button', title: 'Center align', icon: faAlignCenter },
  justifyright: { command: 'justifyright', tool: 'button', title: 'Right align', icon: faAlignRight },
  numlist: { command: 'insertorderedlist', tool: 'button', title: 'Numbered list', icon: faListOl },
  bullist: { command: 'insertunorderedlist', tool: 'button', title: 'Bulleted list', icon: faListUl },
  indent: { command: 'indent', tool: 'button', title: 'Increase indent', icon: faIndent },
  outdent: { command: 'outdent', tool: 'button', title: 'Decrease indent', icon: faOutdent },
  clear: { command: 'removeFormat', tool: 'button', title: 'Clear formatting', icon: faEraser },
  '|': { tool: 'separator', title: 'separator' },
  default: { command: '', tool: '', title: '', icon: faBold }
}

export const defaultTools = 'blocks font bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | clear'
