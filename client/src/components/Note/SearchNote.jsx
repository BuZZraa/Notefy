import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Form/Button';

function SearchNote() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
  }, []); 

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <main className="flex-grow p-8">
        <div className="search-container p-4 bg-white rounded-md mb-4 shadow-xl">
          <h2 className="text-xl font-bold mb-4">Search Notes</h2>
          <div className="mt-4 flex items-center">
            <label htmlFor="sortSelect" className="mr-2">Sort by:</label>
            <select
              id="sortSelect"
              className="border border-gray-400 px-2 py-1 rounded-md"
            >
              <option value="" selected disabled>Select</option>
              <option value="addedDate">Added Date</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="border border-gray-400 px-4 py-2 rounded-md flex-grow mr-2"
              placeholder="Search by title..."
            />
            <Button>Search</Button>
          </div>
        </div>
        <div className="search-results bg-white p-4 rounded-md">
          {searchResults.length === 0 ? (
            <p className="text-gray-500">No notes found.</p>
          ) : (
            <ul>
              {searchResults.map((note) => (
                <li key={note._id} className="border-b border-gray-300 py-2">
                  <h2 className="text-lg font-bold">{note.title}</h2>
                  <p className="text-gray-600">{note.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchNote;