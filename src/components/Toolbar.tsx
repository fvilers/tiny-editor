import React, { type FunctionComponent } from 'react'
import Button from './Button.js'
import Select from './Select.js'
import { Separator } from './Separator.js'
import { allOptions, toolOptions } from '../config.js'

interface Props {
  options?: string[]
  state: Map<string, boolean>
  onChange: (commandId: string, value: string) => undefined
}

const Toolbar: FunctionComponent<Props> = ({ options, state, onChange }: Props) => {
  let opt = allOptions
  if (options != null) {
    opt = options
  }
  return <div className='__toolbar'>{
    opt.map((value: string, index) => {
      const { tool, title, options, icon, defaultValue, command } = toolOptions[value]
      switch (tool) {
        case 'select':
          return <Select
            key={index} title={title}
            defaultValue={defaultValue ?? ''} options={options ?? []}
            onChange={(value) => { onChange(command ?? '', value) }}
          />
        case 'button':
          return <Button
            key={index} title={title}
            active={state.get(value)} icon={icon}
            onClick={() => { onChange(command ?? '', '') }}
          />
        case 'separator':
          return <Separator key={index} />
        default: return ''
      }
    })
  }</div>
}

export default Toolbar
