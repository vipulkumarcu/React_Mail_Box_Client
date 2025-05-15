import { useState } from "react";
import { Button } from "../Components";
import { Search, User2, Mail, Send, FileText, Trash2, Star, Archive } from "lucide-react";

function LandingPage ()
{
  const [ dropdownOpen, setDropdownOpen ] = useState ( false );
  const [ currentPage, setCurrentPage ] = useState ( 1 );
  const emailsPerPage = 3;
  const [ filter, setFilter ] = useState ( "" );

  const emailFolders = [
    { name: "Inbox", icon: Mail },
    { name: "Sent", icon: Send },
    { name: "Drafts", icon: FileText },
    { name: "Spam", icon: Trash2 },
    { name: "Trash", icon: Trash2 },
    { name: "Starred", icon: Star },
    { name: "Archive", icon: Archive },
  ];

  const allEmails = [
    { date: "2025-05-14", from: "user1@mail.com", subject: "Welcome to our new email app!" },
    { date: "2025-05-13", from: "user2@mail.com", subject: "Your verification code" },
    { date: "2025-05-12", from: "user3@mail.com", subject: "Newsletter - May Edition" },
    { date: "2025-05-11", from: "user4@mail.com", subject: "Meeting Reminder" },
    { date: "2025-05-10", from: "user5@mail.com", subject: "Password Reset" },
    { date: "2025-05-09", from: "user6@mail.com", subject: "Upcoming Updates" },
  ];

  const filteredEmails = allEmails.filter(
    (email) =>
      email.from.toLowerCase().includes(filter.toLowerCase()) ||
      email.subject.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);

  const paginate = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && indexOfLastEmail < filteredEmails.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="row-span-2 bg-white shadow-md p-4 space-y-4">
        <h2 className="text-lg font-bold text-indigo-600 mb-4">Folders</h2>
        <ul className="space-y-2">
          {emailFolders.map(({ name, icon: Icon }) => (
            <li key={name} className="flex items-center space-x-3 p-2 hover:bg-indigo-50 rounded-md cursor-pointer">
              <Icon className="w-5 h-5 text-indigo-500" />
              <span className="text-gray-700 font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md w-full max-w-xl">
          <Search className="text-indigo-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your inbox..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full text-indigo-700 font-medium bg-transparent outline-none"
          />
        </div>
        <div className="relative ml-4">
          <button onClick={() => setDropdownOpen((prev) => !prev)} className="group relative">
            <User2 className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-indigo-200 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-200 rounded-xl shadow-lg z-50 animate-fade-in-down">
              <ul className="py-2 text-base text-gray-800">
                <li className="px-5 py-2 hover:bg-slate-50 cursor-pointer">👤 Profile</li>
                <li className="px-5 py-2 hover:bg-red-100 text-red-600 cursor-pointer">🚪 Logout</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-indigo-700">Recent Emails</h3>
          <Button
            buttonText="📨 Compose"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300"
          />
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4">
          <div className="grid grid-cols-3 font-semibold text-center text-indigo-600 border-b pb-2 mb-2">
            <span>Date</span>
            <span>From</span>
            <span>Subject</span>
          </div>

          {currentEmails.map((email, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-center text-gray-700 py-2 border-b hover:bg-indigo-50 cursor-pointer"
            >
              <span>{email.date}</span>
              <span>{email.from}</span>
              <span>{email.subject}</span>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => paginate("prev")}
              disabled={currentPage === 1}
              className="text-indigo-600 font-semibold hover:text-indigo-800 disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-sm font-semibold text-gray-600">Page {currentPage}</span>
            <button
              onClick={() => paginate("next")}
              disabled={indexOfLastEmail >= filteredEmails.length}
              className="text-indigo-600 font-semibold hover:text-indigo-800 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;