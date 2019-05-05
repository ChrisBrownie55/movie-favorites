import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
  memo
} from 'react'
import { debounce } from 'mini-debounce'

const Input = memo(({ onChange, ...props }) => (
  <input
    onChange={useCallback(event => onChange(event.target.value), [onChange])}
    {...props}
  />
))

export function DebouncedInput({ value, onChange, ...props }) {
  const [currentValue, setCurrentValue] = useState(value)
  const propagateChange = useMemo(() => debounce(onChange, 500), [onChange])
  const timeoutID = useRef()

  const handleChange = useCallback(
    value => {
      setCurrentValue(value)
      timeoutID.current = propagateChange(value)
    },
    [setCurrentValue, value]
  )

  useEffect(() => {
    clearTimeout(timeoutID)
    setCurrentValue(value)
  }, [value])

  return <Input value={currentValue} onChange={handleChange} {...props} />
}

export default Input
