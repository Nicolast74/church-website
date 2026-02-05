export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Church Name. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
