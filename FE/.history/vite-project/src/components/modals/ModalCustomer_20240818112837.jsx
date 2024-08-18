import React from "react";
// import './Modal.css';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "preact/hooks";
import { get } from "../../utils/httpRequest";
import FormInput from "./../../elements/FormInput";
import Button from "./../../elements/Button";
import { useSelector } from "react-redux";

export default function ModalCustomer({
    isOpen,
    onClose,
    onSaveCustomer,
    customer,
}) {
    const [contacts, setContacts] = useState([]);
    const registerFields = [];
    const fields = [
        "id",
        "name",
        "phone",
        "contact",
        "price",
        ...registerFields,
    ];

    const user = useSelector((state) => state.user);
    async function fetchData() {
        let responseContact = await get("customers/all_contact");
        setContacts(responseContact);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded relative w-[550px] ">
                <button
                    className="text-xl
                    absolute top-2.5 right-5 border-none bg-transparent text-2xl cursor-pointer-close
                     py-[10px] px-[18px] hover:text-red"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h1 className="text-4xl m-3 text-left">Add Customer</h1>
                <Formik
                    initialValues={{
                        id: customer ? customer.id : "",
                        name: customer ? customer.name : "",
                        phone: customer ? customer.phone : "",
                        contact: customer ? customer.contact.id : user.user.id,
                        price: customer ? customer.price : "",
                    }}
                    validationSchema={Yup.object({
                        id: Yup.string().matches(
                            /^cus\d{3}$/,
                            "ID must start with 'cus' followed by 3 digits"
                        ),
                        name: Yup.string()
                            .required("Name is required.")
                            .matches(
                                /^[\p{L}\s]+$/u,
                                "Name must only contain letters and spaces"
                            ),
                        phone: Yup.string()
                            .required("Phone is required.")
                            .matches(
                                /^0\d{9,10}$/,
                                "Phone number must start with '0' and be 10 or 11 digits long"
                            ),
                        contact: Yup.string(),
                        // .required("Contact is required.")
                        price: Yup.number().required("Price is required."),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            onSaveCustomer(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {(formik) => (
                        <Form className="grid grid-cols-2 gap-[20px] justify-between">
                            {fields?.map((field, index) => {
                                let inputType = "text";
                                if (field === "price") {
                                    inputType = "numer";
                                } else if (field === "contact") {
                                    inputType = "select";
                                }

                                return (
                                    <FormInput
                                        label={field}
                                        id={field}
                                        name={field}
                                        type={inputType}
                                        as={
                                            field === "contact"
                                                ? "select"
                                                : undefined
                                        }
                                        disabled={field === "id" && customer}
                                        placeholder={`Enter your ${field}`}
                                    >
                                        {field === "contact" && (
                                            <>
                                                {contacts.map((option) => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                        label={option.name}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </FormInput>
                                );
                            })}
                            <div className="flex gap-[10px] justify-end items-center">
                                <Button
                                    // width="min-w-[85px] w-[85px]"
                                    name="Cancel"
                                    onClick={onClose}
                                    disabled={formik.isSubmitting}
                                ></Button>

                                <Button
                                    // width="85px"
                                    name={"Save"}
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
