import React, { useState } from 'react';

const Repartitions = () => {
    const [date, setDate] = useState('');
    const [local, setLocal] = useState('');
    const [demiJournee, setDemiJournee] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Form submitted:', { date, local, demiJournee });
    };

    return (
        <form className="overflow-x-auto" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
                <label htmlFor="dateInput" className="block text-sm font-medium text-white-700">Selectionner la date de l'examen</label><br />
                <input id="dateInput" type="date" className="mx-auto border border-gray-300 rounded-md p-2" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="w-full flex mb-4">
                <select className="mx-auto select select-bordered w-full max-w-xs" value={local} onChange={(e) => setLocal(e.target.value)}>
                    <option disabled value="">
                        Selectionner le local
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
            <div className="w-full flex mb-4">
                <select className="mx-auto select select-bordered w-full max-w-xs" value={demiJournee} onChange={(e) => setDemiJournee(e.target.value)}>
                    <option disabled value="">
                        Selectionner la demi-journée
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
            <button type="submit" className="flex items-center px-3 py-2 bg-green-200 rounded-md text-green-700">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <span className="ml-1">Rechercher</span>
            </button>
        </form>
    );
};

export default Repartitions;
