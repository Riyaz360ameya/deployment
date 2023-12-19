import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner';
import { InfinitySpin } from 'react-loader-spinner';

function uploadDetails() {
    const router = useRouter()
    const inputFileRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
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
        estimatedDelivaryDate: '',
        siteAddress: '',
        previousVenture: '',
        officeAdress: '',
        location: '',
        projectOverview: '',
    })
    //validation 
    const validate = () => {
        const requiredFields = [
            'ventureName',
            'projectPlace',
            'email',
            'ventureType',
            'vision',
            'projectUsp',
            'contact',
            'specification',
            'amenities',
            'pages',
            'brochureLanguage',
            'brochureBudget',
            'leafLet',
            'ventureDescription',
            'estimatedDelivaryDate',
            'siteAddress',
            'previousVenture',
            'officeAdress',
            'location',
            'projectOverview',
        ];


        for (const index of requiredFields) {
            if (!formData[index]) {
                toast.error(`${index} is required`);
                return false;
            }
        }
        return true;
    }
    const submitProjectDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        //validate
        if (!validate()) {
            setLoading(false)
            return
        }
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            // console.log(user, "user")
            const userId = user._id
            formData.userId = userId
            console.log(formData, '-----------formData')
            const { data } = await axios.post("/api/users/projectInput", formData);
            toast.success(data.message)
            router.push("/proceed");
            setLoading(false)
        } catch (error) {
            toast.error("something went wrong")
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading ? (
                    <div className='h-full flex items-center justify-center'>
                        <InfinitySpin width='200' color='black' />
                    </div>
                ) : (
                    <form onSubmit={submitProjectDetails} className='overflow-hidden overflow-y-scroll'>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 my-5 mx-5 overflow-hidden ">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Venture name</label>
                                <input
                                    type="text" id="first_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder=""
                                    value={formData.ventureName}
                                    onChange={(e) => setFormData({ ...formData, ventureName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">Project Place </label>
                                <input
                                    type="text" id="last_name" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                    placeholder=""
                                    value={formData.projectPlace}
                                    onChange={(e) => setFormData({ ...formData, projectPlace: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="company" className="block mb-2 text-sm font-medium text-gray-900 ">Email Id</label>
                                <input
                                    type="text" id="company"
                                    className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5   "
                                    placeholder=""

                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="company" className="block mb-2 text-sm font-medium text-gray-900 ">Venture Type</label>
                                <input
                                    type="text" id="company"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                    placeholder=""

                                    value={formData.ventureType}
                                    onChange={(e) => setFormData({ ...formData, ventureType: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Vision</label>
                                <input
                                    type="text" id="phone" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block   w-full p-2.5     "
                                    placeholder=""

                                    value={formData.vision}
                                    onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="website" className="block mb-2 text-sm font-medium text-gray-900 ">Project USP</label>
                                <input
                                    type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   block w-full p-2.5     "
                                    placeholder=""

                                    value={formData.projectUsp}
                                    onChange={(e) => setFormData({ ...formData, projectUsp: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="visitors" className="block mb-2 text-sm font-medium text-gray-900 ">Contact</label>
                                <input
                                    type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                                    placeholder=""

                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Specification</label>
                                <input
                                    type="text" id="phone" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5     "
                                    placeholder=""

                                    value={formData.specification}
                                    onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="website" className="block mb-2 text-sm font-medium text-gray-900 ">Amenities</label>
                                <input
                                    type="text" id="website" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block w-full p-2.5      "
                                    placeholder=""

                                    value={formData.amenities}
                                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">No.of pages (brochure)</label>
                                <input
                                    type="text" id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                    placeholder=""

                                    value={formData.pages}
                                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="website" className="block mb-2 text-sm font-medium text-gray-900 ">Brochure(language)</label>
                                <input
                                    type="text" id="website" className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                                    placeholder=""

                                    value={formData.brochureLanguage}
                                    onChange={(e) => setFormData({ ...formData, brochureLanguage: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Budget brochure</label>
                                <input
                                    type="number" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900       text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5           "
                                    placeholder=""

                                    value={formData.brochureBudget}
                                    onChange={(e) => setFormData({ ...formData, brochureBudget: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="website" className="block mb-2 text-sm font-medium text-gray-900 ">Leaflet</label>
                                <input
                                    type="text" id="website" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500     block w-full p-2.5      "
                                    placeholder=""

                                    value={formData.leafLet}
                                    onChange={(e) => setFormData({ ...formData, leafLet: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Venture description</label>
                                <input
                                    type="text" id="phone" className="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500    block w-full p-2.5      "
                                    placeholder=""
                                    value={formData.ventureDescription}
                                    onChange={(e) => setFormData({ ...formData, ventureDescription: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="website" className="block mb-2 text-sm font-medium text-gray-900 ">Estimated Delivary Date</label>
                                <input
                                    type="date" id="website" className="bg-gray-50 border border-gray-300 text-gray-900   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
                                    placeholder=""

                                    value={formData.estimatedDelivaryDate}
                                    onChange={(e) => setFormData({ ...formData, estimatedDelivaryDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-6 ">
                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 ">Site address</label>
                                <input
                                    type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=""
                                    value={formData.siteAddress}
                                    onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="my-5 mx-5">

                            <div className="mb-6">
                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 ">Previous venture</label>
                                <input
                                    type="text" id="email" className="bg-gray-50 border   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-  w-full p-2   "
                                    placeholder=""
                                    value={formData.previousVenture}
                                    onChange={(e) => setFormData({ ...formData, previousVenture: e.target.value })}
                                />
                            </div>
                            <div className="mb-6">
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Office address</label>
                                <input
                                    type="text" id="password" className="bg-gray-50 border border-gray-  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                                    placeholder=""
                                    value={formData.officeAdress}
                                    onChange={(e) => setFormData({ ...formData, officeAdress: e.target.value })}
                                />
                            </div>
                            <div className="mb-6">
                                <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 ">Location</label>
                                <input
                                    type="text" id="confirm_password" className="bg-gray-50 border border-  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2 "
                                    placeholder=""
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 ">Project overview</label>
                            <textarea
                                id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Extent,number of units,club house sqft..."
                                value={formData.projectOverview}
                                onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                            ></textarea>

                            <div className="flex items-start mb-6 mt-5">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                    />
                                </div>
                                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 ">I agree with the <a href="#" className="text-blue-600 hover:underline ">terms and conditions</a>.</label>
                            </div>
                        </div>
                        <button
                            className="text-white my-5 mx-5 bg-blue-700 hover:bg-blue-800
                            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                w-full sm:w-auto px-5 py-2.5 text-center  " >Submit</button>
                    </form>
                )
            }
        </>

    )
}

export default uploadDetails


