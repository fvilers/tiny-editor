import React, { type FunctionComponent } from 'react'
import Button from './Button.js'
import Icon from './Icon.js'
import Input from './Input.js'
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
  'forecolor',
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
          return <Button key={index} commandId='bold' title='Bold' onClick={onChange} ><Icon className='fas fa-bold' /></Button>
        case 'italic':
          return <Button key={index} commandId='italic' title='Italic' onClick={onChange} ><Icon className='fas fa-italic'/></Button>
        case 'underline':
          return <Button key={index} commandId='underline' title='Underline' onClick={onChange} ><Icon className='fas fa-underline'/></Button>
        case 'forecolor':
          return <Input key={index} commandId='forecolor' title='Text color' type='color' onChange={onChange} />
        case 'justifyleft':
          return <Button key={index} commandId='justifyleft' title='Left align' onClick={onChange} ><Icon className='fas fa-align-left'/></Button>
        case 'justifycenter':
          return <Button key={index} commandId='justifycenter' title='Center align' onClick={onChange} ><Icon className='fas fa-align-center'/></Button>
        case 'justifyright':
          return <Button key={index} commandId='justifyright' title='Right align' onClick={onChange} ><Icon className='fas fa-align-right'/></Button>
        case 'numberlist':
          return <Button key={index} commandId='insertorderedlist' title='Numbered list' onClick={onChange} ><Icon className='fas fa-list-ol'/></Button>
        case 'bulletlist':
          return <Button key={index} commandId='insertunorderedlist' title='Bulleted list' onClick={onChange} ><Icon className='fas fa-list-ul'/></Button>
        case 'indent':
          return <Button key={index} commandId='indent' title='Increase indent' onClick={onChange} ><Icon className='fas fa-indent'/></Button>
        case 'outdent':
          return <Button key={index} commandId='outdent' title='Decrease indent' onClick={onChange} ><Icon className='fas fa-indent fa-flip-horizontal'/></Button>
        case 'clear':
          return <Button key={index} commandId='removeFormat' title='Clear formatting' onClick={onChange} ><Icon className='fas fa-eraser'/></Button>
        case '|':
          return <Separator key={index} />
        default: return ''
      }
    })
  }</div>
}

export default Toolbar
