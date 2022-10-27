import { useAppSelector } from "../../app/hooks";
import Book from "../../components/Book";
import { Row, Container, Form, Button } from "react-bootstrap";

const Catalogue = () => {
  const bookList = useAppSelector(state => state.catalogue.bookList)

  return (
    <Row xs={1} md={3} className="g-4">
      {
        bookList.map((item, i) => {
          return (
            <Book key={`book-${i}`} {...item} />
          )
        })
      }
    </Row>
  )
}

export default Catalogue;