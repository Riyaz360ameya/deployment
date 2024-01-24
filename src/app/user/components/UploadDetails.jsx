import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { uploadProject } from '../userAPIs/projectApis';
import { useDispatch } from 'react-redux';
import { addNewUserProject } from '@/app/redux/users/userProSlice';
import PaymentModal from './PaymentModal';
import { uploadProjectDetailsSchema } from '@/app/schemas/authSchema';
import { useFormik } from 'formik';

function UploadDetails() {
    const dispatch = useDispatch()
    const router = useRouter()
    const inputFileRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false)

    const formValues = {
        ventureName: '',
        projectPlace: '',
        email: '',
        ventureType: '',
        vision: '',
        projectUsp: '',
        contact: '',
        specification: '',
        amenities: '',
        pages: '',
        brochureLanguage: '',
        brochureBudget: '',
        leafLet: '',
        ventureDescription: '',
        estimatedDeliveryDate: '',
        siteAddress: '',
        previousVenture: '',
        officeAddress: '',
        location: '',
        projectOverview: '',
    };
    const initialValues = formValues
    const validationSchema = uploadProjectDetailsSchema

    //validation 

    const resetForm = () => {
        setFormData((prevState) => ({
            ...prevState,
            ventureName: '',
            projectPlace: '',
            email: '',
            ventureType: '',
            vision: '',
            projectUsp: '',
            contact: '',
            specification: '',
            amenities: '',
            pages: '',
            brochureLanguage: '',
            brochureBudget: '',
            leafLet: '',
            ventureDescription: '',
            estimatedDeliveryDate: '',
            siteAddress: '',
            previousVenture: '',
            officeAddress: '',
            location: '',
            projectOverview: '',
        }));
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true);
            try {
                const { data } = await uploadProject(values)
                dispatch(addNewUserProject(data.savedProject))
                resetForm()
                toast.success(data.message)
                setLoading(false)
                setModal(true)
                // router.push("/proceed");
            } catch (error) {
                toast.error("something went wrong")
                console.log(error)
                setLoading(false);
            }
        }
    })



    return (
        <>
            {
                loading ? (
                    <div className='h-full flex items-center justify-center'>
                        <InfinitySpin width='200' color='black' />
                    </div>
                ) : (

                    !modal ?
                        <>
                            <form
                                onSubmit={handleSubmit} id='signUpForm'
                                className='overflow-hidden overflow-y-scroll '>
                                <div className="grid gap-6 grid-cols-2 mb-6 md:grid-cols-3 my-5 mx-5 overflow-hidden ">
                                    <div>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Venture name</label>
                                        <input
                                            type="text" id="first_name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                            placeholder=""
                                            value={values.ventureName}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.ventureName && touched.ventureName ? (
                                        <p className="text-red-600 text-start text-sm">{errors.ventureName}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Project Place </label>
                                        <input
                                            type="text" id="last_name" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                            placeholder=""
                                            value={values.projectPlace}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.projectPlace && touched.projectPlace ? (
                                        <p className="text-red-600 text-start text-sm">{errors.projectPlace}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Email Id</label>
                                        <input
                                            type="text" id="company"
                                            className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   "
                                            placeholder=""
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.email && touched.email ? (
                                        <p className="text-red-600 text-start text-sm">{errors.email}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Venture Type</label>
                                        <input
                                            type="text" id="company"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                            placeholder=""
                                            value={values.ventureType}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.ventureType && touched.ventureType ? (
                                        <p className="text-red-600 text-start text-sm">{errors.ventureType}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Vision</label>
                                        <input
                                            type="text" id="phone" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block   w-full p-2.5     "
                                            placeholder=""
                                            value={values.vision}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.vision && touched.vision ? (
                                        <p className="text-red-600 text-start text-sm">{errors.vision}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Project USP</label>
                                        <input
                                            type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   block w-full p-2.5     "
                                            placeholder=""
                                            value={values.projectUsp}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.projectUsp && touched.projectUsp ? (
                                        <p className="text-red-600 text-start text-sm">{errors.projectUsp}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 ">Contact</label>
                                        <input
                                            type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                                            placeholder=""
                                            value={values.contact}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.contact && touched.contact ? (
                                        <p className="text-red-600 text-start text-sm">{errors.contact}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Specification</label>
                                        <input
                                            type="text" id="phone" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5     "
                                            placeholder=""
                                            value={values.specification}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.specification && touched.specification ? (
                                        <p className="text-red-600 text-start text-sm">{errors.specification}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Amenities</label>
                                        <input
                                            type="text" id="website" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5      "
                                            placeholder=""
                                            value={values.amenities}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.amenities && touched.amenities ? (
                                        <p className="text-red-600 text-start text-sm">{errors.amenities}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">No.of pages (brochure)</label>
                                        <input
                                            type="number" id="phone"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                            placeholder=""
                                            value={values.pages}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.pages && touched.pages ? (
                                        <p className="text-red-600 text-start text-sm">{errors.pages}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Brochure(language)</label>
                                        <input
                                            type="text" id="website" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                            placeholder=""
                                            value={values.brochureLanguage}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.brochureLanguage && touched.brochureLanguage ? (
                                        <p className="text-red-600 text-start text-sm">{errors.brochureLanguage}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Budget brochure</label>
                                        <input
                                            type="number" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900       text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5           "
                                            placeholder=""
                                            value={values.brochureBudget}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.brochureBudget && touched.brochureBudget ? (
                                        <p className="text-red-600 text-start text-sm">{errors.brochureBudget}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Leaflet</label>
                                        <input
                                            type="text" id="website" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500     block w-full p-2.5      "
                                            placeholder=""
                                            value={values.leafLet}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.leafLet && touched.leafLet ? (
                                        <p className="text-red-600 text-start text-sm">{errors.leafLet}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Venture description</label>
                                        <input
                                            type="text" id="phone" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500    block w-full p-2.5      "
                                            placeholder=""
                                            value={values.ventureDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.ventureDescription && touched.ventureDescription ? (
                                        <p className="text-red-600 text-start text-sm">{errors.ventureDescription}</p>
                                    ) : null}
                                    <div>
                                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 ">Estimated Delivary Date</label>
                                        <input
                                            type="date" id="website" className="bg-gray-50 border border-gray-300 text-gray-900   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
                                            placeholder=""
                                            value={values.estimatedDeliveryDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.estimatedDeliveryDate && touched.estimatedDeliveryDate ? (
                                        <p className="text-red-600 text-start text-sm">{errors.estimatedDeliveryDate}</p>
                                    ) : null}
                                    <div >
                                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 ">Site address</label>
                                        <input
                                            type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder=""
                                            value={values.siteAddress}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.siteAddress && touched.siteAddress ? (
                                        <p className="text-red-600 text-start text-sm">{errors.siteAddress}</p>
                                    ) : null}
                                    <div >
                                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 ">Previous venture</label>
                                        <input
                                            type="text" id="email" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5   "
                                            placeholder=""
                                            value={values.previousVenture}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.previousVenture && touched.previousVenture ? (
                                        <p className="text-red-600 text-start text-sm">{errors.previousVenture}</p>
                                    ) : null}
                                    <div >
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Office address</label>
                                        <input
                                            type="text" id="password" className="bg-gray-50 border border-gray-  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            placeholder=""
                                            value={values.officeAddress}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.officeAddress && touched.officeAddress ? (
                                        <p className="text-red-600 text-start text-sm">{errors.officeAddress}</p>
                                    ) : null}
                                    <div >
                                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Location</label>
                                        <input
                                            type="text" id="confirm_password" className="bg-gray-50 border border-  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5 "
                                            placeholder=""
                                            value={values.location}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                    </div>
                                    {errors.location && touched.location ? (
                                        <p className="text-red-600 text-start text-sm">{errors.location}</p>
                                    ) : null}
                                </div>
                                <div className="my-5 mx-5">
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Project overview</label>
                                    <textarea
                                        id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                        placeholder="Extent,number of units,club house sqft..."
                                        value={values.projectOverview}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></textarea>
                                    {errors.projectOverview && touched.projectOverview ? (
                                        <p className="text-red-600 text-start text-sm">{errors.projectOverview}</p>
                                    ) : null}
                                    <div className="flex items-start mb-6 mt-5">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                            />
                                        </div>
                                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">I agree with the <a href="#" className="text-blue-600 hover:underline ">terms and conditions</a>.</label>
                                    </div>
                                </div>
                                <button type='submit' className='text-white my-5 mx-5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                w-full sm:w-auto px-5 py-2.5 text-center'>
                                    Submit
                                </button>
                            </form>
                        </>
                        :
                        <PaymentModal setModal={setModal} />
                )
            }
        </>
    )
}
export default UploadDetails


