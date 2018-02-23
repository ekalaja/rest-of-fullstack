const startingFilter = ''

const filterReducer = (store = startingFilter, action) => {
  if (action.type === 'SET_FILTER') {
    return action.content
  }
  return store
}

export const newFilter = (content) => {
  return {
    type: 'SET_FILTER',
    content: content
  }
}
export default filterReducer