import React, { type ChangeEventHandler, type FunctionComponent } from 'react'

interface OptionProps {
  value: string | number | readonly string[]
  text: string
}

interface SelectProps {
  title: string
  options: OptionProps[]
  onChange: (value: string) => undefined
  defaultValue: string
  value?: string
}

const Select: FunctionComponent<SelectProps> = ({ title, options, onChange, defaultValue, value }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    // console.log('select change', e.target.value)
    onChange(e.target.value)
  }

  return <select
    defaultValue={defaultValue} value={value}
    title={title} className='__toolbar-item' onChange={handleChange}
  >{
    options.map(({ value, text }, index) => <option key={index} value={value} >{text}</option>)
  }</select>
}

export default Select
