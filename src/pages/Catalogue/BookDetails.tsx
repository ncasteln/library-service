import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCatalogue, IBook } from "../../features/catalogue/catalogueSlice";
import { Badge, Card, Col, Row } from "react-bootstrap";
import CatalogueActions from "../../features/catalogue/CatalogueActions";

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
      <Card className="book-details">
        <Row>
          <Col className='book-details-img-container'>
            <Card.Img 
              className="book-details-img"
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
        </Row>
      </Card>
    )
  }
  return (
    <h2>The book doesn't exist</h2>
  )
};

export default BookDetails;