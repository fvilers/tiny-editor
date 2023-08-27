import React, { type MouseEventHandler, type FunctionComponent, type ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  onClick: (commandId: string, target: any) => undefined
  commandId: string
}

const Button: FunctionComponent<Props> = ({ title, children, onClick, commandId }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick(commandId, e.target)
  }

  return <button type='button' title={title} className='__toolbar-item' onClick={handleClick}>{children}</button>
}

export default Button
