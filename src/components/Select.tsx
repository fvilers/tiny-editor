import React, { type ChangeEventHandler, type FunctionComponent } from 'react'

interface OptionProps {
  value: string | number | readonly string[]
  text: string
}

interface SelectProps {
  title: string
  options: OptionProps[]
  onChange: (commandId: string, target: any) => undefined
  commandId: string
  defaultValue: string
}

const Select: FunctionComponent<SelectProps> = ({ title, options, onChange, commandId, defaultValue }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(commandId, e.target.value)
  }

  return <select defaultValue={defaultValue} title={title} className='__toolbar-item' onChange={handleChange}>{
    options.map(({ value, text }, index) => <option key={index} value={value} >{text}</option>)
  }</select>
}

export default Select
