import React, { useEffect, useRef, useState, type FunctionComponent, type FocusEventHandler } from 'react'
import sanitizeHtml from 'sanitize-html'
import ContentEditable from './ContentEditable.js'
import Toolbar from './Toolbar.js'
import { defaultTools, toolOptions } from '../config.js'
import { execCommand, queryCommandState, queryCommandValue } from '../deprecated.js'

interface Props {
  options?: string
  html?: string
  onBlur?: (e: any) => void
  onChange?: (html: string) => void
}

function parseTools (tools: string): string[] {
  return tools.split('|').map(section => ['|', ...section.split(/ +/)]).flat().filter(tool => tool !== '').slice(1)
}

export const Editor: FunctionComponent<Props> = ({ options, html, onBlur, onChange }) => {
  const [toolstate, setToolstate] = useState(new Map<string, boolean | string>())
  const text = useRef(sanitizeHtml(html ?? '', {
    transformTags: {
      strong: 'b',
      em: 'i'
    }
  }))
  const d = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef<boolean>(true)

  const tools = parseTools(options ?? defaultTools)

  const onChangeToolbar = (commandId: string, value: string): undefined => {
    // console.log('onChangeToolbar', commandId, value)
    if (d.current !== null) {
      d.current.focus()
      console.log('execCommand', commandId, value)
      execCommand(commandId, false, value)
    }
  }

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    // console.log('editor handleBlur', e)
    if (onBlur != null) onBlur(e)
  }

  const updateToolbar = (): void => {
    tools.forEach(item => {
      const opt = toolOptions[item]
      switch (opt.tool) {
        case 'select':
          {
            const { command } = opt
            const cv = queryCommandValue(command)
            const current = toolstate.get(item) ?? ''
            console.log('toolbar', item, command, cv, current)
            if (current !== cv) {
              setToolstate(new Map<string, boolean | string>([...toolstate, [item, cv]]))
            }
          }
          break
        case 'button':
          {
            const { command } = opt
            const cs = queryCommandState(command)
            const current = toolstate.get(item) ?? false
            console.log('toolbar', item, command, cs, current, [...toolstate])
            if (current !== cs) {
              setToolstate(new Map<string, boolean | string>([...toolstate, [item, cs]]))
            }
          }
          break
        default:
          console.log('unknown tool', opt.tool)
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
    if (onChange != null) {
      onChange(sanitizeHtml(e.target.value, {
        transformTags: {
          b: 'strong',
          i: 'em'
        }
      }))
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (isFirstRender.current) {
      // Set default paragraph to <p>
      execCommand('defaultParagraphSeparator', false, 'p')
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
