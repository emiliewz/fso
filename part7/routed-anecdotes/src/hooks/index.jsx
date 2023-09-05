import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    attr: {
      name,
      value,
      onChange,
    },
    reset
  }
}

export const useAnotherHook = () => {

}