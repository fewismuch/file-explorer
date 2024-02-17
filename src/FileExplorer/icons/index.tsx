import React from 'react'

const Icon: React.FC<any> = (props) => {
  const { style, name, ...rest } = props
  return (
    <span {...rest} style={{ display: 'flex', alignItems: 'center', ...style }}>
      +
    </span>
  )
}

export default Icon
