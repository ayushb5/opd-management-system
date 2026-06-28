function Pagination({ currentPage, totalPages, onPageChange }) {
    const visiblePages = 5;

    const startPage = Math.floor(currentPage / visiblePages) * visiblePages;
    const endPage = Math.min(
        startPage + visiblePages - 1,
        totalPages - 1
    );

    console.log(currentPage);

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        disabled={currentPage === 0}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        &lt;
                    </button>
                </li>
                {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                    const page = startPage + index;
                    return (
                        <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}>
                            <button className="page-link" onClick={() => onPageChange(page)}>{page + 1}</button>
                        </li>
                    )
                })}
                <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        disabled={currentPage === totalPages - 1}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        &gt;
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination