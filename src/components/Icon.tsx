import React, { type FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
  icon: IconProp
  border?: boolean
  inverse?: boolean
}

const Icon: FunctionComponent<Props> = ({ icon, border, inverse }: Props) => {
  return <FontAwesomeIcon icon={icon} border={border} inverse={inverse} />
}

export default Icon
