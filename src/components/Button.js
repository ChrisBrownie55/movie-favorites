import React from 'react'
import classNames from '@chbphone55/classnames'

export default ({ primary, secondary, style, className, ...props }) => (
  <button
    className={classNames(
      className,
      `
        py-2 px-4 rounded font-normal
        focus:outline-none
      `,
      {
        'text-white bg-blue hover:bg-blue-dark shadow focus:shadow-md': primary,
        'text-blue-darker opacity-75 hover:opacity-100 hover:bg-blue-lightest focus:bg-blue-lightest active:bg-blue-lighter': secondary
      }
    )}
    style={{
      ...style,
      transition: 'all 0.15s ease-out'
    }}
    {...props}
  />
)
