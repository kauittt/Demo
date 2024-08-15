import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function Modal({ isOpen, onClose,onAddCustomer  }) {

    if (!isOpen) return null; 
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded relative w-96">
                <button className="absolute top-2.5 right-2.5 border-none bg-transparent text-2xl cursor-pointer-close" onClick={onClose}>
                    &times;
                </button>
                <h1 className='text-4xl m-3'>Add Customer</h1>
                <Formik
                    initialValues={{
                        id: "",
                        name: "",
                        phone: "",
                        contact: "",
                        price: ""
                    }}
                    validationSchema={Yup.object({
                        id: Yup.string(),
                        name: Yup.string().required("Name is required."),
                        phone: Yup.string().required("Phone is required."),
                        contact: Yup.string().required("Contact is required."),
                        price: Yup.number().required("Price is required.")
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            onAddCustomer(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {formik => (
                        <Form>
                            <div className='m-3'>
                                <label htmlFor="No" className='block'>No</label>
                                <Field
                                    name="id"
                                    type="text"
                                    placeholder="No"
                                    className='w-full border-2 rounded-xl p-2 my-1 border-grey'
                                />
                                <ErrorMessage name='id' component="div" className=' text-sm mt-1 text-red' />
                            </div>
                            <div className='m-3'>
                                <label htmlFor="name" className='block'>Name</label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className='w-full border-2 rounded-xl p-2 my-1 border-grey'
                                />
                                <ErrorMessage name='name' component="div" className=' text-sm mt-1 text-red' />
                            </div>
                            <div className='m-3'>
                                <label htmlFor="phone" className='block'>Phone</label>
                                <Field
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    className='w-full border-2 rounded-xl p-2 my-1 border-grey'
                                />
                                <ErrorMessage name='phone' component="div" className=' text-sm mt-1 text-red' />
                            </div>
                            <div className='flex space-x-4'>
                                <div className='mx-3 flex-1'>
                                    <label htmlFor="contact" className='block'>Contact</label>
                                    <Field
                                        name="contact"
                                        type="text"
                                        placeholder="Contact"
                                        className='w-full border-2 rounded-xl p-2 my-1 border-grey'
                                    />
                                    <ErrorMessage name='contact' component="div" className=' text-sm mt-1 text-red' />
                                </div>
                                <div className='mx-3 flex-1'>
                                    <label htmlFor="price" className='block'>Price</label>
                                    <Field
                                        name="price"
                                        type="text"
                                        placeholder="Price"
                                        className='w-full border-2 rounded-xl p-2 my-1 border-grey'
                                    />
                                    <ErrorMessage name='price' component="div" className=' text-sm mt-1 text-red' />
                                </div>
                            </div>
                            <div className='flex '>
                                <button type='submit' className='bg-black text-white rounded-lg px-3 py-2 m-3'>
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className='bg-grey text-black rounded-lg px-3 py-2 m-3'
                                    disabled={formik.isSubmitting}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
