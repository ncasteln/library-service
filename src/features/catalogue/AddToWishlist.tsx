import { Buttons } from '@testing-library/user-event/dist/types/system/pointer/buttons';
import { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToWishlist } from '../user/userSlice';
import { IBook } from './catalogueSlice';

const AddToWishlist = (book: IBook) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id: userId, role, wishlist } = useAppSelector(state => state.user.userInfo);
  const { id: bookId } = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userId === undefined) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (role === 'user') {
        isFavourite
          ? // dispatch(removeFromWishlist({ bookId, userId }))
          : // dispatch(addToWishlist({ bookId, userId }))
        setIsFavourite(!isFavourite)
      }
      else {
        alert(`You're logged as Admin. To reserve a book, use your private account.`)
      }
    }
  };

  return (
    <button 
      className='AddToWishlist'
      onClick={handleClick}>
      {
        isFavourite
          ? <BsStarFill />
          : <BsStar />
      }
    </button>
  )
};

export default AddToWishlist;