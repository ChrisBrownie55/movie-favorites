import React from 'react'
import Select from 'react-select'

import { colors, borderRadius, padding } from '../tailwind.config'

const styles = {
  control: (_, state) => ({
    display: 'flex',
    padding: padding[1],
    backgroundColor: state.isFocused
      ? colors['grey-lighter']
      : colors['grey-lightest'],
    borderRadius: borderRadius['default'],
    transition: 'background-color 0.15s ease-out',
    cursor: 'text'
  })
}

export default props => (
  <Select classNamePrefix="Select" styles={styles} {...props} />
)
