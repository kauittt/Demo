import React from "react";
import { Form, Formik } from "formik";
import { useState } from "preact/hooks";
import * as Yup from "yup";
import FormInput from "./../../elements/FormInput";
import Button from "./../../elements/Button";

const LoginPage = () => {
    const [purpose, setPurpose] = useState("register");

    const registerFields =
        purpose == "register" ? ["email", "name", "phone", "address"] : [];
    const fields = ["username", "password", ...registerFields];

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(4, "Must be 4 characters or more!")
            .max(15, "Must be 15 characters or less!")
            .required("Username is required"),
        password: Yup.string().required("Password is required"),
        ...(purpose == "register" && {
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            name: Yup.string().required("Name is required"),
            phone: Yup.string()
                .matches(/^[0-9]+$/, "Phone number must contain only numbers")
                .min(10, "Phone number must be 10 digits")
                .max(10, "Phone number must be 10 digits")
                .required("Phone number is required"),
            address: Yup.string().required("Address is required"),
        }),
    });
    return (
        <div className="flex w-full h-screen">
            {/*//* Image */}
            <div className="w-1/2 flex flex-center">
                <img
                    src="./image/login.png"
                    alt="Description"
                    className="max-w-[320px] w-full object-cover"
                />
            </div>

            {/*//* Form  */}
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    ...(purpose == "register" && {
                        email: "",
                        name: "",
                        phone: "",
                        address: "",
                    }),
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    console.log("Submit");
                    console.log(values);
                    setTimeout(() => {
                        // actions.resetForm();
                        actions.setSubmitting(false);
                    }, 500);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="relative">
                        <div className="grid grid-cols-2 gap-x-[50px] gap-y-[30px]">
                            <FormInput
                                label="Name"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                            />
                            <FormInput
                                label="Email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <FormInput
                                label="Username"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                            />
                            <div className="pointer-events-none">
                                <FormInput
                                    label="Password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                            </div>
                            <FormInput
                                label="Phone"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                            />
                            <FormInput
                                label="Address"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                name="Save"
                                type="submit"
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
