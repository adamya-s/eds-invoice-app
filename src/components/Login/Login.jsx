import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function Login({ onLogin }) {
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // Simulating API call
            console.log('Logging in', values);
            onLogin();
            setSubmitting(false);
          }, 400);
        }}
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
