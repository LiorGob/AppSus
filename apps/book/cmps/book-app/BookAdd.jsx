
import { bookService } from '../../services/book-service.js'

export class BookAdd extends React.Component {

    state = {
        title: '',
        books: []
    }

    onInputChange = (ev) => {
        this.setState({ title: ev.target.value }, () => {
            console.log('state', this.state);//call the other function
            bookService.getGoogleBooks(this.state.title)
                .then(books => this.setState({ books }))
        })
    }

    onAddBook = (bookId) => {
        const book = this.state.books.find(book => book.id === bookId)
        bookService.addBook(book)
            .then(() => this.props.loadBooks())
    }

    render() {
        const { books } = this.state;
        // if (!book) return <div>Loading..</div>
        return (
            <section>
                <input name="title" placholder="search title" onChange={this.onInputChange} value={this.state.title} />
                <ul>
                    {books.map(book => {
                        return <div className="google-book" key={book.id}>
                            <p>{book.volumeInfo.title}</p>
                            <button onClick={() => this.onAddBook(book.id)}>ADD</button>
                        </div>
                    })}
                </ul>
            </section>
        )
    }
}