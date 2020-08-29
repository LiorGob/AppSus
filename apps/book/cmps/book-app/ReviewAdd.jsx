import { bookService } from '../../services/book-service.js'
import { eventBus } from '../../services/event-bus-service.js'
export class ReviewAdd extends React.Component {

    state = {
        reviewToAdd: bookService.getEmpty(),
        book: null
        // review={
        //     name: '',
        //     rate: '',
        //     date: '',
        //     text: ''
        // }
    }
    // elInput = React.createRef()

    componentDidMount() {
        const bookId = this.props.bookId
      bookService.getEmpty().then(review => this.setState({ reviewToAdd:review }))
       bookService.getById(bookId)
       .then(book=>{
           this.setState({book})
       })
    }

    onInputChange = (ev) => {
        const value = ev.target.name === 'rate' ? +ev.target.value : ev.target.value
        this.setState({ reviewToAdd: { ...this.state.reviewToAdd, [ev.target.name]: value } })
    }

    addReview = (ev) => {
        ev.preventDefault();
        this.props.onAddReview(this.state.reviewToAdd)
        // .then(()=>{
        //     this.setState({ reviewToAdd: bookService.getEmpty() })
        // })
       
    }



    render() {
        return (
            <form onSubmit={this.addReview}>
                <h3>Review:</h3>
                <input type="text" name="name" value={this.state.reviewToAdd.name}
                    onChange={this.onInputChange} placeholder="Enter Your Full Name" />
                {/* rate 1-5 */}
                <select name="rate" onChange={this.onInputChange} value={this.state.reviewToAdd.rate}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {/* read at */}
                <input type="date" onChange={this.onInputChange} value={this.state.reviewToAdd.date} />
                {/* enter text */}
                <textarea rows="4" cols="50" onChange={this.onInputChange} value={this.state.reviewToAdd.txt} />
                <button >ADD REVIEW</button>
            </form>

        )

    }

}

// onClick={() => { this.props.onSubmite(event.this.state.review) }}
// component- review list:
// import { ReviewPreview } from 'ReviewPreview.jsx'

// export function ReviewList(props) {

//     function removeReview(){

//     }

//     return (<section>
//         <ul className="review-list">
//             {
//                 props.reviews.map((review) =>
//                     <li key={review.id}>
//                         <ReviewPreview review={review} />
//                         <button onClick={() => props.remove(props.bookId,review.id)}>x</button>
//                     </li>
//                 )
//             }
//         </ul>
//     </section>
//     )
// }
// review priview component:
// export function ReviewPreview({ review }) {

//     function ratingStar() {
//         const stars = '⭐'.repeat(review.rating);
//         return stars;
//     }

//     return (
//         <article className="review-details">
//             <h5>
//                 {review.fullName}
//             </h5>
//             <label>
//                 {ratingStar()}
//             </label>
//             <h5>
//                 {review.datepicker}
//             </h5>
//             <p>
//                 {review.txt}
//             </p>
//         </article>
//     )
// }