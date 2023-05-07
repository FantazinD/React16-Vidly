import React, { Component } from "react";
import HeartReact from "./common/heartReact";
import Table from "./common/table";
import { Link } from "react-router-dom";
import authService from "../services/authService";

class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            label: "Title",
            content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            path: "like",
            content: (movie) => (
                <HeartReact isLiked={movie.isLiked ? movie.isLiked : false} onClick={() => this.props.onReact(movie)} />
            ),
        },
    ];

    deleteColumn = {
        path: "delete",
        content: (movie) => (
            <button
                onClick={() => {
                    this.props.onDelete(movie);
                }}
                className="btn btn-danger"
            >
                Delete
            </button>
        ),
    };

    constructor() {
        super();
        const user = authService.getCurrentUser();
        user && user.isAdmin && this.columns.push(this.deleteColumn);
    }

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return <Table data={movies} columns={this.columns} onSort={onSort} sortColumn={sortColumn} />;
    }
}

export default MoviesTable;
