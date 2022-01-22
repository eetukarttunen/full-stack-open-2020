import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({
  message
}) => {
  return (
    <div className="notification">
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}
export default Notification