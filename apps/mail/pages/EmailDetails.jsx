import {LongTxt} from "../cmps/LongTxt.jsx"
import {emailService} from "../services/email-service.js"

export class EmailDetails extends React.Component {
    state= {
        isShowAll: false,
        email: null
    }
    componentDidMount(){
this.loadEmail()

    }

    loadEmail=()=>{
        const emailId = this.props.match.params.emailId;
        emailService.getById(emailId)
        .then(email=>{
            this.setState({email})


    })
    }

  render(){
      const email = this.state.email
      console.log(email);
      if(!email) return <div>Loading...</div>
    
      return(
          <section className = "email-details">
             
                  <h2>{email.from}</h2>
                  <h2>{email.subject}</h2>
                  <h3>{email.body}</h3>
                  
          </section>

      )
}
    }
