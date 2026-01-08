/**
 * MODIFIED BY: [Person 1 Name]
 * FEATURE: Dark/Light Mode Support + UI Improvements
 */

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useTheme from '../hooks/useTheme';

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { isDark } = useTheme();

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        fetch('/bd-divisions.json')
            .then(res => res.json())
            .then(data => setDivisions(data.divisions));

        fetch('/bd-districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data.districts));

        fetch('/bd-upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data.upazilas));
    }, []);

    const filteredDistricts = districts.filter(dist => dist.division_id === selectedDivision);
    const filteredUpazilas = upazilas.filter(upa => upa.district_id === selectedDistrict);

    const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY || "1b5d848d79aaff23083c6e0c6bb33399";
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
        const bloodGroup = form.bloodGroup.value;
        const divisionId = form.division.value;
        const districtId = form.district.value; 
        const upazilaId = form.upazila.value;
        const photo = form.photo.files[0];

        const divisionObj = divisions.find(d => d.id === divisionId);
        const districtObj = districts.find(d => d.id === districtId);
        const upazilaObj = upazilas.find(u => u.id === upazilaId);

        const division = divisionObj ? divisionObj.name : divisionId;
        const district = districtObj ? districtObj.name : districtId; 
        const upazila = upazilaObj ? upazilaObj.name : upazilaId;

        if (password !== confirm_password) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'The passwords you entered do not match. Please try again.',
                confirmButtonColor: '#EF4444',
                background: isDark ? '#1F2937' : '#fff',
                color: isDark ? '#F9FAFB' : '#1F2937'
            })
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', photo);
            
            const res = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            const imgData = await res.json();
            
            if (imgData.success) {
                const imgUrl = imgData.data.display_url;
                
                const result = await createUser(email, password);
                const loggedUser = result.user;
                
                await updateUserProfile(name, imgUrl);
                
                const userInfo = {
                    name,
                    email,
                    avatar: imgUrl,
                    bloodGroup,
                    division,
                    district,
                    upazila,
                    role: 'donor',
                    status: 'active'
                };
                
                const dbRes = await axiosSecure.post('/users', userInfo);
                if (dbRes.data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registration Successful!',
                        text: 'Welcome to our community of heroes.',
                        showConfirmButton: false,
                        timer: 2000,
                        iconColor: '#EF4444',
                        background: isDark ? '#1F2937' : '#fff',
                        color: isDark ? '#F9FAFB' : '#1F2937'
                    });
                    navigate('/');
                }
            } else {
                 Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: 'We could not upload your avatar. Please try a different image.',
                    confirmButtonColor: '#EF4444',
                    background: isDark ? '#1F2937' : '#fff',
                    color: isDark ? '#F9FAFB' : '#1F2937'
                })
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: error.message,
                confirmButtonColor: '#EF4444',
                background: isDark ? '#1F2937' : '#fff',
                color: isDark ? '#F9FAFB' : '#1F2937'
            })
        }
    }

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    role: 'donor', 
                    status: 'active',
                    bloodGroup: 'N/A',
                    division: 'N/A',
                    district: 'N/A',
                    upazila: 'N/A'
                };

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Registration Successful!',
                            text: 'Welcome to our community of heroes.',
                            showConfirmButton: false,
                            timer: 2000,
                            iconColor: '#EF4444',
                            background: isDark ? '#1F2937' : '#fff',
                            color: isDark ? '#F9FAFB' : '#1F2937'
                        });
                        navigate('/');
                    })
                    .catch(err => {
                        navigate('/');
                    });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                    confirmButtonColor: '#EF4444',
                    background: isDark ? '#1F2937' : '#fff',
                    color: isDark ? '#F9FAFB' : '#1F2937'
                })
            })
    }

    // Theme-aware input classes
    const inputClass = `input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors ${
        isDark 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
            : 'bg-gray-50 focus:bg-white'
    }`;

    const selectClass = `select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 ${
        isDark 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-gray-50 focus:bg-white'
    }`;

    const labelClass = `label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

    return (
        <div className={`min-h-screen py-12 px-4 font-sans relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
             {/* Background Decoration */}
             <div className={`absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${isDark ? 'bg-red-900' : 'bg-red-100'}`}></div>
             <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${isDark ? 'bg-pink-900' : 'bg-pink-100'}`}></div>

            <div className={`max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                
                {/* Left Side: Information */}
                <div className="md:w-1/3 bg-gradient-to-br from-red-600 to-red-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white opacity-10 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
                    
                    <div>
                        <h1 className="text-3xl font-extrabold mb-4">Join Our Community</h1>
                        <p className="text-red-100 leading-relaxed mb-6">
                            Become a hero today. Creating an account is the first step towards saving lives. 
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                                <p className="text-sm">Register as a donor</p>
                            </div>
                             <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                                <p className="text-sm">Find donation requests</p>
                            </div>
                             <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                                <p className="text-sm">Save a life</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                         <p className="text-sm text-red-200">Already a member?</p>
                         <Link to="/login" className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600 w-full mt-2">Sign In</Link>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className={`md:w-2/3 p-10 md:p-12 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="mb-8">
                        <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Create Account</h2>
                        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fill in your details to register as a donor.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className={labelClass}>Full Name</label>
                                <input type="text" name="name" placeholder="John Doe" className={inputClass} required />
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Email</label>
                                <input type="email" name="email" placeholder="john@example.com" className={inputClass} required />
                            </div>
                            
                            <div className="form-control">
                                <label className={labelClass}>Blood Group</label>
                                <select name="bloodGroup" className={selectClass} defaultValue="default" required>
                                    <option disabled value="default">Select Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                             <div className="form-control">
                                <label className={labelClass}>Division</label>
                                <select name="division" className={selectClass} onChange={(e) => setSelectedDivision(e.target.value)} defaultValue="default" required>
                                    <option disabled value="default">Select Division</option>
                                    {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
                                </select>
                            </div>

                             <div className="form-control">
                                <label className={labelClass}>District</label>
                                <select name="district" className={selectClass} onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue="default" required disabled={!selectedDivision}>
                                    <option disabled value="default">Select District</option>
                                    {filteredDistricts.map(dist => <option key={dist.id} value={dist.id}>{dist.name}</option>)}
                                </select>
                            </div>

                             <div className="form-control">
                                <label className={labelClass}>Upazila</label>
                                <select name="upazila" className={selectClass} defaultValue="default" required disabled={!selectedDistrict}>
                                    <option disabled value="default">Select Upazila</option>
                                    {filteredUpazilas.map(upa => <option key={upa.id} value={upa.id}>{upa.name}</option>)}
                                </select>
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className={labelClass}>Avatar</label>
                                <input type="file" name="photo" className={`file-input file-input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`} />
                            </div>
                            
                            <div className="form-control">
                                <label className={labelClass}>Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        placeholder="••••••••" 
                                        className={`${inputClass} pr-10`} 
                                        required 
                                    />
                                    <span 
                                        className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-red-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Confirm Password</label>
                                <div className="relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        name="confirm_password" 
                                        placeholder="••••••••" 
                                        className={`${inputClass} pr-10`} 
                                        required 
                                    />
                                    <span 
                                        className={`absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-red-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                         </div>

                        <div className="form-control mt-8">
                            <button className={`btn bg-red-600 hover:bg-red-700 text-white text-lg w-full border-none shadow-xl h-12 hover:-translate-y-0.5 transition-all ${isDark ? 'shadow-red-500/20' : 'shadow-red-200'}`}>
                                Complete Registration
                            </button>
                        </div>
                    </form>

                    <div className={`divider my-6 ${isDark ? 'before:bg-gray-700 after:bg-gray-700 text-gray-500' : ''}`}>OR</div>

                    <button 
                        onClick={handleGoogleRegister} 
                        className={`btn btn-outline w-full h-12 text-lg font-normal flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all ${
                            isDark 
                                ? 'border-gray-600 hover:bg-gray-700 hover:border-gray-500 text-gray-300' 
                                : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700'
                        }`}
                    >
                        <FcGoogle className="text-2xl" />
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Register;
