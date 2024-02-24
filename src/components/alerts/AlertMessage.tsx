interface Prop {
    type?: 'success' | 'danger' | 'warning'
    messages?: string | any[]
}
const AlertMessage = ({ messages, type }: Prop) => {
    return type && <div className={`alert-box ${type}`}>
        {type === "success" && <div className="alert-title">Success</div>}
        {type === "danger" && <div className="alert-title">Error</div>}
        <div className="alert-messages">
            {
                Array.isArray(messages) ?
                    messages.map((msg: string, key: number) => (
                        <div className="alert-info" key={key}>• {msg}</div>
                    ))
                    : <div className="alert-info">• {messages}</div>
            }
        </div>
    </div>
}
export default AlertMessage