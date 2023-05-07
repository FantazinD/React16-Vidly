import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, data, sortColumn, columns }) => (
    <table className="table my-3">
        <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
        <TableBody data={data} columns={columns} />
    </table>
);

export default Table;
