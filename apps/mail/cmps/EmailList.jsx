import { EmailPreview } from '../cmps/EmailPreview.jsx'



export function EmailList({ emails, removeEmail, setRead, markAStar }) {
    return (

        <ul className="emails-list clean-list">
            {emails.map(email =>
                <li className="email-item" key={email.id}>
                    <EmailPreview email={email} setRead={setRead} removeEmail={removeEmail} markAStar={() => markAStar(email)}/>

                
                </li>

            )}
        </ul>
    )
}