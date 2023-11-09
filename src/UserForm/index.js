import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Button } from 'primereact/button';
import InputBox from './inputBox';
import "./button.css"
import { string, number, array, object, date } from 'yup'
import parse from "date-fns/parse";
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/userSlice'
import moment from 'moment/moment';



//this is the main component used to create new User details
const UserForm = () => {

    const dispatch = useDispatch()
    //user state
    const initialState = {
        firstName: "", lastName: "", email: "", phone: "", dob: "", gender: "", address: [{
            street_address: '', city: '', postal_code: '', country: ''
        }]
    }

    //Validation
    const formSchema = object().shape({
        firstName: string("* Must be alphabet").required("* First name is required").min(3, "* At least 3 characters"),
        lastName: string("* Must be alphabet").required("* Last name is required").min(3, "* At least 3 characters"),
        email: string("* Must be alphabet").email('Invalid email').required("* Email is required").min(3, "* at least 3 characters"),
        phone: number("* Must be number").required("* Phone no. is required").min(10, "* At least 10 digit"),
        dob: date("* Must be a date").transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value;
            }
            const result = parse(originalValue, "dd/mm/yyyy", new Date());
            return result;
        })
            .typeError("please enter a valid date")
            .required("* Date Of Birth is required")
            .max("2005-11-31", "Date is too early").required("* Date Of Birth is required"),
        gender: string("* Must be alphabet").required("* Gender is required"),
        address: array(object({
            street_address: string("* Must be alphabet").required("* Street Address is required").min(3, "* At least 3 characters"),
            city: string("* Must be alphabet").required("* City is required").min(3, "* At least 3 characters"),
            postal_code: number("* Must be number").required("* Postal code is required").min(5, "* At least 5 digits"),
            country: string("* Must be alphabet").required("* Country is required").min(3, "* At least 3 characters")
        }))
    })



    return (
        <div className='card mt-5 form-center'>
            <div className='card-body'>
                <h4 className='text-center mt-5 mb-5'>Personal Information Form</h4>
                <Formik
                    autoComplete="off"
                    initialValues={initialState}
                    validationSchema={formSchema}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = '* Email is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        //changing the date format
                        const userDetails = {...values,dob:moment(values.dob).format("DD/MM/yy")}
                        //dispatching the action
                        dispatch(addUser(userDetails))
                        // enabling the button
                        setSubmitting(false)
                        //clearing out the form fields
                        resetForm()
                    }}
                >
                    {({ isSubmitting, values, errors }) => {
                        return (
                            <Form>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <Field name="fistName">
                                            {({ field, form: { touched, errors }, meta }) => (
                                                <>
                                                    <InputBox {...field} type="text" name="firstName" placeholder="First Name" />
                                                    {errors?.firstName && <ErrorMessage className='error' name="firstName" component="div" />}
                                                </>
                                            )}
                                        </Field>
                                    </div>
                                    <div className='col-md-6'>
                                        <Field name="lastName">
                                            {({ field, form: { touched, errors }, meta }) => (
                                                <>
                                                    <InputBox {...field} type="text" name="lastName" placeholder="Last Name" />
                                                    {errors?.lastName && <ErrorMessage className='error' name="lastName" component="div" />}
                                                </>
                                            )}
                                        </Field>
                                    </div>
                                </div>


                                <div className='row mt-3'>
                                    <div className='col-md-4'>
                                        <Field name="email">
                                            {({ field, form: { touched, errors }, meta }) => (
                                                <>
                                                    <InputBox {...field} type="text" name="email" placeholder="Email Address" />
                                                    {errors?.email && <ErrorMessage className='error' name="email" component="div" />}
                                                </>
                                            )}
                                        </Field>
                                    </div>
                                    <div className='col-md-4'>
                                        <Field name="dob">
                                            {({ field, form: { touched, errors }, meta }) => (
                                                <>
                                                    <InputBox {...field} type="date" name="dob" placeholder="Date Of Birth" />
                                                    {errors?.dob && <ErrorMessage className='error' name="dob" component="div" />}
                                                </>
                                            )}
                                        </Field>
                                    </div>
                                    <div className='col-md-4'>
                                        <Field name="phone">
                                            {({ field, form: { touched, errors }, meta }) => (
                                                <>
                                                    <InputBox {...field} type="phone" name="phone" placeholder="Phone no." />
                                                    {errors?.phone && <ErrorMessage className='error' name="phone" component="div" />}
                                                </>
                                            )}
                                        </Field>
                                    </div>
                                    <div className='col-md-4 mt-2'>
                                        <Field name="gender">
                                            {({ field, form: { touched, errors }, meta }) => (
                                                <div className='row'>
                                                    <div className='col'>

                                                    <InputBox {...field} inputId="male" type="radio" name="gender" value="male" checked={values.gender==="male"} />
                                                    <label htmlFor="male" className="ml-2">Male</label>
                                                    </div>
                                                    <div className='col'>
                                                    <InputBox {...field} inputId="female" type="radio" name="gender" value="female" checked={values.gender==="female"} />
                                                    <label htmlFor="female" className="ml-2">Female</label>
                                                    </div>

                                                    {errors?.gender && <ErrorMessage className='error' name="gender" component="div" />}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                </div>







                                <FieldArray name="address">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.address.length > 0 &&
                                                values.address.map((addr, index) => (
                                                    <div className="row mt-3" key={index}>
                                                        <div className="col-lg-12">
                                                      <h6 className='mt-2 mb-2'>Address:</h6>
                                                            <Field name={`address.${index}.street_address`}>
                                                                {({ field, form: { touched, errors }, meta }) => (
                                                                    <>
                                                                        <InputBox {...field} type="text" name={`address.${index}.street_address`} placeholder="Street Address" />
                                                                        {errors?.address?.length>0 && errors?.address[index]?.street_address && <ErrorMessage className='error' name={`address.${index}.street_address`} component="div" />}
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <div className="col-lg-12 mt-3">
                                                            <Field name={`address.${index}.city`}>
                                                                {({ field, form: { touched, errors }, meta }) => (
                                                                    <>
                                                                        <InputBox {...field} type="text" name={`address.${index}.city`} placeholder="City" />
                                                                        {errors?.address?.length>0 && errors?.address[index]?.city && <ErrorMessage className='error' name={`address.${index}.city`} component="div" />}
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <div className="col-lg-12 mt-3">
                                                            <Field name={`address.${index}.postal_code`}>
                                                                {({ field, form: { touched, errors }, meta }) => (
                                                                    <>
                                                                        <InputBox {...field} type="text" name={`address.${index}.postal_code`} placeholder="Postal Code" />
                                                                        {errors?.address?.length>0 && errors?.address[index]?.postal_code && <ErrorMessage className='error' name={`address.${index}.postal_code`} component="div" />}
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </div>

                                                        <div className="col-lg-12 mt-3">
                                                            <Field name={`address.${index}.country`}>
                                                                {({ field, form: { touched, errors }, meta }) => (
                                                                    <>
                                                                        <InputBox {...field} type="text" name={`address.${index}.country`} placeholder="Country" />
                                                                        {errors?.address?.length>0 && errors?.address[index]?.country && <ErrorMessage className='error' name={`address.${index}.country`} component="div" />}
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </div>
                                                       
                                                        {
                                                            values?.address?.length > 1 ? (

                                                                <div className="col-lg-12">
                                                                    <Button
                                                                        size="small"
                                                                        type="button"
                                                                        className="btn_add mt-2"
                                                                        label="Remove Address"

                                                                        onClick={() => remove(index)}
                                                                    />
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                ))}
                                            <Button label="Add new address" size="small" type="button" className='btn_add mt-2 mb-5' onClick={() => push({ street_address: '', city: '', postal_code: '', country: '' })} severity="warning" disabled={isSubmitting} />
                                        </div>
                                    )}
                                </FieldArray>

                                <div className='text-center'>
                                    <Button label="Submit" className='btn_add' type="submit" disabled={isSubmitting} />
                                </div>

                            </Form>
                        )
                    }
                    }
                </Formik>
            </div>

        </div>
    )
}

export default UserForm