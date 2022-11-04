import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from 'react'
import { fetchCatalogue } from "./catalogueSlice";
import { Spinner, Alert, Form, Button, Container, Row } from 'react-bootstrap'
import BookCard from "../../components/BookCard";
import { useParams } from "react-router-dom";

// NOTES
// Make the fakePlaceholder for cards

const Catalogue = () => {
  const responseStatus = useAppSelector(state => state.catalogue.responseStatus);
  const bookList = useAppSelector(state => state.catalogue.bookList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCatalogue());
  }, []);

  if (responseStatus === 'loading') {
    return (
      <Spinner animation="grow" />
    )
  }
  else if (responseStatus === 'rejected') {
    return (
      <Container className="p-3">
        <Alert variant="danger">
          <Alert.Heading>Whoops! Something went wrong...</Alert.Heading>
          <p>
            Relax! Something with our database went wrong. Maybe the cause was 
            the Front-End, or maybe it was the Back-End.
          </p>
          <hr />
          <p className="mb-0">
            In every case, don't worry, you need only to refresh the page!
          </p>
        </Alert>
      </Container>
    )
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
          bookList.map((item, i) => {
            return (
              <BookCard 
                key={`book-${i}`} 
                {...item} />
            )
          })
        }
      </Row>
    </Container>
  )
};

export default Catalogue;
