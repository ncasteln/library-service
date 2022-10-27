import { Card } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Whooops!</Card.Title>
        <Card.Subtitle>I couldn't find the page.</Card.Subtitle>
        <Card.Text>
          The page you asked for doesn't exist, or is expired. 
        </Card.Text>
      </Card.Body>
    </Card>
  )
};

export default NotFoundPage;