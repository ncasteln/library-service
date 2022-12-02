import { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../features/authentication/authSlice";

// NOTES
// use localSotrage or something similar to make the state persistent
// Add form validation

const Login = () => {
  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux state
  const userId = useAppSelector(state => state.auth.profile.id);
  const role = useAppSelector(state => state.auth.profile.role);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const error = useAppSelector(state => state.auth.error);
  
  // Redirect hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (userId) {
      const from = location.state?.from?.pathname || `/${role}/${userId}/profile`;
      navigate(from, { replace: true, state: userId });
      console.log(`The redirection path was ${from}`)
    }
  }, [userId]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  if (isAuth) {
    return <small>You're already logged in!</small>
  }
  return (
    <Container className='d-flex justify-content-center align-items-center Login'>
      <Form className='generic-form p-4' onSubmit={handleSubmit}>
        <h2>Login form</h2>
        <Form.Group className="mb-3">
          <Form.Label>
            Enter your email and password to access your data.
            <Link to='/registration'> Not an account yet?</Link>
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='form-label'>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label className='form-label'>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <button className="main-button" type="submit">
          Submit
        </button>
        {
          error
            ? <p className="form-error m-3">
                Sorry, your credentials were wrong. Please, check them and retry.
              </p>
            : null
        }
        <h6 className='mt-3'>Login examples</h6>
        <small>ADMIN melissa.fleming@example.com - sick</small><br/>
        <small>ADMIN valtteri.pulkkinen@example.com peepee</small><br/>
        <small>USER christoffer.christiansen@example.com - samuel</small><br/>
        <small>USER kayla.hall@example.com - lickit</small><br/>
        <small>USER todd.beck@example.com - rrrrr</small>
      </Form>
    </Container>
  )
};

export default Login;