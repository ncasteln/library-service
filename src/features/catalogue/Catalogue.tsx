import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from 'react'
import { getCatalogue } from "./catalogueSlice";
import { Spinner, Alert, Form, Button, Container, Row } from 'react-bootstrap'
import BookCard from "./BookCard";
import Rejected from "../../components/Rejected";

// NOTES
// Make the fakePlaceholder for cards

const Catalogue = () => {
  const responseStatus = useAppSelector(state => state.catalogue.responseStatus);
  const list = useAppSelector(state => state.catalogue.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCatalogue());
  }, []);

  if (responseStatus === 'loading') {
    return <Spinner animation="grow" />
  }
  else if (responseStatus === 'rejected') {
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
                key={`book-${i}`} 
                {...book} />
            )
          })
        }
      </Row>
    </Container>
  )
};

export default Catalogue;
