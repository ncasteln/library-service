import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { patchCatalogue } from "./catalogueSlice";
import { IBook } from "./catalogueSlice";
import { reserve } from "../user/userSlice";

// NOTES
// Don't pass only the book_id but the entire book

const CatalogueButton = ({ action, book }: {
  action: string;
  book: IBook;
}) => {
  // const { id: userId, role, reservations, username } = useAppSelector(state => state.user.userInfo);
  const userInfo = useAppSelector(state => state.user.userInfo)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userInfo.id === undefined) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (userInfo.role === 'user') {
        if (action === 'Book now!') {
          const alreadyBooked = userInfo.reservations.current.find(item => item[0] === book.id)
          if (!alreadyBooked) {
            await dispatch(patchCatalogue({ book, userInfo }))
            dispatch(reserve({ book, userInfo }))
          }
          else {
            alert('The book is already reserved!')
          }
        }
        else if (action === 'Add to Wishlist') {
          // wishlist action
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