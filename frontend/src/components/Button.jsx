import React from 'react'

const Button = ({children, handleSave,...props}) => {
  return (
    <button {...props}>{children}</button>
  )
}

export default Button