import { emailService } from '../services/email-service.js'
import { eventBusService } from '../services/eventBusService.js'


export class ComposeModal extends React.Component {

    state = {
        
        display: false,
        email: {
            from: '',
            subject: '',
            body: '',
            sentAt: emailService.convertToDate(Date.now()),
            id: emailService.makeId()
        }
    }



    componentDidMount() {
        this.unsubscribe = eventBusService.on('composeModal', (data) => {
            this.setState({ display: true })
            
            
        })
    }



    closeModal() {
        this.setState({ display: false })
    }


    inputChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState({ email: { ...this.state.email, [name]: value } })
    }

    addEmail=(ev)=>{
        ev.preventDefault();
        // console.log('Adding email');
        // console.log(this.state.email)
        emailService.save(this.state.email)
        eventBusService.emit('notify',{msg:'Email sent', type:'fail'})
        this.closeModal();
        this.props.loadEmails()
        // this.props.history.push('/email')
    }


    render() {
        if (!this.state.display) return null;
        return <form className="form-container">
            <div className="form-header">New Massage <span className="close-btn-compose" onClick={this.closeModal}></span></div>
            <input className='review-input' type="text" placeholder="To" name="from" onChange={this.inputChange}></input>
            <input type="text" placeholder="Subject" name="subject" onChange={this.inputChange}></input>
            <textarea className="email-input-text" type="text" name="body" rows="20" cols="70"
                onChange={this.inputChange}></textarea>
            <button className="submit-compose" onClick={this.addEmail}>Send</button>
        </form>
    }




}