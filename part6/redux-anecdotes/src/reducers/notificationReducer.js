const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      state = action.data 
      return state
    case 'HIDE_NOTIFICATION':
      return ""
    default:
      return state
  }
}

let timer
export const showNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer