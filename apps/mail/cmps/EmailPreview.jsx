const { Link } = ReactRouterDOM
export function EmailPreview({ email, removeEmail, setRead}) {
    return (
        <Link to={`/email/${email.id}`} onClick={() => setRead(email)}>
            <section className={`email-preview ${email.isRead? 'Readen':''}`}>
                <h3 className="msg"> {email.from}</h3>
                <h3 className="subject">{email.subject}</h3>
                <h3 className="date">{email.sentAt}</h3>
                <div className="edit-email">
                <button onClick={(ev) => {ev.preventDefault()
                        ev.stopPropagation()
                        removeEmail(email.id)
                    }
                    } ><i className="email-trash far fa-trash-alt"></i> </button>
                    <button onClick={(ev) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        setRead(email, false)
                    }
                    }><i className="fas fa-envelope"></i> </button>
                </div>
            </section>
        
        </Link>
        )
}