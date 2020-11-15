import { emailService } from '../services/email-service.js';
import { EmailSideBar } from '../cmps/EmailSideBar.jsx'

export class EmailDetails extends React.Component {
    state = {
        isShowAll: false,
        email: null
    }
    componentDidMount() {
        this.loadEmail()

    }

    loadEmail = () => {
        const emailId = this.props.match.params.emailId;
        emailService.getById(emailId)
            .then(email => {
                this.setState({ email })


            })
    }
    changeMailSection = (section) => {
        this.props.history.push(`/email?&section=${section}`)
    }

    render() {
        const email = this.state.email
        if (!email) return <div>Loading...</div>

        return (
            <section className="email-details flex column">
                <EmailSideBar onChangeSection={this.changeMailSection}></EmailSideBar>
                <h2 className="subject-details">{email.subject}</h2>
                <h3 className="from-details">from: {email.from}</h3>
                <p>{email.body}</p>
                <button className="back-btn" onClick={() => this.props.history.push('/email')}>Back</button>
            </section>

        )
    }
}
