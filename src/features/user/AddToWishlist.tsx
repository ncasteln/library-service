import { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateWishlist } from './userBooksSlice';
import { IBook } from '../catalogue/catalogueSlice';
import { showMessage } from '../message/messageSlice';

// NOTES
// Add scrollPosition after rendering - useState or sessionStorage

const AddToWishlist = (book: IBook) => {
  // Local state for rendering
  const [isFavourite, setIsFavourite] = useState(false);
  
  // Redux selectors
  const userId = useAppSelector(state => state.auth.profile.id);
  const { role } = useAppSelector(state => state.auth.profile);
  const wishlist = useAppSelector(state => state.user.wishlist);
  const { id: bookId } = book;

  // Hooks for redirection
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (wishlist && role === 'user') {
      setIsFavourite(wishlist.includes(bookId))
    }
  }, []);

  const prepareNewWishlist = (wishlist: string[]) => {
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
        const newWishlist = prepareNewWishlist(wishlist);
        setIsFavourite(!isFavourite)
        dispatch(updateWishlist({ userId, newWishlist }))
      }
      // This fallback should never happen, because the <Reserve /> is user-role based
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