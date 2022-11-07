import { useState } from "react";
import { Form, Row, InputGroup, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { registration } from "../features/user/userSlice";
import { IUserInfo } from "../features/user/userSlice";

// NOTES
// Add the following fields
  // "email": "melissa.fleming@example.com",
  //   "birthdate": 469521368,
  //   "picture": "algolia/women/pragati.png"
// Refactor and understand well the code

const Registration2 = () => {
  const dispatch = useAppDispatch();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<IUserInfo>({
    id: null,
    role: 'user',
    reservations: {
      current: [],
      history: [],
      wishlist: []
    },
    location: {
      street: '',
      city: '',
      state: '',
      postcode: null
    },
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    picture: ''
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    // dispatch(Registration2())
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;
    console.log(name)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <button onClick={() => console.log(formData)}>Log formData</button>
      <div>
        {
          Object.entries(formData).map(([key, value]) => {
            return (
              <>
              <Form.Group as={Col} md="4" controlId="">
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              </>
            )
          })
        }
      </div><Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name='username'
                value={formData.username}
                onChange={handleChange}
                />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                name='password'
                value={formData.password}
                onChange={handleChange}
                />
              <Form.Control.Feedback type="invalid">
                Please choose a password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" placeholder="Street address" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid street address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Postcode</Form.Label>
            <Form.Control type="text" placeholder="Postcode" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid postcode.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Postcode</Form.Label>
            <Form.Control type="text" placeholder="Postcode" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid postcode.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

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
};

export default Registration2;