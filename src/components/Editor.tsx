import React, { useRef, useState, type FunctionComponent, type FocusEventHandler } from 'react'
// import ContentEditable from 'react-contenteditable'
import ContentEditable from './ContentEditable.js'
import Toolbar from './Toolbar.js'
import { defaultTools } from '../config.js'

interface Props {
  options?: string
  html?: string
  onBlur?: (e: any) => void
  onChange?: (html: string) => void
}

function parseTools(tools: string): string[] {
  return tools.split('|').map(section => ['|', ...section.split(/ +/)]).flat().filter(tool => tool !== '').slice(1)
}

export const Editor: FunctionComponent<Props> = ({ options, html, onBlur, onChange }) => {
  const [toolstate, setToolstate] = useState(new Map<string, boolean>())
  const text = useRef(html ?? '')
  const d = useRef<HTMLDivElement>(null)

  const tools = parseTools(options ?? defaultTools)

  const execCommand = (commandId: string, value: string): undefined => {
    console.log('execCommand', commandId, value, d.current)
    if (d.current !== null) {
      d.current.focus()
      document.execCommand(commandId, false, value)
    }
  }

  // Set default paragraph to <p>
  execCommand('defaultParagraphSeparator', 'p')

  const onChangeToolbar = (commandId: string, value: any): undefined => {
    console.log('onChangeToolbar', commandId, value)
    execCommand(commandId, value)
  }

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    console.log('editor handleBlur', e)
    if (onBlur != null) onBlur(e)
  }

  const handleChange = (e: any): void => {
    console.log('handleChange', e.target)
    const b = document.queryCommandState('bold')
    if (toolstate.get('bold') !== b) {
      setToolstate(new Map<string, boolean>([...toolstate, ['bold', b]]))
    }
    console.log('italic', document.queryCommandState('italic'))
    if (onChange != null) onChange(e.target.innerHTML)
  }

  return <>
    <Toolbar options={tools} state={toolstate} onChange={onChangeToolbar} />
    <ContentEditable innerRef={d} html={text.current} onBlur={handleBlur} onChange={handleChange}
      className='__editor'
      onKeyUp={handleChange}
    />
  </>
}

export default Editor
