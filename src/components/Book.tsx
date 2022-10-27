import { Col, Card, ListGroup, Container, Row, Button } from "react-bootstrap";
import { IBook } from "../features/catalogue/catalogueSlice";
import { Link } from "react-router-dom";

const Book = ({ 
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
            <Card.Img className="book-img" variant="top" src={imageLink} alt={`${title} bookc cover`} />
            <Button>Book now</Button>
            <Button>Add to wishlist</Button>
          </Col>
          <Col>
            <Card.Body>
              <Card.Link as={Link} to='/'>{title}</Card.Link>
              <Card.Subtitle>{author}, {year}</Card.Subtitle>
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