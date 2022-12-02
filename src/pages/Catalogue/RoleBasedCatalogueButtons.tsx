import { Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import AddToWishlist from "../../features/user/AddToWishlist";
import Reserve from "../../features/user/Reserve";
import { IBook } from "../../features/catalogue/catalogueSlice";

const RoleBasedCatalogueButtons = ({ book }: {
  book: IBook;
}) => {
  const role = useAppSelector(state => state.auth.profile.role);

  const handleClick = () => {
    console.log(`Admin's action - need implementation`);
  }

  if (role === 'user' || !role) {
    return (
      <>
        {
          book.book_status.copies > 0
            ? <Reserve book={book} />
            : null
        }
        <AddToWishlist {...book} />
      </>
    )
  }
  else if (role === 'admin') {
    return (
      <>
        <Button onClick={handleClick}>Edit</Button>
        <Button onClick={handleClick}>Set out of stock</Button>
      </>
    )
  }
  return null;
};

export default RoleBasedCatalogueButtons;