// const Router = ReactRouterDOM.HashRouter
// const { NavLink, Route, Switch } = ReactRouterDOM
import { EmailSideBar } from '../apps/mail/cmps/EmailSideBar.jsx'
import { emailService } from '../apps/mail/services/email-service.js'
import eventBus from '../services/event-bus-service.js'
import { EmailList } from '../apps/mail/cmps/EmailList.jsx'
import { EmailDetails } from '../apps/mail/pages/EmailDetails.jsx'
import { EmailFilter } from '../apps/mail/cmps/EmailFilter.jsx'
import { ComposeModal } from '../apps/mail/cmps/ComposeModal.jsx'


export class EmailApp extends React.Component {

    state = {
        emailToAdd: '',
        filterBy: '',
        filterRatio: '',
        emails: [],
        selectedEmail: null,
        isComposeShown: false,
        emailsType: '',
        unreadMailAmount: '',
        keepToMail: null

    }

    componentDidMount() {
        const mailSection = new URLSearchParams(window.location.href).get('section')
        const keepToMail = new URLSearchParams(window.location.href).get('keep')
        if (mailSection) {
            this.setState({ emailsType: mailSection })
        }
        else {
            this.setState({ emailsType: 'income' })
        }
        if(keepToMail){
            this.setState({ keepToMail, isComposeShown: true })  
        }
        
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query()
            .then((emails) => {
                this.setUnreadAmount()
                this.setState({ emails })
            })
    }
  

    setFilter = (filterBy) => {
        this.props.history.push(`/email?filterBy=${filterBy}`)
        this.setState({ filterBy })
    }

    // getEmailsForDisplay() {
    //     const emails = this.state.emails.filter(email => email.from.toLowerCase().includes(this.state.filterBy.toLowerCase()))
    //     return emails;
    // }
    getEmailsForDisplay(){
        const currMails = this.state.emails
        let emailsToShow = currMails.filter(email => email.type === this.state.emailsType)
        if (this.state.emailsType === 'starred') emailsToShow = currMails.filter(email => email.isStarred)
        if (!emailsToShow) return
        let emails = emailsToShow.filter(email => email.from.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        if (this.state.filterRatio === 'read') {
            emails = emailsToShow.filter(email => email.isRead)
        }
        else if (this.state.filterRatio === 'unread') {
            emails = emailsToShow.filter(email => !email.isRead)
        }
        return emails; 
    }


    setRead = (mail, isRead) => {
        emailService.updateRead(mail, isRead)
            .then(() => {
                this.loadEmails()
            })

    }



    updateMail = (emailId, paramToChange, isUnReadClick) => {
        emailService.updateMail(emailId, paramToChange, isUnReadClick)
            .then(() => {
                if (paramToChange === 'removeMail' && this.state.emailsType === 'trash'){
                    eventBus.emit('notify', {msg: 'mail have been removed'})
                }
                else if (paramToChange === 'removeMail' && this.state.emailsType !== 'trash'){
                    eventBus.emit('notify', { msg: 'Moved to trash'})
                }
                this.loadEmails()
            })
    }

    changeMailSection = (section) => {
        this.props.history.push(`/email?&section=${section}`)
        const mailSection = new URLSearchParams(window.location.href).get('section')
        this.setState({ emailsType: mailSection })
        
    }

    setUnreadAmount = () => {
        emailService.unreadMailCount()
            .then(counter => {
                this.setState({ unreadMailAmount: counter })
            })
    }

    openCompose = () => {
        // this.setState({ isComposeShown: true })
        eventBus.emit('composeModal');
        console.log('open');
    }

    submitCompose=(newEmail)=>{
        emailService.sendEmail(newEmail)
        .then(()=>{
            eventBus.emit('notify', {msg: 'The mail have been sent', type: 'success'})
        })  
    }


    render() {
        const emails = this.getEmailsForDisplay();
        if (!emails) return <h2> loading...</h2>
        const { selectedEmail } = this.state
        return (
            <div className="wrap">
                <EmailSideBar onChangeSection={this.changeMailSection}
                openCompose={this.openCompose} unreadMailAmount={this.state.unreadMailAmount}
             ></EmailSideBar>
                 <ComposeModal loadEmails={this.loadEmails} onSubmitCompose={this.submitCompose}
               ></ComposeModal>
                <nav className={'main-nav2'}>
                    <button className={'nav-hamburger second'} onClick={this.onToggleMenu}>
                    </button> </nav>
                <section className="email-app">
                    <h1 className="my-email">My Emails</h1>
                    <EmailFilter location={this.props.location} onFilter={this.setFilter} />
                    <EmailList onUpdateMail={this.updateMail} emails={emails} openCompose={this.openCompose}  />
                    {selectedEmail && <EmailDetails email={selectedEmail}/>}

                </section>
            </div>

        )

    }





}