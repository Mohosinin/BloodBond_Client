import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="font-mono bg-red-100 p-2 rounded mb-8">
                {error.statusText || error.message}
            </p>
            <Link to="/" className="btn btn-primary text-white">Go back Home</Link>
        </div>
    );
};

export default ErrorPage;
