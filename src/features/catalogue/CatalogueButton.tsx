import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { reserveBook } from "../user/userSlice";
import { IBook } from "./catalogueSlice";

// NOTES
// Don't pass only the book_id but the entire book

const CatalogueButton = ({ action, book }: {
  action: string;
  book: IBook;
}) => {
  const userInfo = useAppSelector(state => state.user.userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (Object.keys(userInfo).length === 0) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (userInfo.role === 'user') {
        if (action === 'Book now!') {
          dispatch(reserveBook(book))
        }
        else if (action === 'Add to Wishlist') {
          // dispatch(addToWishlist(book_id))
        }
      }
      else {
        alert(`You're logged as Admin. To reserve a book, use your private account.`)
      }
    }
  }

  return (
    <Button onClick={handleClick}>{action}</Button>
  )
};

export default CatalogueButton;