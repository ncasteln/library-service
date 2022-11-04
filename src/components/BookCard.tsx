import { Col, Card, Row, Badge } from "react-bootstrap";
import { IBook } from "../features/catalogue/catalogueSlice";
import CatalogueButton from "../features/catalogue/CatalogueButton";
import { useAppSelector } from "../app/hooks";

const BookCard = (props: IBook) => {
  const {
    book_id,
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
  const role = useAppSelector(state => state.user.userInfo.role);

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
                  book_id={book_id}
                  action="Book now!" />
                <CatalogueButton
                  book_id={book_id}
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