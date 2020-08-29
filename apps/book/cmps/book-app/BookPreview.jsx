const { Link } = ReactRouterDOM
import { utilService } from '../../services/util-service.js'

export function BookPreview({ book }) {
  return (
    <Link to={`/book/${book.id}`}>
      <div className="book-preview">
        <img src={book.thumbnail} />
        <h3 className="title">{book.title}</h3>
        <h4 className="price">{utilService.formatCurrency(book.listPrice.amount, book.listPrice.currencyCode)}</h4>
      </div>
    </Link>
  )
}
