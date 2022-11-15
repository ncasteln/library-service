import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCatalogue } from '../features/catalogue/catalogueSlice';
import { Carousel, Spinner, Alert, Container } from 'react-bootstrap';
import Rejected from '../components/Rejected';

// NOTES
// Make the carousel dynamic with random books, or last books (3 or 4)
// Link to the relative book
// Understand if use a Container is better
// Make DRY - Spinner and Alert shared components, between Home and Catalogue

const Home = () => {
  const status = useAppSelector(state => state.response.status);
  const list = useAppSelector(state => state.catalogue.list);
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
    <div className='Carousel-container'>
      <Carousel 
        className='Carousel'
        nextLabel={''}
        prevLabel={''}>
        <Carousel.Item className='Carousel-item'>
          <img
            className="d-block w-75 mx-auto mt-4"
            src={list[40]?.imageLink}
            alt={`${list[40]?.title} cover`}
          />
        </Carousel.Item>

        <Carousel.Item className='Carousel-item'>
          <img
            className="d-block w-75 mx-auto mt-4"
            src={list[50]?.imageLink}
            alt={`${list[50]?.title} cover`}
          />
        </Carousel.Item>

        <Carousel.Item className='Carousel-item'>
          <img
            className="d-block w-75 mx-auto mt-4"
            src={list[70]?.imageLink}
            alt={`${list[70]?.title} cover`}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
};

export default Home;