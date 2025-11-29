import type { IUser } from "../../types";

export const SearchedUserItem = ({ user }: { user: IUser }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          {user.avatar ? (
            <img
              // src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-800">
          {user.name} {user.surname}
        </p>
      </div>
    </div>
  );
};
