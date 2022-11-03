import { Card } from "react-bootstrap";

const NoMatch = () => {
  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Whooops!</Card.Title>
        <Card.Subtitle>I couldn't find the page.</Card.Subtitle>
        <Card.Text>
          The page you asked for doesn't exist. 
        </Card.Text>
      </Card.Body>
    </Card>
  )
};

export default NoMatch;