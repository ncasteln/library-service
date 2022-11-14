import { Table } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import renderTable from "./renderTable";

const Wishlist = () => {
  const wishlist = useAppSelector(state => state.user.userInfo.wishlist);
  const list = useAppSelector(state => state.catalogue.list);
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {renderTable('wishlist', list, wishlist)}
      </tbody>
    </Table>
  )
};

export default Wishlist;