import { User } from '@prisma/client';
import React, { useState } from 'react';
// import { ChevronDownIcon } from '@heroicons/react/solid'; // Replace with your icon library

interface UserDropdownProps {
  users: User[];
  isOpen: boolean;
  onCloseDropdown: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, isOpen, onCloseDropdown }) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={onCloseDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="user-menu-button"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="true"
        >
          Select User
          {/* <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          /> */}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          {users.map((user) => (
            <div key={user.id} className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                tabIndex={-1}
                id={`user-menu-item-${user.id}`}
                onClick={() => {
                  console.log(`User ${user.id} selected`);
                  onCloseDropdown();
                }}
              >
                {user.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
