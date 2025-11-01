 function SearchBar({query, setQuery, onSearch, onRandom, onClear }) {
    return (
      <div className="flex flex-wrap justify-center items-center gap-2 my-4">
        <input
          type="text"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search by ingredient or recipe name..."
          className="border px-4 py-2 rounded-lg w-72 outline-none focus:ring-2 focus:ring-indigo-300"
          onKeyDown={(e)=>e.key=== "Enter" && onSearch()}
          
        />
        <button
        onChange={onSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
         Search
        </button>

        <button
        onClick={onRandom}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
       Random
        </button>

        <button
        onClick={onClear}
        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Clear
        </button>
      </div>
    );
  }
  export default SearchBar;
  