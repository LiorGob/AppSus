const { Link } = ReactRouterDOM
import { emailService } from '../apps/mail/services/email-service.js'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'
import { EmailDetails} from '../apps/mail/pages/EmailDetails.jsx'

export class EmailApp extends React.Component {

    state = {

        emails: [],
        selectedEmail: null

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



    render() {
        const { selectedEmail } = this.state
        const { emails} = this.state
        return (
            <section className="email-app">
                <h1 className="my-email">My Emails</h1>
                {/* {!selectedEmail && <EmailList emails = {emails} removeEmail= {this.removeEmail}/>} */}
                <EmailList emails={emails} removeEmail={this.removeEmail}/>
                {selectedEmail && <EmailDetails email={selectedEmail}/>}
               
            </section>
        )
    }









}