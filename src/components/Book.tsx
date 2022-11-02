import { Col, Card, ListGroup, Container, Row, Button, Badge } from "react-bootstrap";
import { IBook } from "../features/catalogue/catalogueSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CatalogueButton from "../features/catalogue/CatalogueButton";

const Book = ({
  book_status,
  author, 
  country, 
  imageLink, 
  language, 
  link,
  pages, 
  title, 
  year }: IBook) => {
  const isLogged = useAppSelector(state => state.user.isLogged);

  return (
    <Col>
      <Card className="book-card">
        <Row>
          <Col>
            <Card.Img className="book-img" variant="top" src={imageLink} alt={`${title} bookc cover`} />
            {
              isLogged
                ?
                  <>
                    <CatalogueButton 
                      action="Book now!"
                      bookTitle={title} />
                    <CatalogueButton 
                      action="Add to Wishlist"
                      bookTitle={title} />
                  </>
                : null
            }
          </Col>
          <Col>
            <Card.Body>
              <Card.Link as={Link} to='/'>{title}</Card.Link>
              <Card.Subtitle>{author}, {year}</Card.Subtitle>
              {
                book_status.available_copies > 0
                  ? <Badge bg="success">{book_status.available_copies} copies available!</Badge>
                  : <Badge bg="danger">Out of stock</Badge>
              }
              <Card.Link href={link} target='_blank'>
                More about <em>{title}</em> on Wikipedia
              </Card.Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  )
};

export default Book;