import React, { useEffect, useRef, useState, type FunctionComponent, type FocusEventHandler } from 'react'
// import ContentEditable from 'react-contenteditable'
import ContentEditable from './ContentEditable.js'
import Toolbar from './Toolbar.js'
import { defaultTools, toolOptions } from '../config.js'

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
  const isFirstRender = useRef<boolean>(true)

  const tools = parseTools(options ?? defaultTools)

  const execCommand = (commandId: string, value: string): undefined => {
    console.log('execCommand', commandId, value, d.current)
    if (d.current !== null) {
      d.current.focus()
      document.execCommand(commandId, false, value)
    }
  }

  const onChangeToolbar = (commandId: string, value: string): undefined => {
    console.log('onChangeToolbar', commandId, value)
    execCommand(commandId, value)
  }

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    // console.log('editor handleBlur', e)
    if (onBlur != null) onBlur(e)
  }

  const updateToolbar = (): void => {
    tools.forEach(tool => {
      const command = toolOptions[tool].command
      if (command != null) {
        const cs = document.queryCommandState(command)
        const current = toolstate.get(tool) ?? false
        // console.log('toolbar', tool, cs, current)
        if (current !== cs) {
          setToolstate(new Map<string, boolean>([...toolstate, [tool, cs]]))
        }
      }
    })
  }

  const handleKeys = (e: any): void => {
    // console.log('keys', e)
    updateToolbar()
  }

  const handleClick = (e: any): void => {
    // console.log('click', e)
    updateToolbar()
  }

  const handleChange = (e: any): void => {
    updateToolbar()
    if (onChange != null) onChange(e.target.value)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (isFirstRender.current) {
      // Set default paragraph to <p>
      execCommand('defaultParagraphSeparator', 'p')
    }
    isFirstRender.current = false
    return () => { isFirstRender.current = true }
  }, [])

  return <>
    <Toolbar options={tools} state={toolstate} onChange={onChangeToolbar} />
    <ContentEditable innerRef={d} html={text.current} onBlur={handleBlur} onChange={handleChange}
      className='__editor'
      onKeyUp={handleKeys}
      onClick={handleClick}
    />
  </>
}

export default Editor
