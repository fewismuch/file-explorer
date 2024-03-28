import React from 'react'

export const Placeholder = (props: { depth: number }) => {
  const left = (props.depth + 1) * 24
  return <div className='file-explorer__placeholder' style={{ left }}></div>
}
