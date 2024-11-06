const Pagination = ({ pageNumber, setPageNumber }) => {
  const handleClick = (operator) => {
    setPageNumber((prev) => (operator === "add" ? prev + 3 : prev - 3));
  };

  return (
    <div className="mx-auto flex justify-center items-center gap-5">
      <button
        disabled={pageNumber === 0 && true}
        className={`px-4 py-2 font-mono my-4 rounded ${
          pageNumber >= 1
            ? "active:scale-95 bg-green-600 text-white"
            : "bg-green-400 text-black"
        }`}
        onClick={() => handleClick("minus")}
      >
        PREV
      </button>
      <h3>{pageNumber / 3 + 1}</h3>
      <button
        className=" bg-green-600 px-4 py-2 text-white font-mono my-4 rounded active:scale-95"
        onClick={() => handleClick("add")}
      >
        NEXT
      </button>
    </div>
  );
};

export default Pagination;
