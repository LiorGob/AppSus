import { emailService } from '../services/email-service.js'
import { eventBusService } from '../services/eventBusService.js'


export class ComposeModal extends React.Component {

    state = {
        
        display: false,
        email: {
            from: '',
            subjuct: '',
            body: '',
            sentAt: Date.now(),
            id: emailService.makeId()
        }
    }



    componentDidMount() {
        this.unsubscribe = eventBusService.on('composeModal', (data) => {
            console.log(data);
            this.setState({ display: true })
            
        })
    }



    closeModal() {
        this.setState({ display: false })
    }

    inputChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => {
            return { email: { ...prevState.email, [name]: value } }
        })

    }

    onSendEmail = () => {
        ev.preventDefault();
        this.onSetId();
        emailService.sendEmail(this.state.email)
        this.closeModal();
    }

    onSetId = () => {
        let name = 'id';
        let time = 'sentAt';
        this.setState(prevState => {
            return { email: { ...prevState.email, [name]: emailService.makeId(5), [time]: convertToDate(Date.now()) } }
        })
    }


    render() {
        if (!this.state.display) return null;
        return <form className="form-cntainer">
            <div className="form-header">New Massage <span className="close-btn-compose" onClick={this.closeModal}></span></div>
            <input className='review-input' type="text" placeholder="Recipients" name="from" onChange={this.inputChange}></input>
            <input type="text" placeholder="Subject" name="subject" onChange={this.inputChange}></input>
            <textarea className="email-input-text" type="text" name="body"
                onChange={this.inputChange}></textarea>
            <button className="submit-compose" onClick={this.onSendEmail}>Send</button>
        </form>
    }




}