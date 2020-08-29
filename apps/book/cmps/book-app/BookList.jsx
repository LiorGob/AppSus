import { BookPreview } from './BookPreview.jsx'
export function BookList({ books }) {
    return (
        <ul className="book-list">
                {books.map(book =>
                <li className="book-item" key={book.id}>
                    <BookPreview book={book}  />
                    </li>
                )}
    </ul>
    )
}

