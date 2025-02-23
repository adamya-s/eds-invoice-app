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
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      onLogin();
      navigate('/dashboard');
    }
  }, [navigate, onLogin]);

  const handleSubmit = (values, { setSubmitting }) => {
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
      navigate('/');
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
