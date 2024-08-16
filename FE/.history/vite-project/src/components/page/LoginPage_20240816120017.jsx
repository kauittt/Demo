import React from "react";
import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "preact/hooks";
import * as Yup from "yup";
import FormInput from "./../../elements/FormInput";
import Button from "./../../elements/Button";

const LoginPage = () => {
    const [purpose, setPurpose] = useState("register");

    const registerFields =
        purpose == "register" ? ["email", "name", "phone", "address"] : [];
    const fields = ["username", "password", ...registerFields];

    const gridCol = purpose == "login" ? "grid-cols-1" : "grid-cols-2";

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

    const FormReset = ({ setPurpose }) => {
        const { resetForm } = useFormikContext();
        useEffect(() => {
            resetForm();
        }, [setPurpose, resetForm]);
        return null;
    };
    return (
        <div className="flex w-full h-screen">
            {/*//* Image */}
            <div className="w-1/2 flex flex-center">
                <img
                    src="./image/login.png"
                    alt="Description"
                    className="max-w-[550px] w-full object-cover"
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
                        actions.resetForm();
                        actions.setSubmitting(false);
                    }, 500);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-center flex-col flex-1 gap-[40px]">
                        <FormReset setPurpose={purpose} />
                        <div className={`grid gap-[20px] ${gridCol}`}>
                            {fields?.map((field, index) => {
                                let inputType = "text";
                                if (field === "password") {
                                    inputType = "password";
                                } else if (field === "email") {
                                    inputType = "email";
                                }
                                return (
                                    <FormInput
                                        label={field}
                                        id={field}
                                        name={field}
                                        type={inputType}
                                        placeholder={`Enter your ${field}`}
                                    ></FormInput>
                                );
                            })}
                        </div>

                        {/*//* Buttons */}
                        <div className="flex gap-[10px] justify-end">
                            <Button
                                name={
                                    purpose === "login" ? "Register" : "Login"
                                }
                                onClick={() =>
                                    setPurpose(
                                        purpose === "login"
                                            ? "register"
                                            : "login"
                                    )
                                }
                            />

                            <Button
                                name={
                                    purpose === "login" ? "Login" : "Register"
                                }
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
