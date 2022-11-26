import { Form, Container, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registration, IRegistration } from '../features/authentication/authSlice';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// NOTES
// 1) check if email-username exist (with a watcher)
// 2) submit
// 3) generate nanoid() but different - but the ids are fake
// 4) login directly && make a new empty reservation field - also fake
// 5) redirect to the profile page

// add pwd confirmation
// add pattern and validation messages

const Registration = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.response.status);
  const { register, handleSubmit, formState: { errors } } = useForm<IRegistration>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    }
  });
  const navigate = useNavigate();
  const userId = useAppSelector(state => state.auth.profile.id)

  useEffect(() => {
    if(userId) {
      navigate(`/user/${userId}/profile`);
    }
  }, [userId]);

  const onSubmit: SubmitHandler<IRegistration> = async (data) => {
    await dispatch(registration(data));
  };

  if (status === 'pending') {
    return <Spinner animation="border" />
  }
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Form className='generic-form registration-form p-4' onSubmit={handleSubmit(onSubmit)}>
        <h2>Registration form</h2>
        <Form.Group className="mb-3">
          <Form.Label>
            Fill the form and click the submit button to join our services.
            All the fields are required.
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            placeholder='Mario'
            {...register("first_name", {
            required: true })}
            aria-invalid={errors.first_name ? 'true' : 'false'} />
            {errors.first_name && <small className='form-error ml-3'>This field is required</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            placeholder='Rossi'
            {...register("last_name", {
            required: true })} 
            aria-invalid={errors.first_name ? 'true' : 'false'} />
            {errors.last_name && <small className='form-error ml-3'>This field is required</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            placeholder='Mariolino89'
            {...register("username", {
            required: true })} 
            aria-invalid={errors.username ? 'true' : 'false'} />
            {errors.username && <small className='form-error ml-3'>This field is required</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            placeholder='mario.rossi@fakeemail.it'
            {...register("email", {
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} 
            aria-invalid={errors.email ? 'true' : 'false'} />
            {errors.email && <small className='form-error ml-3'>This field is required</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            placeholder='MySuperSecretPwd1234'
            type='password'
            {...register("password", {
            required: true })}
            aria-invalid={errors.password ? 'true' : 'false'} />
            {errors.password && <small className='form-error ml-3'>This field is required</small>}
        </Form.Group>

        <button className='main-button' type='submit'>Submit</button>
      </Form>
    </Container>
  );
};

export default Registration;