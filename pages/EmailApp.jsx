const { Link } = ReactRouterDOM
import { emailService } from '../apps/mail/services/email-service.js'
import {ComposeModal} from '../apps/mail/cmps/ComposeModal.jsx'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'
import { EmailDetails } from '../apps/mail/pages/EmailDetails.jsx'
import { EmailFilter } from '../apps/mail/cmps/EmailFilter.jsx'
import {EmailSideBar} from '../apps/mail/cmps/EmailSideBar.jsx'


export class EmailApp extends React.Component {

    state = {
        filterBy: '',
        emails: [],
        selectedEmail: null,
        isShown: true

    }

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails() {
        emailService.query()
            .then(emails => {
                this.setState({ emails })
            })
    }
    removeEmail = (emailId) => {
        emailService.remove(emailId)
       this.loadEmails();

    }

    setFilter = (filterBy) => {
        this.props.history.push(`/email?filterBy=${filterBy}`)
        this.setState({ filterBy })
    }

    getEmailsForDisplay() {
        const emails = this.state.emails.filter(email => email.from.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        return emails;
    }

    onToggleMenu = () => {
        document.querySelector('.side-bar').classList.toggle('open');
        document.querySelector('.main-nav2').classList.toggle('menu-open');
    }

 



    render() {
        const {isShown} = this.state
        const { selectedEmail } = this.state
        const emails = this.getEmailsForDisplay();
        // const { emails} = this.state
        return (
            <div className="wrap">
            <EmailSideBar onSetFilter={this.onSetFilter}></EmailSideBar>
            <nav className={'main-nav2'}>
                <button className={'nav-hamburger second'} onClick={this.onToggleMenu}>
                </button> </nav>
            <section className="email-app">
                <h1 className="my-email">My Emails</h1>
                <EmailFilter location={ this.props.location } onFilter={ this.setFilter } />
                <EmailList emails={emails} removeEmail={this.removeEmail} />
                {selectedEmail && <EmailDetails email={selectedEmail} />}
               

            </section>
            </div>
        )
    }





}