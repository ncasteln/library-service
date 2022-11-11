import { Table } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { IBook } from "../../features/catalogue/catalogueSlice";
import { useEffect } from 'react'

const Reservations = () => {
  const current = useAppSelector(state => state.user.userInfo.reservations.current);
  const list = useAppSelector(state => state.catalogue.list);

  return (
    <div>
      {
        current.length === 0
          ? <div>You have no current reservations</div>
          : 
          <div>
          </div>
          // <Table striped bordered hover>
          //   <thead>
          //     <tr>
          //       <th>#</th>
          //       <th>Title</th>
          //       <th>Author</th>
          //       <th>Year</th>
          //     </tr>
          //   </thead>
          //   <tr>
          //     {/* <td>{i}</td>
          //     <td>{book.title}</td>
          //     <td>{book.author}</td>
          //     <td>{book.year}</td> */}
          //   </tr>
          //   <div>
          //     {
          //       current.filter(bookId => {
          //         bookList.filter(book => {
          //           if (bookId === book.id) {
          //             return (
          //               <div>{book.title} from {book.author}</div>
          //             )
          //           }
          //         })
          //       })
          //     }
          //   </div>
          // </Table>
      }
    </div>
  )
};

export default Reservations;