import React, { type KeyboardEventHandler, type FunctionComponent, type MouseEventHandler } from 'react'
import Toolbar from './Toolbar.js'

interface Props {
  options?: string[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rgbToHex = (color: string): string => {
  const digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color)
  if (digits == null) {
    return ''
  }
  const red = parseInt(digits[2])
  const green = parseInt(digits[3])
  const blue = parseInt(digits[4])
  const rgb = blue | (green << 8) | (red << 16)

  return digits[1] + '#' + rgb.toString(16).padStart(6, '0')
}

const Editor: FunctionComponent<Props> = ({ options }) => {
  const execCommand = (commandId: string, value: string): undefined => {
    document.execCommand(commandId, false, value)
    // editor.focus() TODO
  }

  // Set default paragraph to <p>
  execCommand('defaultParagraphSeparator', 'p')

  const onChangeToolbar = (commandId: string, value: any): undefined => {
    console.log('onChangeToolbar', commandId, value)
    execCommand(commandId, value)
  }

  const onKeyUpdown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    console.log('onKeyUpdown textarea', e)
  }
  const onClick: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    console.log('onClick textarea', e)
  }

  return <>
    <Toolbar options={options} onChange={onChangeToolbar} />
    <textarea
      className='__editor'
      contentEditable={true}
      onKeyDown={onKeyUpdown}
      onKeyUp={onKeyUpdown}
      onClick={onClick}
    />
  </>
}

export default Editor
