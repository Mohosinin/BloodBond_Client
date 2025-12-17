import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

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

    // ImgBB API Key
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

        // Find names since value will be IDs for filtering
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
                background: '#fff',
                color: '#1F2937'
            })
            return;
        }

        try {
            // 1. Upload image to ImageBB
            const formData = new FormData();
            formData.append('image', photo);
            
            const res = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            const imgData = await res.json();
            
            if (imgData.success) {
                const imgUrl = imgData.data.display_url;
                
                // 2. Create User in Firebase
                const result = await createUser(email, password);
                const loggedUser = result.user;
                console.log(loggedUser);
                
                // 3. Update Firebase Profile
                await updateUserProfile(name, imgUrl);
                
                // 4. Create User in Database
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
                        background: '#fff',
                        color: '#1F2937'
                    });
                    navigate('/');
                }
            } else {
                 Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: 'We could not upload your avatar. Please try a different image.',
                    confirmButtonColor: '#EF4444',
                    background: '#fff',
                    color: '#1F2937'
                })
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Error',
                text: error.message,
                confirmButtonColor: '#EF4444',
                background: '#fff',
                color: '#1F2937'
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row">
                
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
                <div className="md:w-2/3 p-10 md:p-12 bg-white">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-500 mt-2">Fill in your details to register as a donor.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Form Fields */}
                            <div className="form-control">
                                <label className="label font-medium text-gray-700">Full Name</label>
                                <input type="text" name="name" placeholder="John Doe" className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white transition-colors" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium text-gray-700">Email</label>
                                <input type="email" name="email" placeholder="john@example.com" className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white transition-colors" required />
                            </div>
                            
                            <div className="form-control">
                                <label className="label font-medium text-gray-700">Blood Group</label>
                                <select name="bloodGroup" className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white" defaultValue="default" required>
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
                                <label className="label font-medium text-gray-700">Division</label>
                                <select name="division" className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white" onChange={(e) => setSelectedDivision(e.target.value)} defaultValue="default" required>
                                    <option disabled value="default">Select Division</option>
                                    {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
                                </select>
                            </div>

                             <div className="form-control">
                                <label className="label font-medium text-gray-700">District</label>
                                <select name="district" className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white" onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue="default" required disabled={!selectedDivision}>
                                    <option disabled value="default">Select District</option>
                                    {filteredDistricts.map(dist => <option key={dist.id} value={dist.id}>{dist.name}</option>)}
                                </select>
                            </div>

                             <div className="form-control">
                                <label className="label font-medium text-gray-700">Upazila</label>
                                <select name="upazila" className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white" defaultValue="default" required disabled={!selectedDistrict}>
                                    <option disabled value="default">Select Upazila</option>
                                    {filteredUpazilas.map(upa => <option key={upa.id} value={upa.id}>{upa.name}</option>)}
                                </select>
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label font-medium text-gray-700">Avatar</label>
                                <input type="file" name="photo" className="file-input file-input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label font-medium text-gray-700">Password</label>
                                <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium text-gray-700">Confirm Password</label>
                                <input type="password" name="confirm_password" placeholder="••••••••" className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 bg-gray-50 focus:bg-white" required />
                            </div>
                         </div>

                        <div className="form-control mt-8">
                            <button className="btn bg-red-600 hover:bg-red-700 text-white text-lg w-full border-none shadow-xl shadow-red-200 h-12">
                                Complete Registration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Register;
