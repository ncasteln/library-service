import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { patchCatalogue } from "../catalogue/catalogueSlice";
import { IBook } from "../catalogue/catalogueSlice";
import { reserve } from "./userBooksSlice";
import { showMessage } from "../message/messageSlice";

const Reserve = ({ book }: {
  book: IBook; 
}) => {
  const reservations = useAppSelector(state => state.user.reservations)
  const { id: userId, role } = useAppSelector(state => state.auth.profile);
  const { id: bookId, book_status} = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userId) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (role === 'user' && reservations !== null) {
        if (book_status.copies > 0) {
          const alreadyBooked = reservations.find(id => id === bookId)
          if (!alreadyBooked) {
            const patchResponse = await dispatch(patchCatalogue({ bookId, userId, book_status }));
            if (patchResponse.payload) {
              dispatch(reserve({ bookId, userId, reservations }))
            }
          }
          else {
            dispatch(showMessage({
              title: 'The book is already reserved!',
              bodyText: `You've already reserved this book. Check your reservation list in 
                your personal section.`
            }))
          }
        }
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
  }

  return (
    <Button onClick={handleClick}>Book now!</Button>
  )
};

export default Reserve;