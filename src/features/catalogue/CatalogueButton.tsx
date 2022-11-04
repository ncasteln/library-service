import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { reserveBook } from "../user/userSlice";

// NOTES
// Navigate to Login if not logged
// redirect instead of useNavigate ?
// Don't pass only the book_id but the entire book

const CatalogueButton = ({ action, book_id }: {
  action: string;
  book_id: string;
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
      if (action === 'Book now!') {
        dispatch(reserveBook(book_id))
      }
      else if (action === 'Add to Wishlist') {
        // dispatch(addToWishlist(book_id))
      }
    }
  }

  return (
    <Button onClick={handleClick}>{action}</Button>
  )
};

export default CatalogueButton;