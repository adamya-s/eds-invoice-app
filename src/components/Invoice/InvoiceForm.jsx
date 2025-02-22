import React, { useState, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import * as Yup from 'yup';
import uploadIcon from '../../assets/eds-invoice.gif';
import { TfiDownload } from 'react-icons/tfi';
import { PiBuildingOfficeBold } from 'react-icons/pi';
import { TbInvoice } from 'react-icons/tb';
import { LiaCommentSolid } from 'react-icons/lia';
import './InvoiceForm.css';

// Reference the worker file from the public folder
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const InvoiceSchema = Yup.object().shape({
  vendorInformation: Yup.string().required(
    'Please select Vendor Information is required'
  ),
  purchaseOrderNumber: Yup.string().required(
    'Purchase Order Number is required'
  ),
  invoiceNumber: Yup.string().required('Invoice number is required'),
  invoiceDate: Yup.date().required('Invoice date is required'),
  totalAmount: Yup.number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  paymentStatus: Yup.string().required('Payment status is required'),
  invoiceDueDate: Yup.date().required('Invoice due date is required'),
  glPostDate: Yup.date().required('GL Post date is required'),
  lineAmount: Yup.number()
    .positive('Line Amount must be positive')
    .required('Line Amount is required'),
  department: Yup.string().required('Department is required'),
  account: Yup.string().required('Account to is required'),
  location: Yup.string().required('Location is required'),
});

// Add an Error Boundary component
class PDFErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error loading PDF. Please try again.</div>;
    }
    return this.props.children;
  }
}

const InvoiceForm = ({ onLogout }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Memoize the options object
  const pdfOptions = useMemo(
    () => ({
      cMapUrl: 'cmaps/',
      standardFontDataUrl: 'standard_fonts/',
    }),
    []
  );

  const handlePdfFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      try {
        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        // Create a new Uint8Array from the ArrayBuffer to ensure it remains valid
        const uint8Array = new Uint8Array(arrayBuffer);
        setPdfFile({ data: uint8Array.buffer }); // Store the buffer
      } catch (error) {
        console.error('Error processing PDF:', error);
        alert('Error processing PDF file. Please try again.');
      }
    } else {
      alert('Please select a valid PDF file.');
      event.target.value = null;
    }
  };

  const populateDummyData = async (setFieldValue) => {
    const dummyData = {
      vendorInformation: 'exterminators',
      purchaseOrderNumber: 'vendor1',
      invoiceNumber: 'INV-001',
      invoiceDate: '2025-02-01',
      totalAmount: 1000,
      paymentStatus: 'paid',
      invoiceDueDate: '2025-05-25',
      glPostDate: '2025-05-28',
      lineAmount: 2000,
      department: 'HR',
      account: 'Saving',
      location: 'Bengaluru',
      description: 'This is description',
    };

    Object.keys(dummyData).forEach((key) => {
      setFieldValue(key, dummyData[key]);
    });

    try {
      const response = await fetch('/dummy-invoice.pdf');
      if (!response.ok) throw new Error('Failed to load dummy PDF');
      const arrayBuffer = await response.arrayBuffer();
      setPdfFile({ data: arrayBuffer });
    } catch (error) {
      console.error('Error loading dummy PDF:', error);
      alert('Error loading dummy PDF. Please try again.');
    }
  };

  // Update PDF viewer component
  const renderPdfViewer = () => {
    return pdfFile ? (
      <PDFErrorBoundary>
        <Document
          file={{ data: pdfFile.data }}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => {
            console.error('Error loading PDF:', error);
            alert('Error loading PDF. Please try again.');
          }}
          className='pdf-document'
          options={pdfOptions} // Use the memoized options
        >
          {numPages > 0 && (
            <Page
              pageNumber={pageNumber}
              className='pdf-page'
              scale={1.0}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )}
        </Document>
      </PDFErrorBoundary>
    ) : null;
  };

  return (
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
          <button onClick={onLogout} className='logout-button'>
            Logout
          </button>
        </div>
      </header>

      <div className='form-pdf-container'>
        <div className='pdf-container'>
          <p className='upload-title'>Upload Your Invoice</p>
          <p className='upload-subtitle'>
            To auto-populate fields and save time
          </p>
          <div className='upload-icon'>
            <img src={uploadIcon} alt='Upload icon' width='300' />
          </div>
          <div className='pdf-viewer-container'>
            {renderPdfViewer()}
            {pdfFile && (
              <p className='pdf-page-info'>
                Page {pageNumber} of {numPages}
              </p>
            )}
          </div>
          {/* {pdfFile && (
            <Document file={pdfFile}>
              <Page pageNumber={1} />
            </Document>
          )} */}
          <input
            type='file'
            accept='application/pdf'
            id='file-upload'
            className='file-input'
            onChange={handlePdfFileChange}
          />
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
              vendorInformation: '',
              purchaseOrderNumber: '',
              invoiceNumber: '',
              invoiceDate: '',
              totalAmount: '',
              paymentStatus: '',
              invoiceDueDate: '',
              glPostDate: '',
              department: '',
              account: '',
              location: '',
            }}
            validationSchema={InvoiceSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log('Submitting', values);
                localStorage.setItem('invoiceData', JSON.stringify(values));
                setSubmitting(false);
                alert('Invoice data saved successfully!');
              }, 400);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
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
                    <Field as='select' name='vendorInformation'>
                      <option value=''>Select vendor</option>
                      <option value='exterminators'>A-1 Exterminators</option>
                    </Field>
                    <p className='vender-address'>550 Main St. Lynn</p>
                    <button type='button' className='add-vendor-button'>
                      + View Vendor Details
                    </button>
                    <ErrorMessage
                      name='vendorInformation'
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
                    <Field as='select' name='purchaseOrderNumber'>
                      <option value=''>Select PO Number</option>
                      <option value='vendor1'>Vendor 1</option>
                    </Field>
                    <ErrorMessage
                      name='purchaseOrderNumber'
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
                      <ErrorMessage
                        name='paymentStatus'
                        component='div'
                        className='error'
                      />
                    </div>
                  </div>
                  <div className='invoice-input-group'>
                    <div className='invoice-group'>
                      <label>Invoice Due Date *</label>
                      <Field type='date' name='invoiceDueDate' />
                      <ErrorMessage
                        name='invoiceDueDate'
                        component='div'
                        className='error'
                      />
                    </div>
                    <div className='invoice-group'>
                      <label>GL Post Date *</label>
                      <Field type='date' name='glPostDate' />
                      <ErrorMessage
                        name='glPostDate'
                        component='div'
                        className='error'
                      />
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
                        name='account'
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
                        name='location'
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
                  <button
                    type='button'
                    onClick={() => populateDummyData(setFieldValue)}
                    className='button primary'
                  >
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
};

export default InvoiceForm;
