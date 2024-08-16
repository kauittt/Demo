import React from 'react';
// import './Modal.css'; 
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'preact/hooks';
import { get } from '../../utils/httpRequest';

export default function ModalCustomer({ isOpen, onClose, onAddCustomer }) {
    const [contacts,setContacts] = useState([]);

    async function fetchData() {
        let responseContact = await get("customers/all_contact")
        // console.log(responseContact)
        setContacts(responseContact)
      }
    
      useEffect(() => {
        fetchData();
      },[]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded relative w-[550px]">
                <button className="absolute top-2.5 right-5 border-none bg-transparent text-2xl cursor-pointer-close" onClick={onClose}>
                    &times;
                </button>
                <h1 className='text-4xl m-3 text-left'>Add Customer</h1>
                <Formik
                    initialValues={{
                        id: "",
                        name: "",
                        phone: "",
                        contact: "",
                        price: ""
                    }}
                    validationSchema={Yup.object({
                        id: Yup.string()
                        // .matches(/^cus\d{3}$/, "ID must start with 'cus' followed by 3 digits")
                        ,
                        name: Yup.string()
                        // .required("Name is required.")
                        // .matches(/^[\p{L}\s]+$/u, "Name must only contain letters and spaces")
                        ,
                        phone: Yup.string()
                        // .required("Phone is required.")
                        // .matches(/^0\d{9,10}$/, "Phone number must start with '0' and be 10 or 11 digits long")
                        ,
                        contact: Yup.string()
                        // .required("Contact is required.")
                        ,
                        price: Yup.number()
                        // .required("Price is required.")
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
                            <div className='mx-3'>
                                <label htmlFor="No" className='block text-left'>No</label>
                                <Field
                                    name="id"
                                    type="text"
                                    placeholder="No"
                                    className='w-full border-2 rounded-xl p-2 mb-1 border-grey'
                                />
                                <div className='h-7'>
                                    <ErrorMessage name='id' component="div" className=' text-sm text-red' />
                                </div>
                            </div>
                            <div className='mx-3 justify-start '>
                                <label htmlFor="name" className='block text-left'>Name</label>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className='w-full border-2 rounded-xl  p-2  mb-1 border-grey'
                                />
                                <div className='h-7'>
                                    <ErrorMessage name='name' component="div" className='text-sm text-red'></ErrorMessage>
                                </div>
                            </div>
                            <div className='mx-3'>
                                <label htmlFor="phone" className='block text-left'>Phone</label>
                                <Field
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    className='w-full border-2 rounded-xl p-2  mb-1 border-grey'
                                />
                                <div className='h-7'>
                                    <ErrorMessage name='phone' component="div" className=' text-sm text-red' />
                                </div>
                            </div>
                            <div className='flex space-x-4'>
                                <div className='mx-3 flex-1'>
                                    <label htmlFor="contact" className='block text-left'>Contact</label>
                                    <Field
                                        as="select"
                                        name="contact"
                                        className='w-full border-2 rounded-xl p-2 mb-1 border-grey'
                                    >
                                        <option value="" label="Contact" />
                                        {contacts.map(option => (
                                            <option key={option.id} value={option.id} label={option.name} />
                                        ))}
                                    </Field>
                                    <div className='h-7'>
                                        <ErrorMessage name='contact' component="div" className=' text-sm  text-red'/>
                                    </div>
                                </div>
                                <div className='mx-3 flex-1'>
                                    <label htmlFor="price" className='flex text-left'>Price</label>
                                    <Field
                                        name="price"
                                        type="text"
                                        placeholder="Price"
                                        className='w-full border-2 rounded-xl p-2 mb-1 border-grey'
                                    />
                                    <div className='h-7'>
                                        <ErrorMessage name='price' component="div" className=' text-sm  text-red' />
                                    </div>
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
