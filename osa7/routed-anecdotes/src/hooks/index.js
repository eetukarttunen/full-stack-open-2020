import { useState, useCallback } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const reseted = ""; // tyhjä, jola tyhjennetään asettamalla tämä arvoksi.
  const muu = []

  const reset = useCallback(() => setValue(reseted), muu)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  

  return [{
    type,
    value,
    onChange,
}, reset]
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}