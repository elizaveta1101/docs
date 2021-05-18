import React from 'react'

export const WarningAlert = ({message}) => {
    return (
        <div className="alert alert-warning" role="alert">
            {message}
        </div>
    )
}