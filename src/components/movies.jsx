import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: ``,
        selectedGenre: null,
        sortColumn: { path: "title", order: "asc" },
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: "All Genres" }, ...data];

        const { data: movies } = await getMovies();
        this.setState({
            movies,
            genres,
        });
    }

    handleDeleteMovie = async (movie) => {
        const originalMovies = this.state.movies;

        const movies = originalMovies.filter((mov) => mov._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) toast.error("This movie has already been deleted.");
            else this.setState({ movies: originalMovies });
        }
    };

    handleReactClick = (movie) => {
        this.setState({
            movies: this.state.movies.map((mov) =>
                mov._id === movie._id ? { ...mov, isLiked: mov.isLiked ? !mov.isLiked : true } : mov
            ),
        });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { movies: allMovies, selectedGenre, sortColumn, searchQuery, currentPage, pageSize } = this.state;

        let filteredMovies = allMovies;
        if (searchQuery)
            filteredMovies = allMovies.filter((movie) =>
                movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filteredMovies = allMovies.filter((movie) => movie.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filteredMovies.length, data: movies };
    };

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    render() {
        const { movies: allMovies, searchQuery, sortColumn, currentPage, pageSize, genres, selectedGenre } = this.state;
        const { user } = this.props;

        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-3">
                        <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect} />
                    </div>
                    <div className="col">
                        {user && (
                            <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
                                New Movie
                            </Link>
                        )}
                        {allMovies.length === 0 ? (
                            <p className="my-3">{`There are no movies in the database.`}</p>
                        ) : (
                            <React.Fragment>
                                <p className="my-3">{`Showing ${totalCount} in the database.`}</p>
                                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                                <MoviesTable
                                    movies={movies}
                                    sortColumn={sortColumn}
                                    onDelete={this.handleDeleteMovie}
                                    onReact={this.handleReactClick}
                                    onSort={this.handleSort}
                                />
                                <Pagination
                                    itemsCount={totalCount}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange}
                                />
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Movies;
