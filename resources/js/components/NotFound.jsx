import React, { memo } from 'react';

/**
 * NotFoundPage component
 *
 * This component displays a message indicating that the requested page was not found (404 error).
 * It provides a link for the user to navigate back to the main page.
 * @returns {JSX.Element} NotFoundPage component
 */
const NotFoundPage = memo(() => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800">
            <div className="w-full max-w-md text-center">
                {/* Logo and title */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/algoritmizator/storage/logo.png"
                        alt="Logo"
                        className="h-16 w-16 rounded-full mb-5 object-cover border-2 border-purple-800 animate-pulse"
                    />
                    <h2 className="text-3xl font-bold text-white mb-2">Az oldal nem található</h2>
                </div>

                {/* Error message box */}
                <div className="px-8 py-6 bg-gray-800 shadow-lg rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">404-es hiba</h3>
                    <p className="text-lg text-gray-300 mb-4">
                        Hoppá! A keresett oldal nem létezik. Lehet, hogy áthelyezték vagy törölték.
                    </p>
                    <a
                        href="/algoritmizator/app"
                        className="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition duration-300"
                    >
                        Tovább a főoldalra
                    </a>
                </div>
            </div>
        </div>
    );
});

export default NotFoundPage;
