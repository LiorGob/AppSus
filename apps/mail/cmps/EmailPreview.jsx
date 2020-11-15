const { Link } = ReactRouterDOM
export function EmailPreview({ email,onUpdateMail,openCompose}) {
    return (
        <Link to={`/email/${email.id}`} onClick={() => onUpdateMail(email.id, 'setRead')}>
            <section className={`email-preview ${email.isRead? 'Readen':''}`}>
                <h3 className="msg"> {email.from}</h3>
                <h3 className="subject">{email.subject}</h3>
                <h3 className="date">{email.sentAt}</h3>
                <div className="edit-email">
                <button title="Favorite" className="star-btn" onClick={(ev) => {
                    ev.preventDefault()
                    ev.stopPropagation()
                    onUpdateMail(email.id,'toggleStar')
                }}>
                    
                    {email.isStarred && <i className="fav-star-starred fas fa-star"></i>}
                    {!email.isStarred && <i className="fav-star far fa-star"></i>}
                </button>
              
                <button title="Trash" onClick={(ev) => {ev.preventDefault()
                        ev.stopPropagation()
                        onUpdateMail(email.id,'removeMail')
                    }
                    } ><i className="email-trash far fa-trash-alt"></i> </button>
                  
                    <button title="Replay" onClick={(ev) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        openCompose()
                        onUpdateMail(email.id, 'setRead', false)
                    }
                    }><i className="email fas fa-reply"></i> </button>
                   
                </div>
            </section>
        
        </Link>
        )
}