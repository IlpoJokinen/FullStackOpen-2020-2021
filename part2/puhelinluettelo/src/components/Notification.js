const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }

    const classname = (status) => {
        let className
        switch (status) {
            case 'create':
                className = 'success'
                return className
            case 'update':
                className = 'success'
                return className
            case 'delete':
                className = 'alert'
                return className
            case 'failure':
                className = 'alert'
                return className
            default:
                return className
        }
    }

    return (
        <div className={classname(status)}>
            {message}
        </div>
    )
}

export default Notification