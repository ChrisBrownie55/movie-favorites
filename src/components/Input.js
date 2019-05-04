import React from 'react'
import classNames from '@chbphone55/classnames'

export default ({ className, ...props }) => (
  <input className={classNames(className, '')} {...props} />
)
