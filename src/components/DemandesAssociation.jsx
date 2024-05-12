import React from "react";

const DemandesAssociation = () => {
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Les demandes d'associations</h1>
        </div>
        <div></div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      <table className="table lg:w-[70vw] w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Num</th>
            <th>Adresse MAC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="hover cursor-pointer">
            <td>1</td>
            <td>"xx:xx:xx:xx:xx:xx"</td>
            <td className="flex gap-4">
              <button className=" p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                Accepter
              </button>
              <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none">
                Refuser
              </button>
            </td>
          </tr>
          <tr className="hover cursor-pointer">
            <td>2</td>
            <td>"xx:xx:xx:xx:xx:xx"</td>
            <td className="flex gap-4">
              <button className=" p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                Accepter
              </button>
              <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none">
                Refuser
              </button>
            </td>
          </tr>
          <tr className="hover cursor-pointer">
            <td>3</td>
            <td>"xx:xx:xx:xx:xx:xx"</td>
            <td className="flex gap-4">
              <button className=" p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                Accepter
              </button>
              <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none">
                Refuser
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DemandesAssociation;
