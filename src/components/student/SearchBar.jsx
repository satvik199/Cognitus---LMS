import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ data, setData }) {
  const [input, setInput] = useState(data || "");
  const navigate = useNavigate();

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/course-list/${input}`);
    }
  };

  // Sync local state with external data prop
  useEffect(() => {
    if (data !== undefined) setInput(data);
  }, [data]);

  // Optional: Let parent know when input changes
  useEffect(() => {
    if (setData) setData(input);
  }, [input, setData]);

  return (
    <form onSubmit={onSearchHandler}>
      <div className="w-full px-12 sm:px-6 lg:px-12 mt-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center bg-white rounded-2xl shadow-md overflow-hidden px-0 py-0 border border-gray-200">
            <input
              type="text"
              placeholder="Search for courses..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-10 py-4 text-gray-700 text-lg outline-none border-none rounded-l-2xl"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-r-2xl text-base transition-all duration-300 h-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>
     
    </form>
  );
}

export default SearchBar;
