function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 text-center px-4">
            <h1 className="text-6xl font-extrabold text-red-700 mb-6">403</h1>
            <h2 className="text-3xl font-semibold text-red-800 mb-4">Unauthorized</h2>
            <p className="text-red-900 text-lg max-w-md">
                You do not have permission to access this page.
            </p>
        </div>
    );
}

export default Unauthorized;
