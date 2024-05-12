import React, { useState } from "react";

const TablettesAssociees = () => {
  const [date, setDate] = useState("");
  const [tablette, setTablette] = useState("");
  const [demiJournee, setDemiJournee] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { date, tablette, demiJournee });
  };
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Les appareils associees</h1>
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
            <th>Code Association</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          <tr className="hover cursor-pointer">
            <td>1</td>
            <td>"xx:xx:xx:xx:xx:xx"</td>
            <td>"xxxx"</td>
            <td className="flex gap-4">
              <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none">
                Dissocier
              </button>
              <button
                className="btn p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Affecter
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <form
                    className="overflow-x-auto mb-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full flex mb-4">
                      <select
                        className="mx-auto select select-bordered w-full max-w-xs"
                        value={tablette}
                        onChange={(e) => setTablette(e.target.value)}
                      >
                        <option disabled value="">
                          Selectionner la tablette
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="w-full flex mb-4">
                      <input
                        id="dateInput"
                        type="date"
                        className="mx-auto  w-full max-w-xs border border-gray-300 rounded-md p-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex mb-4">
                      <select
                        className="mx-auto select select-bordered w-full max-w-xs"
                        value={demiJournee}
                        onChange={(e) => setDemiJournee(e.target.value)}
                      >
                        <option disabled value="">
                          Selectionner la demi-journée
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="modal-action grid grid-cols-3 gap-4 items-center">
                      <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                      >
                        Confirmer
                      </button>
                      <div></div>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn float-right">Close</button>
                      </form>
                    </div>
                  </form>
                </div>
              </dialog>
            </td>
          </tr>
          <tr className="hover cursor-pointer">
            <td>2</td>
            <td>"xx:xx:xx:xx:xx:xx"</td>
            <td>"xxxx"</td>
            <td className="flex gap-4">
              <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none">
                Dissocier
              </button>
              <button
                className="btn p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Affecter
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <form
                    className="overflow-x-auto mb-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full flex mb-4">
                      <select
                        className="mx-auto select select-bordered w-full max-w-xs"
                        value={tablette}
                        onChange={(e) => setTablette(e.target.value)}
                      >
                        <option disabled value="">
                          Selectionner la tablette
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="w-full flex mb-4">
                      <input
                        id="dateInput"
                        type="date"
                        className="mx-auto  w-full max-w-xs border border-gray-300 rounded-md p-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex mb-4">
                      <select
                        className="mx-auto select select-bordered w-full max-w-xs"
                        value={demiJournee}
                        onChange={(e) => setDemiJournee(e.target.value)}
                      >
                        <option disabled value="">
                          Selectionner la demi-journée
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="modal-action grid grid-cols-3 gap-4 items-center">
                      <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                      >
                        Confirmer
                      </button>
                      <div></div>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn float-right">Close</button>
                      </form>
                    </div>
                  </form>
                </div>
              </dialog>
            </td>
          </tr>
          <tr className="hover cursor-pointer">
            <td>3</td>
            <td>"xx:xx:xx:xx:xx:xx"</td>
            <td>"xxxx"</td>
            <td className="flex gap-4">
              <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none">
                Dissocier
              </button>
              <button
                className="btn p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Affecter
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <form
                    className="overflow-x-auto mb-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full flex mb-4">
                      <select
                        className="mx-auto select select-bordered w-full max-w-xs"
                        value={tablette}
                        onChange={(e) => setTablette(e.target.value)}
                      >
                        <option disabled value="">
                          Selectionner la tablette
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="w-full flex mb-4">
                      <input
                        id="dateInput"
                        type="date"
                        className="mx-auto  w-full max-w-xs border border-gray-300 rounded-md p-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex mb-4">
                      <select
                        className="mx-auto select select-bordered w-full max-w-xs"
                        value={demiJournee}
                        onChange={(e) => setDemiJournee(e.target.value)}
                      >
                        <option disabled value="">
                          Selectionner la demi-journée
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                    <div className="modal-action grid grid-cols-3 gap-4 items-center">
                      <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                      >
                        Confirmer
                      </button>
                      <div></div>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn float-right">Close</button>
                      </form>
                    </div>
                  </form>
                </div>
              </dialog>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablettesAssociees;
