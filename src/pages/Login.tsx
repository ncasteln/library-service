import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/user/userSlice";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

// NOTES
// automatically redirect to profile! use redirect or useNavigate or what??
// Pop out a message for successfully login - failed login
// use localSotrage or something similar to make the state persistent
// navigate in useEffect ?
// add isAuthenticated state ??

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(state => state.user.userInfo)

  // means: if there was a location which needs authentication, return there, otherwise go /profile
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResult = await dispatch(login({ email, password }));
    const userId: string = loginResult.payload[0].id;
    setEmail('');
    setPassword('');
    const from = location.state?.from?.pathname || `/${userId}/profile`;
    navigate(from, { replace: true, state: userId });
    console.log(`The redirection path was ${from}`)
  }

  if (userInfo?.id) {
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
        <Button variant="primary" type="submit">
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