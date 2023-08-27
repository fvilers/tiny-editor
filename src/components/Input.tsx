import React, { type ChangeEventHandler, type FunctionComponent } from 'react'

interface Props {
  title: string
  type: string
  onChange: (commandId: string, target: any) => undefined
  commandId: string
}

const Button: FunctionComponent<Props> = ({ title, type, onChange, commandId }: Props) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(commandId, e.target)
  }

  return <input type='input' title={title} className='__toolbar-item' onChange={handleChange}/>
}

export default Button
