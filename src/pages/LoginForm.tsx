import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/user/userSlice";
import { Link, redirect } from "react-router-dom";

// NOTES
// automatically redirect to profile! use redirect or useNavigate or what??
// Pop out a message for successfully login - failed login

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login form</h2>
      <Form.Group>
        <Form.Label>
          Enter your email and password to access your private data.
        </Form.Label>
        <Link to='/registration'> Are you not yet registered?</Link>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <div>Example melissa.fleming@example.com sick</div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
};

export default LoginForm;