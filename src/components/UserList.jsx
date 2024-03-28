import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "./Navbar/Nav";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 16;
  //Take User Deatails
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  //Apply Paginations&&search
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Nav />
      <div className="flex  mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {currentUsers.map((user, index) => (
          <div
            key={index}
            className="max-w-[calc(20%-1rem)] bg-white shadow-lg rounded-lg overflow-hidden m-4"
          >
            <div className="p-4">
              <img
                className="w-16 h-16 rounded-full mx-auto"
                src={user.avatar}
                alt="User Avatar"
              />
              <div className="text-center mt-2">
                <p className="text-xl font-semibold text-gray-800">
                  Name: {user.name}
                </p>
                <p className="text-gray-600">Email: {user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
