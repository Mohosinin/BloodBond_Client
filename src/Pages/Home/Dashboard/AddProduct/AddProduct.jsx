import React from 'react';

const AddProduct = () => {
    return (
        <div className="max-w-md mx-auto bg-base-100 shadow-xl p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Product Name</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </div>
            <button className="btn btn-primary mt-4 w-full">Add Product</button>
        </div>
    );
};
export default AddProduct;
