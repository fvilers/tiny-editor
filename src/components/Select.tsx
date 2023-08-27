import React, { type ChangeEventHandler, type FunctionComponent } from 'react'

interface OptionProps {
  value: string | number | readonly string[]
  text: string
  selected?: boolean
}

interface SelectProps {
  title: string
  options: OptionProps[]
  onChange: (commandId: string, target: any) => undefined
  commandId: string
}

const Select: FunctionComponent<SelectProps> = ({ title, options, onChange, commandId }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(commandId, e.target)
  }

  return <select title={title} className='__toolbar-item' onChange={handleChange}>{
    options.map(({ value, text, selected }, index) => <option key={index} value={value} selected={selected}>{text}</option>)
  }</select>
}

export default Select
