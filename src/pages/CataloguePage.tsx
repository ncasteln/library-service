import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from 'react'
import { fetchCatalogue } from "../features/catalogue/catalogueSlice";
import { Spinner, Alert, Form, Button, Container } from 'react-bootstrap'
import Catalogue from "../features/catalogue/Catalogue";

const CataloguePage = () => {
  const responseStatus = useAppSelector(state => state.catalogue.responseStatus)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCatalogue());
  }, []);

  if (responseStatus === 'fulfilled') {
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
        <Catalogue />
      </Container>

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
  else {
    return (
      <Spinner animation="grow" />  // Center the spinnner, make the fakePlace holder for cards
    )
  }
};

export default CataloguePage;
