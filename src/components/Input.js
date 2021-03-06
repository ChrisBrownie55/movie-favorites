import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
  memo
} from 'react'
import { debounce } from 'mini-debounce'

import classNames from '@chbphone55/classnames'

const Input = memo(({ className, onChange, ...props }) => (
  <input
    onChange={useCallback(event => onChange(event.target.value), [onChange])}
    className={classNames(
      className,
      `
      p-3 rounded
      bg-grey-lightest focus:bg-grey-lighter
      focus:outline-none
    `
    )}
    {...props}
  />
))

export function DebouncedInput({ timeout = 500, value, onChange, ...props }) {
  const [currentValue, setCurrentValue] = useState(value)
  const propagateChange = useMemo(() => debounce(onChange, timeout), [
    onChange,
    timeout
  ])
  const timeoutID = useRef()

  const handleChange = useCallback(
    value => {
      setCurrentValue(value)
      timeoutID.current = propagateChange(value)
    },
    [setCurrentValue, propagateChange]
  )

  useEffect(() => {
    clearTimeout(timeoutID)
    setCurrentValue(value)
  }, [value])

  return <Input value={currentValue} onChange={handleChange} {...props} />
}

export default Input
