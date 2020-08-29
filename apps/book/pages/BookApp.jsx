
import { bookService } from '../services/book-service.js'
// import { storageService } from '../services/storage-service'
import { BookFilter } from '../cmps/book-app/BookFilter.jsx'
import { BookList } from '../cmps/book-app/BookList.jsx';
import { BookDetails } from './BookDetails.jsx'
import { BookAdd } from '../cmps/book-app/BookAdd.jsx'


export class BookApp extends React.Component {
    state = {
        filterBy: '',
        books: [],
        selectedBook: null
    }
    componentDidMount() {
        this.loadBooks();
    }
    loadBooks = () => {
        bookService.query()
            .then(books => {
                this.setState({ books })
            })
    }

    setFilter = (filterBy) => {
        this.setState({ filterBy });
        this.loadBooks();
    }

    getBooksForDisplay() {
        const books = this.state.books.filter(book =>
            book.title.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        return books;
    }

    render() {
        const { selectedBook } = this.state
        const books = this.getBooksForDisplay();
        return (
            <section className="book-app">
                <h1>BookApp</h1>
                <BookAdd loadBooks={this.loadBooks} />
                {!selectedBook && <BookFilter onFilter={this.setFilter} />}
                {!selectedBook && <BookList books={books} />}
                {selectedBook && <BookDetails book={selectedBook} />}

            </section>

        )

    }

}

