import React, { useState } from 'react'

export const Button = () => {
  const [count, setCount] = useState(0)
  return (
    <div style={{ color: 'blue' }} onClick={() => setCount(count + 1)}>
      btn{count}
    </div>
  )
}
