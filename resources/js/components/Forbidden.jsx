import React, { memo } from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/**
 * Forbidden component
 *
 * This component displays a "403 Forbidden" message, indicating that the user does not have permission to access the page.
 * It includes a navbar, a main message, and a footer.
 * @returns {JSX.Element} Forbidden component
 */
const Forbidden = memo(() => {
    return (
        <div>
            {/* Navbar component */}
            <Navbar />

            {/* Main content area */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800">
                <div className="w-full max-w-md text-center">
                    {/* Logo and title */}
                    <div className="flex flex-col items-center mb-8">
                        <img
                            src="/algoritmizator/storage/logo.png"
                            alt="Logo"
                            className="h-16 w-16 rounded-full mb-5 object-cover border-2 border-purple-800 animate-pulse"
                        />
                        <h2 className="text-3xl font-bold text-white mb-2">Hozzáférés megtagadva</h2>
                    </div>

                    {/* Forbidden message box */}
                    <div className="px-8 py-6 bg-gray-800 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-bold text-white mb-4">403 Tiltott</h3>
                        <p className="text-lg text-gray-300 mb-4">
                            Sajnáljuk, nincs jogosultságod az oldal eléréséhez. :(
                        </p>
                        <a
                            href="/algoritmizator/auth/login"
                            className="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition duration-300"
                        >
                            Tovább a főoldalra
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer component */}
            <Footer />
        </div>
    );
});

export default Forbidden;
