import { EmailPreview } from '../cmps/EmailPreview.jsx'


export function EmailList ({emails, removeEmail}) {
    return (
       
        <ul className ="emails-list clean-list">
            {emails.map(email => 
                <li className = "email-item" key={email.id}>
                    <EmailPreview email={email}/> 
                    <button onClick ={() => removeEmail(email.id)}>Delete</button>
  
                </li> 
                
                )}
        </ul>
    )
}