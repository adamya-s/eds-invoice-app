// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import uploadIcon from '../../assets/eds-invoice.gif';
import { TfiDownload } from 'react-icons/tfi';
import { PiBuildingOfficeBold } from 'react-icons/pi';
import { TbInvoice } from 'react-icons/tb';
import { LiaCommentSolid } from 'react-icons/lia';
import './InvoiceForm.css';
const InvoiceForm = () => (
  <div className='invoice-form-container'>
    <header className='header'>
      <div className='header-left'>
        <h1>Create New Invoice</h1>
      </div>
      <div className='header-right'>
        <nav className='tabs'>
          <button className='tab active'>Vendor Details</button>
          <button className='tab'>Invoice Details</button>
          <button className='tab'>Comments</button>
        </nav>
        <button className='logout-button'>Logout</button>
      </div>
    </header>

    <div className='form-pdf-container'>
      <div className='pdf-container'>
        <p className='upload-title'>Upload Your Invoice</p>
        <p className='upload-subtitle'>To autp-populate fields and save time</p>
        <div className='upload-icon'>
          <img src={uploadIcon} alt='Upload icon' width='300' />
        </div>

        <input type='file' id='file-upload' className='file-input' />
        <label htmlFor='file-upload' className='upload-button'>
          Upload File
          <TfiDownload className='download-icon' />
        </label>
        <p className='upload-subtitle'>
          <span className='click-upload'>Click to upload </span> or drag and
          drop
        </p>
      </div>
      <div className='form-container'>
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
              {/* Vendor Details */}
              <section className='form-section'>
                <h2>
                  <span className='section-icon-container'>
                    <PiBuildingOfficeBold className='section-icon' />
                  </span>
                  Vendor Details
                </h2>
                <h3>Vendor Information</h3>

                <div className='form-group'>
                  <label>Vendor *</label>
                  <Field as='select' name='vendor'>
                    <option value=''>A-1 Exterminators</option>
                    <option value='vendor1'>Vendor 1</option>
                  </Field>
                  <p className='vender-address'>550 Main St. Lynn</p>
                  <button type='button' className='add-vendor-button'>
                    + View Vendor Details
                  </button>
                  <ErrorMessage
                    name='vendor'
                    component='div'
                    className='error'
                  />
                </div>
              </section>

              {/* Invoice Details */}
              <section className='form-section'>
                <h2>
                  <span className='section-icon-container'>
                    <TbInvoice className='section-icon' />
                  </span>
                  Invoice Details
                </h2>
                <h3>General Information</h3>

                <div className='form-group'>
                  <label>Purchase Order Number *</label>
                  <Field as='select' name='vendor'>
                    <option value=''>Select PO Number</option>
                    <option value='vendor1'>Vendor 1</option>
                  </Field>
                  <ErrorMessage
                    name='vendor'
                    component='div'
                    className='error'
                  />
                </div>

                <div className='invoice-input-group'>
                  <div className='invoice-group'>
                    <label>Invoice Number *</label>
                    <Field type='text' name='invoiceNumber' />
                    <ErrorMessage
                      name='invoiceNumber'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div className='invoice-group'>
                    <label>Invoice Date *</label>
                    <Field type='date' name='invoiceDate' />
                    <ErrorMessage
                      name='invoiceDate'
                      component='div'
                      className='error'
                    />
                  </div>
                </div>
                <div className='invoice-input-group'>
                  <div className='invoice-group'>
                    <label>Total Amount *</label>
                    <Field type='number' name='totalAmount' />
                    <ErrorMessage
                      name='totalAmount'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div className='invoice-group'>
                    <label>Payment Terms *</label>
                    <Field as='select' name='paymentStatus'>
                      <option value=''>Select Status</option>
                      <option value='paid'>Paid</option>
                      <option value='unpaid'>Unpaid</option>
                    </Field>
                  </div>
                </div>
                <div className='invoice-input-group'>
                  <div className='invoice-group'>
                    <label>Total Amount *</label>
                    <Field type='number' name='totalAmount' />
                    <ErrorMessage
                      name='totalAmount'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div className='invoice-group'>
                    <label>Payment Terms *</label>
                    <Field as='select' name='paymentStatus'>
                      <option value=''>Select Status</option>
                      <option value='paid'>Paid</option>
                      <option value='unpaid'>Unpaid</option>
                    </Field>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Description</label>
                  <Field as='textarea' name='description' rows={1} />
                </div>
              </section>

              {/* Expense Details */}
              <section className='form-section'>
                <h2>Expense Details</h2>

                <div className='expense-total'>
                  <div></div>
                  <div className='toggle-container'>
                    <span>$ 0.00 / $ 0.00</span>
                    <div className='toggle-sub-container'>
                      <button className='toggle-btn selected'>$</button>
                      <button className='toggle-btn'>%</button>
                    </div>
                  </div>
                </div>
                <div className='expense-input-group'>
                  <div className='expense-group'>
                    <label>Line Amount *</label>
                    <Field type='number' name='lineAmount' />
                    <ErrorMessage
                      name='lineAmount'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div className='expense-group'>
                    <label>Department *</label>
                    <Field as='select' name='department'>
                      <option value=''>Select Department</option>
                      <option value='HR'>HR</option>
                      <option value='Finance'>Finance</option>
                    </Field>
                    <ErrorMessage
                      name='department'
                      component='div'
                      className='error'
                    />
                  </div>
                </div>
                <div className='expense-input-group'>
                  <div className='expense-group'>
                    <label>Account *</label>
                    <Field as='select' name='account'>
                      <option value=''>Select Account</option>
                      <option value='Saving'>Saving</option>
                      <option value='Current'>Current</option>
                    </Field>
                    <ErrorMessage
                      name='department'
                      component='div'
                      className='error'
                    />
                  </div>
                  <div className='expense-group'>
                    <label>Location *</label>
                    <Field as='select' name='location'>
                      <option value=''>Select Location</option>
                      <option value='Bengaluru'>Bangaluru</option>
                      <option value='Pune'>Pune</option>
                    </Field>
                    <ErrorMessage
                      name='department'
                      component='div'
                      className='error'
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Description</label>
                  <Field as='textarea' name='description' rows={1} />
                </div>
                <div className='expense-button'>
                  <div></div>
                  <div>
                    <button type='button' className='add-coding-button'>
                      + Add Expense Coding
                    </button>
                  </div>
                </div>
              </section>

              {/* Comments */}
              <section className='comment-section'>
                <h2>
                  <span className='section-icon-container'>
                    <LiaCommentSolid className='section-icon' />
                  </span>
                  Comments
                </h2>
                <div className='form-group'>
                  <Field
                    as='textarea'
                    name='comments'
                    rows={1}
                    placeholder='Add a comment and use @Name to tag someone'
                  />
                </div>
              </section>

              <div className='button-group'>
                <button
                  type='submit'
                  className='button secondary'
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <button type='button' className='button primary'>
                  Dummy Data
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

export default InvoiceForm;
