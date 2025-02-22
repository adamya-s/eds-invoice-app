import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/eds-logo.png';
import './Login.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function Login({ onLogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Check for existing session in localStorage
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      // If session exists, call onLogin and redirect
      onLogin();
      navigate('/dashboard'); // Replace with your main application route
    }
  }, [navigate, onLogin]);

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulating API call
    setTimeout(() => {
      console.log('Logging in', values);
      // Store session data in localStorage
      localStorage.setItem(
        'userSession',
        JSON.stringify({
          username: values.username,
          timestamp: new Date().toISOString(),
        })
      );
      onLogin();
      setSubmitting(false);
      navigate('/'); // Replace with your main application route
    }, 400);
  };
  return (
    <div className='login-container'>
      <div className='logo-container'>
        <img src={Logo} alt='Company Logo' className='company-logo' />
      </div>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        // initialValues={{ username: '', password: '' }}
        // validationSchema={LoginSchema}
        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     // Simulating API call
        //     console.log('Logging in', values);
        //     onLogin();
        //     setSubmitting(false);
        //   }, 400);
        // }}
      >
        {({ isSubmitting }) => (
          <Form className='login-form'>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <Field type='text' name='username' />
              <ErrorMessage name='username' component='div' className='error' />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Field type='password' name='password' />
              <ErrorMessage name='password' component='div' className='error' />
            </div>

            <button type='submit' disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
