import { Table } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import renderTable from "./renderTable";

const Reservations = () => {
  const current = useAppSelector(state => state.user.userInfo.reservations.current);
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
        {renderTable('reservations', list, current)}
      </tbody>
    </Table>
  )
};

export default Reservations;