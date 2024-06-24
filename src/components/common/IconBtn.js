import React from 'react'

const IconBtn = (text, onClick, children, disabled, outline=false, customerClasses, type) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
        {
            children ? (
                <div>
                    <span>{text}</span>
                    {children}
                </div>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
