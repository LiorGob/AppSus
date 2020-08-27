const { Link } = ReactRouterDOM
export function EmailPreview({ email }) {
    return (
        <Link to={`/email/${email.id}`}>
            <section className="email-preview">
                <h3 className="msg"> {email.from}</h3>
                <h3 className="subject">{email.subject}</h3>
                <h3 className="date">{email.sentAt}</h3>
                <div className="edit-mail">
                <button onClick={(ev) => {
                        ev.preventDefault()
                        removeMail(mail.id)
                    }
                    } >Delete</button>
             </div>
            </section>
        </Link>
    )
}