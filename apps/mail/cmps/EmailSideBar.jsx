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
            <button onClick={this.onToggleCompose} className={'compose-button'}><i className="email fas fa-plus"></i></button>
            <ComposeModal loadEmails={this.props.loadEmails}/>
            <div className="email-route">
                <ul className="EmailSideBar-icons">
                <li className ="inbox"><NavLink to="email/inbox">Replay<i className="replay fas fa-reply"></i></NavLink></li>
                    <li className ="inbox"><NavLink to="email/inbox">Inbox<i className="inbox fas fa-envelope-open-text"></i></NavLink></li>
                    <li className ="Sent"><NavLink to="email/inbox">Sent<i className="sent far fa-paper-plane"></i></NavLink></li>
                    <li className ="Trash"><NavLink to="email/inbox">Trash<i className="email-trash-bar far fa-trash-alt"></i></NavLink></li>
                </ul>
            </div>
        </div> 
    }


}