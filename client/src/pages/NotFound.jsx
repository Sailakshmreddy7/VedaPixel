function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-center px-4">
            <h1 className="text-6xl font-extrabold text-gray-800 mb-6">404</h1>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-700 text-lg max-w-md mb-6">
                Sorry, the page you are looking for does not exist.
            </p>
            <a
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                Go Back Home
            </a>
        </div>
    );
}

export default NotFound;
