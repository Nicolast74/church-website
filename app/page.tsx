export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Welcome to Our Church
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A place of hope, faith, and community.
        </p>
      </div>

      <div className="mt-10">
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Join Us for Worship
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Our services are a time of celebration, reflection, and community.
              </p>
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-6-3a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Sunday Service: 10:00 AM
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      123 Main Street, Anytown, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            About Our Church
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            We are a community of believers dedicated to sharing the love of Christ and serving our neighbors.
            Our mission is to lead people into a growing relationship with Jesus Christ.
          </p>
        </div>
      </div>
    </div>
  );
}