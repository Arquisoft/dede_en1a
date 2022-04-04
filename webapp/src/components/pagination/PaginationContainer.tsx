import React, { useState } from 'react';
import {PaginationComponent} from "./Pagination";

export const PaginationContainer = () => {
    const [page, setPage] = useState(1);
    const totalPages = 15;
    const handlePages = (updatePage: number) => setPage(updatePage);
    return (
        <div className="container">
            <PaginationComponent
                page={page}
                totalPages={totalPages}
                handlePagination={handlePages}
            />
        </div>
    );
};