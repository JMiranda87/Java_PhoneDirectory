import React, { useState } from 'react';
import { PhoneDirectoryWithTreeMap } from './PhoneDirectoryWithTreeMap';
import { Phone, UserPlus, Search, List } from 'lucide-react';

const App: React.FC = () => {
  const [directory] = useState(() => new PhoneDirectoryWithTreeMap());
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [entries, setEntries] = useState<[string, string][]>([]);

  const handleAddEntry = () => {
    try {
      directory.putNumber(name, number);
      setName('');
      setNumber('');
      setEntries(directory.getEntries());
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = () => {
    const result = directory.getNumber(searchName);
    setSearchResult(result !== undefined ? result : 'Not found');
  };

  const handlePrint = () => {
    setEntries(directory.getEntries());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Phone Directory</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <UserPlus className="mr-2" size={20} />
            Add Entry
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleAddEntry}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <Search className="mr-2" size={20} />
            Search
          </h2>
          <input
            type="text"
            placeholder="Search name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Search
          </button>
          {searchResult && (
            <p className="mt-2 text-center">
              {searchResult === 'Not found' ? (
                <span className="text-red-500">Not found</span>
              ) : (
                <>
                  Number: <span className="font-semibold">{searchResult}</span>
                </>
              )}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <List className="mr-2" size={20} />
            Directory Entries
          </h2>
          <button
            onClick={handlePrint}
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 mb-2"
          >
            Print Entries
          </button>
          <ul className="list-disc pl-5">
            {entries.map(([name, number]) => (
              <li key={name} className="mb-1">
                <span className="font-semibold">{name}:</span> {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;