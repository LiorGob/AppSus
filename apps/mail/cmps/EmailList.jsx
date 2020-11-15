
import { EmailPreview } from '../cmps/EmailPreview.jsx';
import { emailService } from '../services/email-service.js';

// export class EmailList extends React.Component {
//     state = {
//         emailToShow: '',
//         isEmailShown: false,
//         isStarredShown: false,
//         isDeletedShown: false,
//         isSentShown: false,
//     }

//     onShowEmail = (email) => {
//         emailService.updateRead(email)
//         this.props.updateProgBar()
//         this.setState({ isEmailShown: true, emailToShow: email })
//     }

//     onStarEmail = (email) => {
//         emailService.markAStar(email)
//         this.setState({})
//     }
//     onShowStarred = () => {
//         this.onShowAll()
//         this.setState({ isStarredShown: true })
//     }
//     onShowAll = () => {
//         this.setState({ isStarredShown: false, isEmailShown: false, isDeletedShown: false, isSentShown: false })
//     }
//     onShowDeleted = () => {
//         this.onShowAll()
//         this.setState({ isDeletedShown: true })
//     }
//     onShowSent = () => {

//         this.onShowAll()
//         this.setState({ isSentShown: true })

//     }
//     onToggleRead = (email) => {
//         emailService.toggleRead(email)
//         this.props.updateProgBar()
//     }

//     renderEmails = () => {
//         return this.props.emails.map((email, idx) => {
//             if (email.isStarred && !email.isDeleted && this.state.isStarredShown) {
//                 return (
//                     <div key={idx}>
//                        <EmailPreview onToggleRead={this.onToggleRead} onStarEmail={this.onStarEmail} onShowEmail={this.onShowEmail} onRemoveEmail={this.props.removeEmail} email={email} /> 
//                     </div>
//                 )
//             } 
//             else if(email.isDeleted && this.state.isDeletedShown){
//                 return(
//                     <div key={idx}>
//                     <EmailPreview onToggleRead={this.onToggleRead} onStarEmail={this.onStarEmail} onShowEmail={this.onShowEmail} onRemoveEmail={this.props.removeEmail} email={email} />
//                 </div>
//                 )
//             }
//             else if(email.isSent && !email.isDeleted && this.state.isSentShown){
//                 return (
//                     <div key={idx}>
//                         <EmailPreview onToggleRead={this.onToggleRead} onStarEmail={this.onStarEmail} onShowEmail={this.onShowEmail} onRemoveEmail={this.props.removeEmail} email={email} />
//                     </div>
//                 )  
//             }
//             else if (!this.state.isStarredShown &&
//                 !this.state.isDeletedShown &&
//                 !this.state.isSentShown &&
//                 !email.isDeleted){
//                     return (
//                         <div key={idx}>
//                             <EmailPreview onToggleRead={this.onToggleRead} onStarEmail={this.onStarEmail} onShowEmail={this.onShowEmail} onRemoveEmail={this.props.removeEmail} email={email} />
//                         </div>
//                     )
//                 } 
//         })
//     }
//     render(){
//         return(
//             <React.Fragment>
//               <section className="email-list clean-list">
//               {!this.state.isEmailShown &&
//                         <div className="email-item">
//                             {this.renderEmails()}
//                         </div>}
                        
//                   </section>  
//             </React.Fragment>
//         )
//     }
// }




// export function EmailList({ emails, removeEmail, setRead, markAStar}) {
//     return (

//         <ul className="emails-list clean-list">
//             {emails.map(email =>
//                 <li className="email-item" key={email.id}>
//                     <EmailPreview email={email} setRead={setRead} removeEmail={removeEmail} markAStar={() => markAStar(email)}/>


//                 </li>

//             )}
//         </ul>
//     )
// }


export function EmailList({emails, onUpdateMail, openCompose}) {
    return <ul className="emails-list clean-list">
        {
            emails.map(email=>
                <li key={email.id}>
                     <EmailPreview email={email} onUpdateMail={onUpdateMail} openCompose={openCompose} />
                </li>)
        }

    </ul>
      
    
}
