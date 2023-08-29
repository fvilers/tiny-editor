import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import React, { type MouseEventHandler, type FunctionComponent, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  title: string
  children?: ReactNode
  onClick: (commandId: string, target: any) => undefined
  active?: boolean
  icon?: IconDefinition
}

const Button: FunctionComponent<Props> = ({ title, active, children, icon, onClick }: Props) => {
  const className = '__toolbar-item' + (active === true ? ' active' : '')
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.target instanceof SVGElement) {
      onClick(title, event.target.dataset.icon)
    }
  }
  return <button type='button' title={title} className={className} onClick={handleClick}>
    {icon != null
      ? <FontAwesomeIcon icon={icon} />
      : children ?? ''
  }
  </button>
}

export default Button
