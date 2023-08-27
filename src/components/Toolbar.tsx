import React, { type FunctionComponent } from 'react'
import {
  faBold, faItalic, faUnderline,
  faAlignCenter, faAlignLeft, faAlignRight,
  faListOl, faListUl, faIndent, faEraser, faOutdent
} from '@fortawesome/free-solid-svg-icons'
import ToggleButton from './ToggleButton.js'
import Button from './Button.js'
import Icon from './Icon.js'
import Select from './Select.js'
import { Separator } from './Separator.js'

interface Props {
  options?: string[]
  onChange: (commandId: string, target: any) => undefined
}

const allOptions = [
  'formatblock',
  'fontname',
  'bold',
  'italic',
  'underline',
  '|',
  'justifyleft',
  'justifycenter',
  'justifyright',
  '|',
  'numberlist',
  'bulletlist',
  'indent',
  'outdent',
  '|',
  'clear'
]

const styleOptions = [
  { value: 'h1', text: 'Title 1' },
  { value: 'h2', text: 'Title 2' },
  { value: 'h3', text: 'Title 3' },
  { value: 'h4', text: 'Title 4' },
  { value: 'h5', text: 'Title 5' },
  { value: 'h6', text: 'Title 6' },
  { value: 'p', text: 'Paragraph' },
  { value: 'pre', text: 'Preformatted' }
]

const fontOptions = [
  { value: 'serif', text: 'Serif' },
  { value: 'sans-serif', text: 'Sans Serif' },
  { value: 'monospace', text: 'Monospace' },
  { value: 'cursive', text: 'Cursive' },
  { value: 'fantasy', text: 'Fantasy' }
]

const Toolbar: FunctionComponent<Props> = ({ options, onChange }: Props) => {
  let opt = allOptions
  if (options != null) {
    opt = options
  }
  return <div className='__toolbar'>{
    opt.map((value: string, index) => {
      switch (value) {
        case 'formatblock':
          return <Select key={index} commandId='formatblock' title='Styles' defaultValue='p' options={styleOptions} onChange={onChange} />
        case 'fontname':
          return <Select key={index} commandId='fontname' title='Font' defaultValue='serif' options={fontOptions} onChange={onChange} />
        case 'bold':
          return <ToggleButton key={index} commandId='bold' title='Bold' onClick={onChange} ><Icon icon={faBold}/></ToggleButton>
        case 'italic':
          return <ToggleButton key={index} commandId='italic' title='Italic' onClick={onChange} ><Icon icon={faItalic}/></ToggleButton>
        case 'underline':
          return <ToggleButton key={index} commandId='underline' title='Underline' onClick={onChange} ><Icon icon={faUnderline}/></ToggleButton>
        case 'justifyleft':
          return <ToggleButton key={index} commandId='justifyleft' title='Left align' onClick={onChange} ><Icon icon={faAlignLeft}/></ToggleButton>
        case 'justifycenter':
          return <ToggleButton key={index} commandId='justifycenter' title='Center align' onClick={onChange} ><Icon icon={faAlignCenter}/></ToggleButton>
        case 'justifyright':
          return <ToggleButton key={index} commandId='justifyright' title='Right align' onClick={onChange} ><Icon icon={faAlignRight}/></ToggleButton>
        case 'numberlist':
          return <ToggleButton key={index} commandId='insertorderedlist' title='Numbered list' onClick={onChange} ><Icon icon={faListOl}/></ToggleButton>
        case 'bulletlist':
          return <ToggleButton key={index} commandId='insertunorderedlist' title='Bulleted list' onClick={onChange} ><Icon icon={faListUl}/></ToggleButton>
        case 'indent':
          return <ToggleButton key={index} commandId='indent' title='Increase indent' onClick={onChange} ><Icon icon={faIndent}/></ToggleButton>
        case 'outdent':
          return <ToggleButton key={index} commandId='outdent' title='Decrease indent' onClick={onChange} ><Icon icon={faOutdent}/></ToggleButton>
        case 'clear':
          return <Button key={index} commandId='removeFormat' title='Clear formatting' onClick={onChange} ><Icon icon={faEraser}/></Button>
        case '|':
          return <Separator key={index} />
        default: return ''
      }
    })
  }</div>
}

export default Toolbar
