import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../features/authentication/authSlice";

// NOTES
// automatically redirect to profile! use redirect or useNavigate or what??
// Pop out a message for successfully login - failed login
// use localSotrage or something similar to make the state persistent
// navigate in useEffect ?
// add isAuthenticated state ??

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userId = useAppSelector(state => state.auth.userId)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (userId) {
  //     const from = location.state?.from?.pathname || `/${userId}/profile`;
  //     navigate(from, { replace: true, state: userId });
  //     console.log(`The redirection path was ${from}`)
  //   }
  // }, [userId]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  }

  if (userId) {
    return <div>You're already logged in</div>
  }
  return (
    <Container className='Login-container d-flex justify-content-center align-items-center'>
      <Form className='Login p-4' onSubmit={handleSubmit}>
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
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <div>ADMIN melissa.fleming@example.com sick</div>
        <div>USER christoffer.christiansen@example.com samuel</div>
        <div>USER kayla.hall@example.com lickit</div>
      </Form>
    </Container>
  )
};

export default Login;