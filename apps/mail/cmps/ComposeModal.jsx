import { emailService } from '../services/email-service.js'
import eventBus from '../services/eventBusService.js'


export class ComposeModal extends React.Component {

    state = {
        
        display: false,
        newEmail: {
            from: '',
            subject: '',
            body: '',
            sentAt: emailService.convertToDate(Date.now()),
            id: emailService.makeId()
        }
    }



    componentDidMount() {
        this.unsubscribe = eventBus.on('composeModal', (data) => {
            this.setState({ display: true })
            
            
        })
    }



    closeModal=()=>{
        this.setState({ display: false})
    }


    inputChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState({ newEmail: { ...this.state.newEmail, [name]: value } })
    }

    // addEmail=(ev)=>{
    //     ev.preventDefault();
    //     emailService.sendEmail(this.state.email)
    //     eventBus.emit('notify',{msg:'Email sent', type:'fail'})
    //     this.closeModal();
    //     this.props.loadEmails()
        
    // }
    onSubmitCompose = (ev) => {
        ev.preventDefault()
        this.props.onSubmitCompose(this.state.newEmail)
        console.log('done');
            this.closeModal()
            this.props.loadEmails()
    }



    render() {
        if (!this.state.display) return null;
        return <form className="form-container" onSubmit={this.onSubmitCompose}>
            <div className="form-header">New Massage</div>
            <button className="exit" onClick={this.closeModal}>X</button>
            <input className='review-input' type="text" placeholder="To" name="from" onChange={this.inputChange}></input>
            <input type="text" placeholder="Subject" name="subject" onChange={this.inputChange}></input>
            <textarea className="email-input-text" type="text" name="body" rows="20" cols="70"
                onChange={this.inputChange}></textarea>
            <button type="submit" className="submit-compose">Send</button>
        </form>
    }




}