const noticeReducer = (state = { message: null, type: 'info' }, action) => {
  switch (action.type) {
    case 'SET':
      console.log('set notice')
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const createNotice = (message, type = 'info') => {
  return {
    type: 'SET',
    payload: {
      message, type
    }
  }
}

export default noticeReducer