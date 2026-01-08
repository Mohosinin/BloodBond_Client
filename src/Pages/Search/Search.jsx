/**
 * MODIFIED BY: [Person 1 Name]
 * FEATURE: Dark/Light Mode Support + UI Improvements
 */

import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch, FaMapMarkerAlt, FaTint } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const Search = () => {
    const axiosSecure = useAxiosSecure();
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const { isDark } = useTheme();
    
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

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const districtId = form.district.value;
        const upazilaId = form.upazila.value;

        const divisionObj = divisions.find(d => d.id === selectedDivision);
        const districtObj = districts.find(d => d.id === districtId);
        const upazilaObj = upazilas.find(u => u.id === upazilaId);

        const division = divisionObj ? divisionObj.name : '';
        const district = districtObj ? districtObj.name : '';
        const upazila = upazilaObj ? upazilaObj.name : '';

        setLoading(true);
        setHasSearched(true);
        try {
            const res = await axiosSecure.get('/search-donors', {
                params: { bloodGroup, division, district, upazila }
            });
            setDonors(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const [selectedDonor, setSelectedDonor] = useState(null);

    const handleViewDetails = (donor) => {
        setSelectedDonor(donor);
        document.getElementById('donor_modal').showModal();
    }

    const selectClass = `select select-bordered focus:border-red-500 focus:ring-1 focus:ring-red-500 ${
        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'
    }`;

    return (
        <div className={`min-h-screen py-10 px-4 font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Find <span className="text-red-500">Blood Donors</span></h1>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Search for donors in your area by blood group and location.</p>
                </div>
                
                <div className={`p-8 rounded-2xl shadow-xl border mb-12 relative overflow-hidden ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                        <div className="form-control">
                            <label className={`label font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="label-text">Blood Group</span></label>
                            <select name="bloodGroup" className={selectClass} required>
                                 <option value="" disabled selected>Select Group</option>
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
                            <label className={`label font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="label-text">Division</span></label>
                             <select name="division" className={selectClass} onChange={(e) => setSelectedDivision(e.target.value)} defaultValue="default">
                                 <option value="default" disabled>Select Division</option>
                                {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
                            </select>
                        </div>
                         <div className="form-control">
                            <label className={`label font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="label-text">District</span></label>
                             <select name="district" className={selectClass} onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue="default" disabled={!selectedDivision}>
                                 <option value="default" disabled>Select District</option>
                                {filteredDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                         <div className="form-control">
                            <label className={`label font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="label-text">Upazila</span></label>
                             <select name="upazila" className={selectClass} defaultValue="default" disabled={!selectedDistrict}>
                                 <option value="default" disabled>Select Upazila</option>
                                {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <button className={`btn bg-red-600 hover:bg-red-700 text-white border-none shadow-lg gap-2 transform active:scale-95 transition-all ${isDark ? 'shadow-red-500/20' : 'shadow-red-200'}`}>
                                <FaSearch /> Search Donors
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                <div className="min-h-[200px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                             <span className="loading loading-spinner loading-lg text-red-600"></span>
                        </div>
                    ) : (
                        <>
                           {hasSearched && donors.length === 0 && (
                               <div className={`text-center py-10 rounded-2xl border shadow-sm ${
                                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                               }`}>
                                   <div className="text-6xl mb-4">🔍</div>
                                   <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>No Donors Found</h3>
                                   <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Try adjusting your search criteria to find more results.</p>
                               </div>
                           )}

                           {donors.length > 0 && (
                                <div>
                                    <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        <FaTint className="text-red-500" /> Search Results ({donors.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {donors.map(donor => (
                                            <div key={donor._id} className={`p-6 rounded-2xl shadow-sm border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${
                                                isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-white border-gray-300'
                                            }`}>
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="avatar mb-4">
                                                        <div className={`w-24 h-24 rounded-full ring-4 ring-offset-2 group-hover:ring-red-500/30 transition-all overflow-hidden ${
                                                            isDark ? 'ring-gray-700 ring-offset-gray-800' : 'ring-red-50 ring-offset-white group-hover:ring-red-100'
                                                        }`}>
                                                            <img src={donor.photo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Donor" className="object-cover w-full h-full" />
                                                        </div>
                                                    </div>
                                                    <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{donor.name}</h2>
                                                    <p className={`text-sm mb-3 flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        <FaMapMarkerAlt className="text-red-400" />
                                                        {donor.upazila}, {donor.district}
                                                    </p>
                                                    
                                                    <div className={`badge p-4 font-bold rounded-full mb-4 ${
                                                        isDark ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-100'
                                                    }`}>
                                                        Blood Group: {donor.bloodGroup}
                                                    </div>
                                                    
                                                    <div className={`w-full pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-50'}`}>
                                                        <button onClick={() => handleViewDetails(donor)} className={`btn btn-sm btn-outline rounded-full w-full ${
                                                            isDark ? 'border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600' : 'btn-error'
                                                        }`}>View Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                           )}
                        </>
                    )}
                </div>

                {/* Donor Details Modal */}
                <dialog id="donor_modal" className="modal">
                    <div className={`modal-box p-0 rounded-2xl overflow-hidden shadow-2xl relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        {selectedDonor && (
                            <>
                                <div className="h-32 bg-gradient-to-r from-red-500 to-red-600 relative">
                                    <button onClick={() => document.getElementById('donor_modal').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white bg-black/20 hover:bg-black/30 border-none">✕</button>
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                        <div className="avatar">
                                            <div className={`w-24 h-24 rounded-full ring-4 shadow-lg overflow-hidden ${isDark ? 'ring-gray-800 bg-gray-700' : 'ring-white bg-white'}`}>
                                                <img src={selectedDonor.photo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Donor" className="object-cover w-full h-full"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-16 pb-8 px-8 text-center">
                                    <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{selectedDonor.name}</h3>
                                    <p className={`flex justify-center items-center gap-2 mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaMapMarkerAlt className="text-red-500" />
                                        {selectedDonor.upazila}, {selectedDonor.district}, {selectedDonor.division}
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
                                            <p className={`text-xs uppercase tracking-wide font-semibold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Blood Group</p>
                                            <p className="text-xl font-bold text-red-500">{selectedDonor.bloodGroup}</p>
                                        </div>
                                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                                            <p className={`text-xs uppercase tracking-wide font-semibold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                                            <p className="text-xl font-bold text-blue-500">Active</p>
                                        </div>
                                    </div>
                                
                                    <div className={`text-xs italic mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        * Contact information is hidden for privacy. Please login or contact admin to connect.
                                    </div>

                                    <form method="dialog">
                                        <button className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl border-none">Close Details</button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Search;
