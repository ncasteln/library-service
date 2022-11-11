import { Alert, Container } from "react-bootstrap";

const Rejected = () => {
  return (
    <Container className="p-3">
      <Alert variant="danger">
        <Alert.Heading>Whoops! Something went wrong...</Alert.Heading>
        <p>
          Relax! Something with our database went wrong. Maybe the cause was 
          the Front-End, or maybe it was the Back-End.
        </p>
        <hr />
        <p className="mb-0">
          In every case, don't worry, you need only to refresh the page!
        </p>
      </Alert>
  </Container>
  )
};

export default Rejected;