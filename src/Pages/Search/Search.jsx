import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch, FaMapMarkerAlt, FaTint } from 'react-icons/fa';

const Search = () => {
    const axiosSecure = useAxiosSecure();
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    
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

        // Convert IDs to Names
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
                params: {
                    bloodGroup,
                    division,
                    district,
                    upazila
                }
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

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Find <span className="text-red-600">Blood Donors</span></h1>
                    <p className="text-gray-500">Search for donors in your area by blood group and location.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700"><span className="label-text">Blood Group</span></label>
                            <select name="bloodGroup" className="select select-bordered focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50" required>
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
                            <label className="label font-semibold text-gray-700"><span className="label-text">Division</span></label>
                             <select name="division" className="select select-bordered focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50" onChange={(e) => setSelectedDivision(e.target.value)} defaultValue="default">
                                 <option value="default" disabled>Select Division</option>
                                {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
                            </select>
                        </div>
                         <div className="form-control">
                            <label className="label font-semibold text-gray-700"><span className="label-text">District</span></label>
                             <select name="district" className="select select-bordered focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50" onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue="default" disabled={!selectedDivision}>
                                 <option value="default" disabled>Select District</option>
                                {filteredDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                         <div className="form-control">
                            <label className="label font-semibold text-gray-700"><span className="label-text">Upazila</span></label>
                             <select name="upazila" className="select select-bordered focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-gray-50" defaultValue="default" disabled={!selectedDistrict}>
                                 <option value="default" disabled>Select Upazila</option>
                                {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <button className="btn bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-200 gap-2 transform active:scale-95 transition-all">
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
                               <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                   <div className="text-6xl mb-4">🔍</div>
                                   <h3 className="text-xl font-bold text-gray-800">No Donors Found</h3>
                                   <p className="text-gray-500">Try adjusting your search criteria to find more results.</p>
                               </div>
                           )}

                           {donors.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <FaTint className="text-red-500" /> Search Results ({donors.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {donors.map(donor => (
                                            <div key={donor._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="avatar mb-4">
                                                        <div className="w-24 h-24 rounded-full ring-4 ring-red-50 ring-offset-2 group-hover:ring-red-100 transition-all overflow-hidden">
                                                            <img src={donor.photo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Donor" className="object-cover w-full h-full" />
                                                        </div>
                                                    </div>
                                                    <h2 className="text-xl font-bold text-gray-900 mb-1">{donor.name}</h2>
                                                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                                        <FaMapMarkerAlt className="text-red-400" />
                                                        {donor.upazila}, {donor.district}
                                                    </p>
                                                    
                                                    <div className="badge bg-red-50 text-red-600 border-red-100 p-4 font-bold rounded-full mb-4">
                                                        Blood Group: {donor.bloodGroup}
                                                    </div>
                                                    
                                                    <div className="w-full pt-4 border-t border-gray-50">
                                                        <button onClick={() => handleViewDetails(donor)} className="btn btn-sm btn-outline btn-error rounded-full w-full">View Details</button>
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
                    <div className="modal-box p-0 rounded-2xl overflow-hidden bg-white shadow-2xl relative">
                        {selectedDonor && (
                            <>
                                <div className="h-32 bg-gradient-to-r from-red-500 to-red-600 relative">
                                    <button onClick={() => document.getElementById('donor_modal').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white bg-black/20 hover:bg-black/30 border-none">✕</button>
                                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                        <div className="avatar">
                                            <div className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-white">
                                                <img src={selectedDonor.photo || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Donor" className="object-cover w-full h-full"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-16 pb-8 px-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedDonor.name}</h3>
                                    <p className="text-gray-500 flex justify-center items-center gap-2 mb-6 text-sm">
                                        <FaMapMarkerAlt className="text-red-500" />
                                        {selectedDonor.upazila}, {selectedDonor.district}, {selectedDonor.division}
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Blood Group</p>
                                            <p className="text-xl font-bold text-red-600">{selectedDonor.bloodGroup}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Status</p>
                                            <p className="text-xl font-bold text-blue-600">Active</p>
                                        </div>
                                    </div>
                                
                                    <div className="text-xs text-gray-400 italic mb-6">
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
