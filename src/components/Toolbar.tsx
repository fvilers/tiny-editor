import React, { type FunctionComponent } from 'react'
import Button from './Button.js'
import Select from './Select.js'
import { Separator } from './Separator.js'
import { allOptions, toolOptions } from '../config.js'

interface Props {
  options?: string[]
  state: Map<string, boolean>
  onChange: (commandId: string, target: any) => undefined
}

const Toolbar: FunctionComponent<Props> = ({ options, state, onChange }: Props) => {
  let opt = allOptions
  if (options != null) {
    opt = options
  }
  return <div className='__toolbar'>{
    opt.map((value: string, index) => {
      const { tool, title, options, icon, defaultValue } = toolOptions[value]
      switch (tool) {
        case 'select':
          return <Select key={index} title={title} defaultValue={defaultValue ?? ''} options={options ?? []} onChange={onChange} />
        case 'button':
          return <Button key={index} active={state.get(value)} title={title} icon={icon} onClick={onChange} />
        case '|':
          return <Separator key={index} />
        default: return ''
      }
    })
  }</div>
}

export default Toolbar
