import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { fetchCatalogue } from '../features/catalogue/catalogueSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchCatalogue());
  // }, []);

  return (
    <div>
      <h1>Bibl.io</h1>
      <h2>Last arrivals</h2>
      <div>Fetch only last books</div>
      <h2>Most popular</h2>
      <div>Fetch only popular books</div>
    </div>
  )
};

export default Home;