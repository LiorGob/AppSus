export class EmailFilter extends React.Component {
    state = {
        filterBy: ''
    }
    componentDidMount() {
        const filterBy = new URLSearchParams(this.props.location.search).get('filterBy') || ''
        this.setState({ filterBy }, () => this.props.onFilter(this.state.filterBy))
    }

    handleChange = ({ target }) => {
        this.setState({ filterBy: target.value }, () => this.props.onFilter(this.state.filterBy))
    }

    render() {
        return <section className="email-filter">
            <input value={ this.state.filterBy } type="text" placeholder="Search email"
                onChange={ this.handleChange } />
        </section >
    }
}











// export function EmailFilter(props){
//     return <section className="email-filter">
      
//         <input type="text" placeholder="Search email" onChange={(ev)=>{
//             props.onFilter(ev.target.value)

//         }}/>
       

//     </section>
// }
