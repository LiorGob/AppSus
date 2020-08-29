const { NavLink} = ReactRouterDOM
import { eventBusService } from '../services/eventBusService.js'
import { emailService } from '../services/email-service.js'
import { ComposeModal } from '../apps/mail/cmps/ComposeModal.jsx'
export class EmailSideBar extends React.Component {

    onToggleCompose = () => {
        eventBusService.emit('composeModal');
        
    }

    countUnreadMail = () => {
        return emailService.unreadMailCount();
    }

   

    render() {
        return <div className="side-bar">
            <button onClick={this.onToggleCompose} className={'compose-button'}><i className="fas fa-plus"></i></button>
            <ComposeModal loadEmails={this.props.loadEmails}/>
            <div className="email-route">
                <ul>
                    <li className ="inbox"><NavLink to="email/inbox">Inbox</NavLink></li>
                    <li className ="Sent"><NavLink to="email/inbox">Sent</NavLink></li>
                    <li className ="Trash"><NavLink to="email/inbox">Trash</NavLink></li>
                </ul>
            </div>
        </div>
    }


}