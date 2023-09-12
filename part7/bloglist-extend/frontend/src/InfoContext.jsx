import { createContext, useReducer, useContext } from 'react'

const infoReducer = (state = { message: null, type: 'info' }, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const InfoContext = createContext()

export const InfoContextProvider = (props) => {
  const [info, infoDispatch] = useReducer(infoReducer)

  return (
    <InfoContext.Provider value={[info, infoDispatch]}>
      {props.children}
    </InfoContext.Provider >
  )
}

export const useInfoValue = () => {
  const [info] = useContext(InfoContext)
  return info
}

export const useInfoDispatch = () => {
  const [infoDispatch] = useContext(InfoContext)
  return infoDispatch
}

export const useInfo = () => {
  const [info, infoDispatch] = useContext(InfoContext)

  return (message, type = 'info', time = 3) => {
    infoDispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => infoDispatch({ type: 'SET', payload: null }), time * 1000)
  }
}

export default InfoContext