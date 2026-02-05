import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Church Name
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              About
            </Link>
            <Link href="/sermons" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Sermons
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Events
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button */}
          </div>
        </div>
      </div>
    </header>
  );
}
