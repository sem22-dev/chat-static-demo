
import { Bell, MessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b lg:px-24">
      <div className="flex items-center space-x-16">
        <img src="/logo.avif" alt="Airy logo" className="h-8" />
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-500 font-medium hover:text-gray-900">Discover</a>
          <a href="#" className="text-gray-500 font-medium hover:text-gray-900">My Projects</a>
          <a href="#" className="text-gray-500 font-medium hover:text-gray-900">Payments</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <MessageSquare size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <Bell size={20} />
        </button>
        <img src="/avatar.webp" alt="User avatar" className="w-10 h-10 cursor-pointer rounded-full" />
      </div>
    </header>
  );
}