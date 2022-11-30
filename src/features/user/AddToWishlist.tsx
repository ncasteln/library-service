import { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateWishlist } from './userSlice';
import { IBook } from '../catalogue/catalogueSlice';
import { showMessage } from '../message/messageSlice';

// NOTES
// prevent global rendering of the page

const AddToWishlist = (book: IBook) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const userId = useAppSelector(state => state.auth.profile.id);
  const { role } = useAppSelector(state => state.auth.profile);
  const wishlist = useAppSelector(state => state.user.wishlist);
  const { id: bookId } = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (wishlist && role === 'user') {
      setIsFavourite(wishlist.includes(bookId))
    }
  }, []);

  const prepareNewWishlist = async (wishlist: string[]) => {
    const newWishlist = [...wishlist];
    const position = newWishlist.indexOf(bookId);
    if(position === -1) {
      newWishlist.push(bookId);
    } else {
      newWishlist.splice(position, 1);
    }
    return newWishlist;
  }

  const handleClick = async () => {
    if (!userId) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (wishlist && role === 'user') {
        const newWishlist = await prepareNewWishlist(wishlist);
        setIsFavourite(!isFavourite)
        dispatch(updateWishlist({ userId, newWishlist }))
      }
      else {
        dispatch(showMessage({
          title: `You're logged as Admin!`,
          bodyText: `Since you're logged as Admin, you should know that you're not allowed
            to perform this action. We suggest you to login with your user account.`
        }))
      }
    }
  };
  return (
    <>
      <button 
        className='AddToWishlist'
        onClick={handleClick}>
        {
          isFavourite
            ? <BsStarFill />
            : <BsStar />
        }
      </button>
    </>
  )
};

export default AddToWishlist;