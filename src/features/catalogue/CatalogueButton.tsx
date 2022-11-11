import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { patchCatalogue } from "./catalogueSlice";
import { IBook } from "./catalogueSlice";
import { reserve } from "../user/userSlice";

// NOTES
// substitute 2 alerts with Modal message from Bootstrap
// extract condition to dispatch action in createAsyncThunk?

const CatalogueButton = ({ action, book }: {
  action: string;
  book: IBook;
}) => {
  const { id: userId, role, reservations } = useAppSelector(state => state.user.userInfo);
  const { id: bookId, book_status } = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userId === undefined) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (role === 'user') {
        if (action === 'Book now!') {
          const alreadyBooked = reservations.current.find(id => id === bookId)
          if (!alreadyBooked) {
            const patchResult = await dispatch(patchCatalogue({ bookId, userId, book_status }));
            if (patchResult.meta.requestStatus === 'fulfilled') {
              dispatch(reserve({ bookId, userId, reservations }))
            }
          }
          else {
            alert('The book is already reserved!')
          }
        }
        else if (action === 'Add to Wishlist') {

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