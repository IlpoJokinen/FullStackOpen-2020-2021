const filterReducer = (state = null, action) => {
  switch(action.type) {
    case 'FILTER':
      state = action.input
      return state
    default:
      return state
  }
}

export const filterByInput = (input) => {
  return {
    type: 'FILTER',
    input
  }
}

export default filterReducer