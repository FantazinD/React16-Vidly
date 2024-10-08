import React, { Component } from "react";

class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        const { sortColumn } = this.props;
        if (column.path !== sortColumn.path) return null;

        return <i className={`fa fa-sort-${sortColumn.order === "asc" ? `asc` : `desc`}`}></i>;
    };

    render() {
        const { columns } = this.props;

        return (
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            className="clickable"
                            key={column.path || column.key}
                            onClick={() => this.raiseSort(column.path)}
                        >
                            {column.label} {this.renderSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
