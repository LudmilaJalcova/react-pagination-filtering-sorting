import React, { Component } from 'react';
import _ from 'lodash';
import MoviesTable from './common/moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    // this.setState({ movies: getMovies(), genres: genres });
    // we can get rid of the repetition genres: genres like this
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenereSelect = genre => {
    this.setState({ selectedGenere: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    // this.setState({ sortColumn: { path, order: 'asc' } });
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenere,
      sortColumn
    } = this.state;

    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const filtered =
      selectedGenere && selectedGenere._id
        ? allMovies.filter(m => m.genre._id === selectedGenere._id)
        : allMovies;

    // default value filtered is array legnth is 9
    // default value sortColumn.path is 'title' or 'genre.name' or 'numberInStock' or 'dailyRentalRate'
    // default value sortColumn.order is 'asc' or 'desc'
    // _.orderBy(collection, sort name options, asc or desc)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    const totalCount = filtered.length;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenere}
            onItemSelect={this.handleGenereSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
