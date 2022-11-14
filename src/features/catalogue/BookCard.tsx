import { Col, Card, Row, Badge } from "react-bootstrap";
import { IBook } from "./catalogueSlice";
import { Link } from "react-router-dom";
import AddToWishlist from "../user/AddToWishlist";
import Reserve from "../user/Reserve";

const BookCard = (book: IBook) => {
  const {
    id,
    book_status,
    author, 
    country,
    imageLink, 
    language, 
    link,
    pages, 
    title, 
    year
  } = book;

  return (
    <Col>
      <Card className="book-card">
        <Row>
          <Col>
            <Card.Img 
              className="book-img"
              variant="top"
              src={imageLink}
              alt={`${title} book cover`} />            
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Link as={Link} to={`${id}`}>{title}</Card.Link>
              <Card.Subtitle>{author}, {year}</Card.Subtitle>
              <Card.Text>
                {
                  book_status.copies > 0
                    ? <Badge bg="success">{book_status.copies} copies available!</Badge>
                    : <Badge bg="danger">Out of stock</Badge>
                }
              </Card.Text>
              {
                  book_status.copies > 0
                    ? <Reserve {...book} />
                    : null
              }
              <AddToWishlist {...book} />
              <Card.Link href={link} target='_blank'>
                <small>More about <em>{title}</em> on Wikipedia</small>
              </Card.Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  )
};

export default BookCard;