import React, { type FunctionComponent } from 'react'
import {
  faBold, faItalic, faUnderline,
  faAlignCenter, faAlignLeft, faAlignRight,
  faListOl, faListUl, faIndent, faEraser, faOutdent
} from '@fortawesome/free-solid-svg-icons'
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
          return <Button key={index} commandId='bold' title='Bold' onClick={onChange} ><Icon inverse={true} icon={faBold}/></Button>
        case 'italic':
          return <Button key={index} commandId='italic' title='Italic' onClick={onChange} ><Icon icon={faItalic}/></Button>
        case 'underline':
          return <Button key={index} commandId='underline' title='Underline' onClick={onChange} ><Icon icon={faUnderline}/></Button>
        case 'justifyleft':
          return <Button key={index} commandId='justifyleft' title='Left align' onClick={onChange} ><Icon icon={faAlignLeft}/></Button>
        case 'justifycenter':
          return <Button key={index} commandId='justifycenter' title='Center align' onClick={onChange} ><Icon icon={faAlignCenter}/></Button>
        case 'justifyright':
          return <Button key={index} commandId='justifyright' title='Right align' onClick={onChange} ><Icon icon={faAlignRight}/></Button>
        case 'numberlist':
          return <Button key={index} commandId='insertorderedlist' title='Numbered list' onClick={onChange} ><Icon icon={faListOl}/></Button>
        case 'bulletlist':
          return <Button key={index} commandId='insertunorderedlist' title='Bulleted list' onClick={onChange} ><Icon icon={faListUl}/></Button>
        case 'indent':
          return <Button key={index} commandId='indent' title='Increase indent' onClick={onChange} ><Icon icon={faIndent}/></Button>
        case 'outdent':
          return <Button key={index} commandId='outdent' title='Decrease indent' onClick={onChange} ><Icon icon={faOutdent}/></Button>
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
