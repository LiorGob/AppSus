const { Link } = ReactRouterDOM
import { LongTxt } from '../cmps/book-app/LongTxt.jsx'
import { bookService } from '../services/book-service.js'
// import { ReviewAdd } from '../cmps/book-app/ReviewAdd.jsx'

export class BookDetails extends React.Component {
    state = { isLongTxtShown: false, book: null }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        const bookId = this.props.match.params.bookId
        bookService.getById(bookId)
            .then(book => this.setState({ book }))
    }

    setPageCount(pageCount) {
        if (pageCount > 500) return 'Long Reading';
        if (pageCount > 200 && pageCount < 500) return 'Decent Reading';
        if (pageCount < 100) return 'Light Reading';
    }

    setPublishedDate(publishedDate) {
        const date = new Date().getFullYear();
        if ((date - publishedDate) >= 10) return 'Vetern Book';
        if ((date - publishedDate) < 1) return 'New';
        return '';

    }

    changeColor(price) {
        if (price > 150) return 'red';
        if (price < 20) return 'green';
        return '';
    }
    addReview = (review) => {
        const bookId = this.state.book.id;
        bookService.addReview(bookId, review).then(this.loadBook)
    }
    isOnSale(isOnSale) {
        if (isOnSale) return <img src="./assets/img/sale.gif" />;
        else '';
    }


    // onSubmit = () => {
    //     ev.preventDefault();
    //     const bookWithReview = bookService.addReview(review, this.state.book)
    //     this.setState({ book: bookWithReview })
    // }

    render() {
        const { book } = this.state;
        if (!book) return <div>Loading..</div>
        return (
            <div className="book-details">
                <img src={book.thumbnail} />
                <h2>{book.title}</h2>
                <h2> {book.pageCount} Pages, {this.setPageCount(book.pageCount)}</h2>
                <h2>Published On: {book.publishedDate} {this.setPublishedDate(book.publishedDate)}</h2>
                <h3 className={'price ' + this.changeColor(book.listPrice.amount)}>Book Price:{book.listPrice.amount}</h3>
                <div className="img-gif">{this.isOnSale(book.listPrice.isOnSale)}</div>
                <LongTxt txt={book.description} />
                {/* <ReviewAdd onSubmit={this.onSubmit} /> */}
                <button onClick={() => this.props.history.push('/book')}>Back</button>
                {/* <Link to= {`/book/review/${book.id}`}>Add Review</Link> */}
            </div>
        )
    }
}



// add the review as a component:
{/* <div className="review">
                    { book.reviews && <ReviewList reviews={ book.reviews } bookId={ book.id } remove={ this.removeReview } /> }
                    <ReviewAdd bookId={ book.id } onAddReview={ this.addReview } />
                </div> */}