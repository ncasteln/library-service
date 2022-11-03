import { Col, Card, Row, Badge } from "react-bootstrap";
import { IBook } from "../features/catalogue/catalogueSlice";
import { Link } from "react-router-dom";
import CatalogueButton from "../features/catalogue/CatalogueButton";

const BookCard = ({
  book_id,
  book_status,
  author, 
  country, 
  imageLink, 
  language, 
  link,
  pages, 
  title, 
  year }: IBook) => {

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
              <Card.Link as={Link} to={`/catalogue/${book_id}`}>{title}</Card.Link>
              <Card.Subtitle>{author}, {year}</Card.Subtitle>
              <Card.Text>
                {
                  book_status.available_copies > 0
                    ? <Badge bg="success">{book_status.available_copies} copies available!</Badge>
                    : <Badge bg="danger">Out of stock</Badge>
                }
              </Card.Text>
              <Card.Text>
              <CatalogueButton 
                action="Book now!"
                bookTitle={title} />
              <CatalogueButton 
                action="Add to Wishlist"
                bookTitle={title} />
              </Card.Text>
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