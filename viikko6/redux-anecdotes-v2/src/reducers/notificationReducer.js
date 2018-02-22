const startingNotification = 'If it hurts, it hurts'

const notificationReducer = (store = startingNotification, action) => {
  if (action.type === 'NOTIFICATION') {
    console.log('ACTIONDSLSDFK ', action)
    return action.content
  }

  return store
}

export const newNotification = (content) => {
  console.log('NEWNOTIFICIDSFLSD ',content)
  return {
    type: 'NOTIFICATION',
    content: content
  }
}
export default notificationReducer