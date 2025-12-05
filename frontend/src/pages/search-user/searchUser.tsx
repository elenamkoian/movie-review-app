import { useState } from "react";
import type { IUser } from "../../types";
import { Axios } from "../../lib/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { SearchedUserItem } from "./searchedUserItem";

export const SearchUserPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    Axios.get(`/auth/users/search/${searchText}`)
      .then((response) => {
        const users = response.data.users;
        setSearchedUsers(users);
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center py-24 px-8">
      <div className="w-6xl">
        <div className="bg-white h-full min-h-60 rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Search Users</h2>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Search for a user..."
              value={searchText}
              onChange={(ev) => setSearchText(ev.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
              onKeyDown={(ev) => {
                if(ev.key === "Enter") {
                  ev.preventDefault()
                  handleSearch()
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-800 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition hover:shadow-lg hover:scale-105"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto">
            {searchedUsers.length ? (
              searchedUsers.map((user) => (
                <Link to={`/searched-user/${user._id}`} key={user._id}>
                  <SearchedUserItem user={user} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                {searchText
                  ? "No users found."
                  : "Search for a user to begin."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
