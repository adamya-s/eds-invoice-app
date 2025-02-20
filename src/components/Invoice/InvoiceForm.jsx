// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './InvoiceForm.css';
const InvoiceForm = () => (
  <div className='invoice-form-container'>
    <header className='header'>
      <h1>Create New Invoice</h1>
      <nav className='tabs'>
        <button className='tab active'>Vendor Details</button>
        <button className='tab'>Invoice Details</button>
        <button className='tab'>Comments</button>
      </nav>
      <button className='logout-button'>Logout</button>
    </header>

    <div className='form-pdf-container'>
      <div className='pdf-container'>
        <input type='file' accept='.pdf' />
      </div>
      <div>
        <Formik
          initialValues={{
            invoiceNumber: '',
            issueDate: '',
            dueDate: '',
            companyName: '',
            billTo: '',
            billToEmail: '',
            billToAddress: '',
            shipTo: '',
            shipToAddress: '',
            amount: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='invoice-form'>
              <div className='form-group'>
                <label htmlFor='invoiceNumber'>Invoice Number</label>
                <Field type='text' name='invoiceNumber' />
                <ErrorMessage
                  name='invoiceNumber'
                  component='div'
                  className='error'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='issueDate'>Issue Date</label>
                <Field type='date' name='issueDate' />
                <ErrorMessage
                  name='issueDate'
                  component='div'
                  className='error'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='dueDate'>Due Date</label>
                <Field type='date' name='dueDate' />
                <ErrorMessage
                  name='dueDate'
                  component='div'
                  className='error'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='companyName'>Company Name</label>
                <Field type='text' name='companyName' />
                <ErrorMessage
                  name='companyName'
                  component='div'
                  className='error'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='billTo'>Bill To</label>
                <Field type='text' name='billTo' />
                <ErrorMessage name='billTo' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='billToEmail'>Bill To Email</label>
                <Field type='email' name='billToEmail' />
                <ErrorMessage
                  name='billToEmail'
                  component='div'
                  className='error'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='billToAddress'>Bill To Address</label>
                <Field type='text' name='billToAddress' />
                <ErrorMessage
                  name='billToAddress'
                  component='div'
                  className='error'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='shipTo'>Ship To</label>
                <Field type='text' name='shipTo' />
                <ErrorMessage name='shipTo' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='shipToAddress'>Ship To Address</label>
                <Field type='text' name='shipToAddress' />
                <ErrorMessage
                  name='shipToAddress'
                  component='div'
                  className='error'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='amount'>Amount</label>
                <Field type='number' name='amount' />
                <ErrorMessage name='amount' component='div' className='error' />
              </div>

              <div className='button-group'>
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
                <button type='button'>Populate Dummy Data</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

export default InvoiceForm;
