const startingNotification = 'If it hurts, it hurts'

const notificationReducer = (store = startingNotification, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.content
  }

  return store
}

export const newNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    content: content
  }
}
export default notificationReducer