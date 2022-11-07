import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCatalogue } from '../features/catalogue/catalogueSlice';
import { Carousel, Spinner, Alert, Container } from 'react-bootstrap';

// NOTES
// Make the carousel dynamic with random books, or last books (3 or 4)
// Link to the relative book
// Understand if use a Container is better
// Make DRY - Spinner and Alert shared components, between Home and Catalogue

const Home = () => {
  const responseStatus = useAppSelector(state => state.catalogue.responseStatus);
  const bookList = useAppSelector(state => state.catalogue.bookList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCatalogue());
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
    <div className='Carousel-container'>
      <Carousel 
        className='Carousel'
        nextLabel={''}
        prevLabel={''}>
        <Carousel.Item className='Carousel-item'>
          <img
            className="d-block w-75 mx-auto mt-4"
            src={bookList[40]?.imageLink}
            alt={`${bookList[40]?.title} cover`}
          />
        </Carousel.Item>

        <Carousel.Item className='Carousel-item'>
          <img
            className="d-block w-75 mx-auto mt-4"
            src={bookList[50]?.imageLink}
            alt={`${bookList[50]?.title} cover`}
          />
        </Carousel.Item>

        <Carousel.Item className='Carousel-item'>
          <img
            className="d-block w-75 mx-auto mt-4"
            src={bookList[70]?.imageLink}
            alt={`${bookList[70]?.title} cover`}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
};

export default Home;