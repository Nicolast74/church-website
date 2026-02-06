export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Nama Gereja. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex space-x-6 mt-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
              Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
