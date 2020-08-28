import { eventBusService } from '../services/eventBusService.js'
import { emailService } from '../services/email-service.js'
import { ComposeModal } from '../apps/mail/cmps/ComposeModal.jsx'
export class EmailSideBar extends React.Component {

    onToggleCompose = () => {
        eventBusService.emit('composeModal');
        console.log('hi')
    }

    countUnreadMail = () => {
        return emailService.unreadMailCount();
    }

    // onInBox=()=>{
    //     this.props.onSetFilter(null)
    // }

    // onSent =()=>{
    //     this.props.onSetFilter('sent')
    // }

    render() {
        return <div className="side-bar">
            <button onClick={this.onToggleCompose} className={'compose-button'}><i class="fas fa-plus"></i></button>
            <ComposeModal></ComposeModal>
            <h3>Inbox</h3>
            <h3>Sent Items</h3>
            <h3>Deleted Items</h3>
        </div>
    }


}