const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      state = action.data // Ehkä väärä tapa?
      return state
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return initialState
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer