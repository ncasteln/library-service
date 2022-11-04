import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCatalogue } from '../features/catalogue/catalogueSlice';
import { Carousel, Spinner, Alert, Container } from 'react-bootstrap';

const Home = () => {
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
    <Container className='Home'>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bookList[4]?.imageLink}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bookList[5]?.imageLink}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bookList[6]?.imageLink}
            alt="Third slide"
            
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
};

export default Home;