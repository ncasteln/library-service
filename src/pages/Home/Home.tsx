import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCatalogue } from '../../features/catalogue/catalogueSlice';
import { Spinner } from 'react-bootstrap';
import Rejected from '../../components/Rejected';
import getRandomList from './getRandomList';
import { Navigate, useNavigate } from 'react-router-dom';

// NOTES
// Make the carousel dynamic with random books, or last books (3 or 4)
// Link to the relative book
// Understand if use a Container is better
// Make DRY - Spinner and Alert shared components, between Home and Catalogue
// perchè NON posso passare da Home a catalogue/bookId?

const Home = () => {
  const status = useAppSelector(state => state.response.status);
  const list = useAppSelector(state => state.catalogue.list);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCatalogue());
  }, []);

  const handleClick = (bookId: string): void => {
    navigate(`/catalogue/${bookId}`);
  }

  if (status === 'pending') {
    return <Spinner animation="grow" />
  }
  else if (status === 'rejected') {
    return <Rejected />
  }
  else {
    return (
      <div className='Home'>
        <h1 className='home-title'>Welcome to Bibl.io</h1>
        <h2 className='carousel-title'>Last added</h2>
        <hr />
        <div className='carousel-container'>
          {
            getRandomList(10).map(n => {
              return (
                <article key={`book-${n}`}>
                  <img
                    onClick={() => handleClick(list[n]?.id)}
                    className='carousel-img'
                    src={list[n]?.imageLink}
                    alt={`${list[n]?.title} cover`} />
                </article>
              )
            })
          }
          
        </div>
        <h2 className='carousel-title'>Most reserved</h2>
        <hr />
        <div className='carousel-container'>
          {
            getRandomList(10).map(n => {
              return (
                <article key={`book-${n}`}>
                  <img
                    onClick={() => handleClick(list[n]?.id)}
                    className='carousel-img'
                    src={list[n]?.imageLink}
                    alt={`${list[n]?.title} cover`} />
                </article>
              )
            })
          }
        </div>
        <h2 className='carousel-title'>Top favourite</h2>
        <hr />
        <div className='carousel-container'>
          {
            getRandomList(10).map(n => {
              return (
                <article key={`book-${n}`}>
                  <img
                    onClick={() => handleClick(list[n]?.id)}
                    className='carousel-img'
                    src={list[n]?.imageLink}
                    alt={`${list[n]?.title} cover`} />
                </article>
              )
            })
          }
        </div>
      </div>
    )
  }
};

export default Home;


{/* <Carousel 
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
      </Carousel> */}