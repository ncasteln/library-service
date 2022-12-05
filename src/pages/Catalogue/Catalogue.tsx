import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from 'react'
import { getCatalogue, IBook } from "../../features/catalogue/catalogueSlice";
import {  Spinner, Form, Row } from 'react-bootstrap'
import BookCard from "./BookCard";
import Rejected from "../../components/Rejected";
import ModalMessage from "../../components/ModalMessage";

// NOTES
// Make the fakePlaceholder for cards

const Catalogue = () => {
  const status = useAppSelector(state => state.response.status);
  const list = useAppSelector(state => state.catalogue.list);
  const { title, bodyText, show } = useAppSelector(state => state.message)
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(getCatalogue());
  }, []);

  if (status === 'pending') {
    return <Spinner animation="border" />
  }
  else if (status === 'rejected') {
    return <Rejected />
  }
  return (
    <div className="Catalogue">
      <Form className="d-flex mb-5"> 
        <Form.Control
          value={filter}
          onChange={(e) => setFilter((e.target.value).toLowerCase())}
          type="search"
          placeholder="Filter the catalogue by title..."
          className="me-2"
          aria-label="Search"
        />
      </Form>

      <Row xs={1} md={2} className="g-4">
        {
          filter
            ? list
              .filter(book => {
                return Object.values(book)[8].toLowerCase().includes(filter)
              })
              .map((book, i) => {
                return (
                  <BookCard
                    book={book}
                    key={`book-${i}`} />
                )
              })
            : list.map((book, i) => {
                return (
                  <BookCard
                    book={book}
                    key={`book-${i}`} />
                )
              })
        }
      </Row>
      {
        show
          ? <ModalMessage
              title={title}
              bodyText={bodyText}
              show={show} />
          : null  
      }
    </div>
  )
};

export default Catalogue;
