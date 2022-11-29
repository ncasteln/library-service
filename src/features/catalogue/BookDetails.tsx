import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCatalogue, IBook } from "./catalogueSlice";
import { Badge, Card, Col, Row } from "react-bootstrap";
import CatalogueActions from "./CatalogueActions";

const BookDetails = () => {
  const list = useAppSelector(state => state.catalogue.list);
  const { bookId } = useParams();
  const [book, setBook] = useState<IBook | null>(null)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCatalogue());
    list.filter(book => {
      if (book.id === bookId) {
        setBook(book)
      }
    });
  }, [list]);

  if (book) {
    return (
      <Row>
        <Card className="book-card">
          <Col>
            <Card.Img 
              className="book-img"
              variant="top"
              src={`.${book.imageLink}`}
              alt={`${book.title} book cover`} />            
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
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
        </Card>
      </Row>
    )
  }
  return (
    <h2>The book doesn't exist</h2>
  )
};

export default BookDetails;