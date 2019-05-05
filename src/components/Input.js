import React, { useCallback, memo } from 'react'
import classNames from '@chbphone55/classnames'

export default memo(({ onChange, className, ...props }) => (
  <input
    onChange={useCallback(event => onChange(event.target.value), [onChange])}
    className={classNames(className, '')}
    {...props}
  />
))
