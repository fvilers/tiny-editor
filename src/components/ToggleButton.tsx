import React, { useState, type MouseEventHandler, type FunctionComponent, type ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  onClick: (commandId: string, target: any) => undefined
  commandId: string
}

const Button: FunctionComponent<Props> = ({ title, children, onClick, commandId }: Props) => {
  const [active, setActive] = useState(false)

  const className = '__toolbar-item' + ((active === true) ? ' active' : '')

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.target instanceof SVGElement) {
      setActive(active !== true)
      onClick(commandId, event.target.dataset.icon)
    }
  }
  return <button type='button' title={title} className={className} onClick={handleClick}>{children}</button>
}

export default Button
