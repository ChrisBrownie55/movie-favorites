import React from 'react'
import Select from 'react-select'

import { colors, borderRadius } from '../../tailwind.config'
import './style.css'

const styles = {
  control: (_, state) => {
    const ret = {
      display: 'flex',
      backgroundColor: state.isFocused
        ? colors['grey-lighter']
        : colors['grey-lightest'],
      borderRadius: borderRadius['default'],
      transition: 'background-color 0.15s ease-out'
    }
    console.log(ret)
    return ret
  }
}

export default props => (
  <Select classNamePrefix="Select" styles={styles} {...props} />
)
