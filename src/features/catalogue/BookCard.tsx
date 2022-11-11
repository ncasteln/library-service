import { Col, Card, Row, Badge } from "react-bootstrap";
import { IBook } from "./catalogueSlice";
import CatalogueButton from "./CatalogueButton";
import { Link } from "react-router-dom";

const BookCard = (props: IBook) => {
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
  } = props;

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
              <Card.Text>
              {
                  book_status.copies > 0
                    ?
                    // <CatalogueButton 
                    //   book={props} 
                    //   action="Book now!" />
                    // : null
                    <CatalogueButton 
                      book={props} 
                      action="Book now!" />
                    : null
              }
              <CatalogueButton
                book={props} 
                action="Add to Wishlist" />
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