import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { addToWishlist } from "../user/userSlice";

const CatalogueButton = ({ action, bookTitle }: {
  action: string;
  bookTitle: string;
}
  ) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={
        action === 'Book now!'
          ? () => {console.log('booked')}
          : () => dispatch(addToWishlist(bookTitle))
      }>
        {action}
    </Button>
  )
};

export default CatalogueButton;