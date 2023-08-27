import React, { type FunctionComponent } from 'react'

interface Props {
  className: string
}

const Icon: FunctionComponent<Props> = ({ className }: Props) => {
  return <i className={className} />
}

export default Icon
