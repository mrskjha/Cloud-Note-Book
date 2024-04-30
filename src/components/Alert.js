import React from 'react'

const Alert = (props) => {
  return (
    <div>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}role='alert'>
          <strong className="fas fa-info-circle" /> {props.alert.msg}
        </div>
      )}
    </div>
  )
}

export default Alert
