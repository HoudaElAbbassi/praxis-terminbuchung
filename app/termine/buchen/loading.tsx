import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo.jpeg"
                alt="Praxis Logo"
                width={80}
                height={80}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-3"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              Online-Terminbuchung
            </h1>
            <p className="text-base sm:text-lg text-gray-600">Wählen Sie Ihren Wunschtermin in nur wenigen Schritten</p>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              {/* Spinner */}
              <svg
                className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="text-gray-600 text-lg font-medium">Terminarten werden geladen...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
