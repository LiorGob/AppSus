const Router = ReactRouterDOM.HashRouter
const { NavLink, Route, Switch } = ReactRouterDOM
import { emailService } from '../apps/mail/services/email-service.js'
import {ComposeModal} from '../apps/mail/cmps/ComposeModal.jsx'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'
import { EmailDetails } from '../apps/mail/pages/EmailDetails.jsx'
import { EmailFilter } from '../apps/mail/cmps/EmailFilter.jsx'
import {EmailSideBar} from '../apps/mail/cmps/EmailSideBar.jsx'
import {Inbox} from '../apps/mail/pages/Inbox.jsx'
import {Sent} from '../apps/mail/pages/Sent.jsx'
import {Trash} from '../apps/mail/pages/Trash.jsx'
import {EmailPreview} from '../apps/mail/cmps/EmailPreview'

export class EmailApp extends React.Component {

    state = {
        emailToAdd:'',
        filterBy: '',
        emails: [],
        selectedEmail: null,
        isShown: false

    }

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails=()=>{
        emailService.query()
            .then(emails => {
                this.setState({ emails })
            })
    }
    removeEmail=(emailId)=>{
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

    setRead = (mail, isRead) => {
        emailService.updateRead(mail, isRead)
            .then(() => {
                this.loadEmails()
            })

    }



    render() {
        const {isShown} = this.state
        const { selectedEmail } = this.state
        const emails = this.getEmailsForDisplay();
        // const { emails} = this.state
        return (
            <div className="wrap">
            <EmailSideBar loadEmails={this.loadEmails} openCompose={this.openCompose} onSetFilter={this.onSetFilter}></EmailSideBar>
              <Router> 
            {/* <div className="email-route">
                <ul>
                    <li className ="inbox"><NavLink to="email/inbox">Inbox</NavLink></li>
                    <li className ="Sent"><NavLink to="email/inbox">Sent</NavLink></li>
                    <li className ="Trash"><NavLink to="email/inbox">Trash</NavLink></li>
                </ul>
            </div> */}
            <div className="email-nav-list">
                <Switch>
                    {emails.length>0 && <Route path ="/email/inbox"
                    render ={(props)=>(
                        <Inbox {...props} emails = {emails}/>
                    )}
                />}
                <Route conponent={Sent} path="/email/sent"/>
                <Route component ={Trash} path ="/email/trash"/>
                </Switch>
            </div>
            </Router>

            <nav className={'main-nav2'}>
                <button className={'nav-hamburger second'} onClick={this.onToggleMenu}>
                </button> </nav>
            <section className="email-app">
                <h1 className="my-email">My Emails</h1>
                <EmailFilter location={ this.props.location } onFilter={ this.setFilter } />
                <EmailList emails={emails} setRead={this.setRead} removeEmail={this.removeEmail} />
                {selectedEmail && <EmailDetails email={selectedEmail} />}
                {/* {this.state.isShown && <ComposeModal onCloseCompose={this.closeCompose} onSubmitCompose={this.submitCompose} />} */}
            </section>
            </div>
        
        )

    }





}