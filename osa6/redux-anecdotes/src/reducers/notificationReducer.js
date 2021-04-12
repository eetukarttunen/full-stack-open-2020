
export const addNotification = (content) => {
    return {
      type: 'NEW_NOTIFICATION',
      data: {
        content
      }
    }
  }

const notificationReducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        return {content: action.data.content}
      default:
        return state
    }
  }
  
  
  export default notificationReducer