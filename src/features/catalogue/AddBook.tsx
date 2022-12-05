import { Form, Row, Col, Button, Container } from "react-bootstrap";

const AddBook = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Add Book action - need implementation');
  }

  return (
    <Container className="AddBook">
      <h1>Add a book to the Catalogue</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Author
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Year
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Year" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Pages
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Pages" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Language
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Language" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Country
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Country" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Wikipedia link
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Wikipedia link" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Image Link
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Image link" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Add Book</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
};

export default AddBook;