const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
      const pages = [];
  
      if (totalPages <= 3) {
        
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (currentPage === 1) {
      
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
      
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
  
      return pages;
    };
  
    return (
      <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse my-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-2 border rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-amber-800 text-white bg-amber-950 cursor-pointer"
          }`}
        >
          قبلی
        </button>
  
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 mr-3 py-2 rounded-md ${
              currentPage === page
                ? "bg-yellow-950 hover:bg-amber-800 text-white cursor-pointer"
                : "bg-gray-600 cursor-pointer text-white hover:bg-yellow-700"
            }`}
          >
            {page}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-2 border rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-yellow-800  text-white bg-yellow-950 cursor-pointer"
          }`}
        >
          بعدی
        </button>
      </div>
    );
  };
  
  export default Pagination;
  