import { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToWishlist, removeFromWishlist } from './userSlice';
import { IBook } from '../catalogue/catalogueSlice';

const AddToWishlist = (book: IBook) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id: userId, role, wishlist } = useAppSelector(state => state.user.userInfo);
  const { id: bookId } = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (role === 'user') {
      setIsFavourite(wishlist.includes(bookId))
    }
  }, [])

  const createNewWishlist = (wishlist: string[]) => {
    const newWishlist = [...wishlist];
    const position = newWishlist.indexOf(bookId);
    newWishlist.splice(position, 1);
    return newWishlist;
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userId === undefined) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (role === 'user') {
        if (isFavourite) {
          const newWishlist = createNewWishlist(wishlist)  
          dispatch(removeFromWishlist({ userId, newWishlist }))
        }
        else {
          dispatch(addToWishlist({ bookId, userId, wishlist }))
        }
        setIsFavourite(!isFavourite)
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