import { Col, Card, Row, Badge } from "react-bootstrap";
import { IBook } from "../../features/catalogue/catalogueSlice";
import CatalogueActions from "./RoleBasedCatalogueButtons";
import { Link } from "react-router-dom";

const BookCard = ({ book }: {
  book: IBook;
}) => {
  console.log(book.imageLink)
  return (
    <Col>
      <Card className="book-card">
        <Row>
          <Col>
            <Card.Img 
              className="book-img"
              variant="top"
              src={book?.imageLink}
              alt={`${book.title} book cover`} />            
          </Col>
          <Col>
            <Card.Body>
              <Card.Title as={Link} to={`/catalogue/${book.id}`}>{book.title}</Card.Title>
              <Card.Subtitle>{book.author}, {book.year}</Card.Subtitle>
              {  
                book.book_status.copies <= 0
                  ? <Badge bg="danger">Out of stock</Badge>
                  : <Badge bg="success">{book.book_status.copies} copies available</Badge>
              }
              <CatalogueActions book={book} />
              <Card.Link href={book.link} target='_blank'>
                <small>More about <em>{book.title}</em> on Wikipedia</small>
              </Card.Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  )
};

export default BookCard;