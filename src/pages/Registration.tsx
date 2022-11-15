import { useState } from "react";
import { Form, Spinner, Col, Button, Container, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IRegistration, registration } from "../features/user/userSlice";

// NOTES
// Form require a validation - use Formik, HTML or other ?
// not valid if empty

const Registration = () => {
  const status = useAppSelector(state => state.response.status);
  const dispatch = useAppDispatch();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<IRegistration>({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
    // setValidated(true);
    e.preventDefault();
    dispatch(registration(formData));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (status === 'idle') {
    return (
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {
            Object.entries(formData).map(([key, value], i) => {
              return (
                <Form.Group key={`form-group-${i}`} as={Col} md="4" controlId={`validationCustom0${i + 1}`}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    required
                    type={
                      key === 'email'
                        ? 'email'
                        : key === 'password'
                          ? 'password'
                          : 'text'
                    }
                    placeholder={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              )
            })
          }
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
    );
  }
  else if (status === 'pending') {
    return (
      <Spinner animation="grow" />
    )
  }
  else if (status === 'rejected') {
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
  }
  return (
    <Container className="p-3">
      <Alert variant="success">
        <Alert.Heading>Successfully registered!</Alert.Heading>
        <p>
          Welcome in Bibl.io. We hope, the service will be enough good.
        </p>
        <hr />
        <p className="mb-0">
          You will recive a mail to confirm your registration. In this part 
          there is a Backend which I cannot configure for now.
        </p>
      </Alert>
    </Container>
  )
};

export default Registration;