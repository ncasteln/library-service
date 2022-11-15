import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { patchCatalogue } from "../catalogue/catalogueSlice";
import { IBook } from "../catalogue/catalogueSlice";
import { reserve } from "./userSlice";
import ModalMessage from "../../components/ModalMessage";
import { useState } from "react";

// NOTES
// substitute 2 alerts with Modal message from Bootstrap
// extract condition to dispatch action in createAsyncThunk?
// role === user a level up, so it doesn't render?
// copies > 0 is maybe not necessary, but is a good ass check if the action should be dispatched

const Reserve = (book: IBook) => {
  const reservations = useAppSelector(state => state.user.reservations)
  const { id: userId, role } = useAppSelector(state => state.user.profile);
  const { id: bookId, book_status} = book;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userId) {
      navigate('/login', { replace: true, state: { from: location } })
    }
    else {
      if (role === 'user') {
        if (book_status.copies > 0) {
          const alreadyBooked = reservations.find(id => id === bookId)
          if (!alreadyBooked) {
            const patchResponse = await dispatch(patchCatalogue({ bookId, userId, book_status }));
            if (patchResponse.payload) {
              dispatch(reserve({ bookId, userId, reservations }))
            }
          }
          else {
            alert('Already booked')
          }
        }
      }
      else {
        alert(`You're logged as Admin. To reserve a book, use your private account.`)
      }
    }
  }

  return (
    <>
      <Button onClick={handleClick}>Book now!</Button>
    </>
  )
};

export default Reserve;