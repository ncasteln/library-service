import { Badge, Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import AddToWishlist from "../user/AddToWishlist";
import Reserve from "../user/Reserve";
import { IBook } from "./catalogueSlice";

const CatalogueActions = ({ book }: {
  book: IBook;
}) => {
  const role = useAppSelector(state => state.auth.profile.role);

  if (role === 'user' || !role) {
    return (
      <>
        <Reserve book={book} />
        <AddToWishlist {...book} />
      </>
    )
  }
  else if (role === 'admin') {
    return (
      <>
        <Button>Admin's action 1</Button>
        <Button>Admin's action 2</Button>
      </>
    )
  }
  return null;
};

export default CatalogueActions;