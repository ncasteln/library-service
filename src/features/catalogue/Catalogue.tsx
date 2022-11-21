import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from 'react'
import { getCatalogue } from "./catalogueSlice";
import {  Spinner, Form, Button, Container, Row } from 'react-bootstrap'
import BookCard from "./BookCard";
import Rejected from "../../components/Rejected";
import ModalMessage from "../../components/ModalMessage";

// NOTES
// Make the fakePlaceholder for cards

const Catalogue = () => {
  const status = useAppSelector(state => state.response.status);
  const list = useAppSelector(state => state.catalogue.list);
  const { title, bodyText, show } = useAppSelector(state => state.message)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCatalogue());
  }, []);

  if (status === 'pending') {
    return <Spinner animation="grow" />
  }
  else if (status === 'rejected') {
    return <Rejected />
  }
  return (
    <Container as="ul" className="p-3">
      <Form className="d-flex"> 
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Row xs={1} md={3} className="g-4">
        {
          list.map((book, i) => {
            return (
              <BookCard
                book={book}
                key={`book-${i}`} />
            )
          })
        }
      </Row>
      {
        show
          ? <ModalMessage
              title={title}
              bodyText={bodyText}
              show={show} />
          : null  
      }
    </Container>
  )
};

export default Catalogue;
