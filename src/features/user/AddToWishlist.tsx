import { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateWishlist } from './userSlice';
import { IBook } from '../catalogue/catalogueSlice';

// NOTES
// prevent global rendering of the page

const AddToWishlist = (book: IBook) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const userId = useAppSelector(state => state.auth.userId);
  const { role } = useAppSelector(state => state.user.profile);
  const wishlist = useAppSelector(state => state.user.wishlist);
  const { id: bookId } = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (role === 'user') {
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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userId) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (role === 'user') {
        const newWishlist = await prepareNewWishlist(wishlist);
        setIsFavourite(!isFavourite)
        console.log(newWishlist)
        dispatch(updateWishlist({ userId, newWishlist }))
      }
      else {
        alert(`You're logged as Admin. To reserve a book, use your private account.`)
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