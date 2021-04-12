import React from 'react'
import { useSelector } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'

const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(/* */)
    const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification