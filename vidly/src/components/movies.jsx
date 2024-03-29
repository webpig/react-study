import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: '',
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({
            movies
        });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movies[index].liked;

        this.setState({ movies });
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleGenreSelect = (genre) => {
        this.setState({ searchQuery: '', selectedGenre: genre, currentPage: 1 });
    }

    handleSearch = (query) => {
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1
        })
    }

    getPagedData = () => {
        const {
            currentPage,
            pageSize,
            selectedGenre,
            sortColumn,
            movies: allMovies,
            searchQuery
        } = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(movie => movie.genre._id === selectedGenre._id);
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return {
            itemsCount: filtered.length,
            data: movies
        }
    }

    render() {
        const { length: count } = this.state.movies;
        const {
            currentPage,
            pageSize,
            sortColumn,
            searchQuery
        } = this.state;

        if (count === 0) return <p>There no movies in the database.</p>

        const { itemsCount, data: movies } = this.getPagedData()

        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link
                        to="/movies/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Movie
                    </Link>
                    <p>Showing {itemsCount} movies in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={itemsCount}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}
 
export default Movies;