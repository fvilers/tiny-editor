import React, { type MouseEventHandler, type FunctionComponent, type ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  onClick: (commandId: string, target: any) => undefined
  commandId: string
  active: boolean | undefined
}

const Button: FunctionComponent<Props> = ({ title, active, children, onClick, commandId }: Props) => {
  const className = '__toolbar-item' + (active === true ? ' active' : '')
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.target instanceof SVGElement) {
      onClick(commandId, event.target.dataset.icon)
    }
  }
  return <button type='button' title={title} className={className} onClick={handleClick}>{children}</button>
}

export default Button
