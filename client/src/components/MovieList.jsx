import React from 'react';
import MovieEntry from './MovieEntry.jsx';

var MovieList = ({movies}) => (
 <ul>
   {movies.map(movie => <MovieEntry movie={movie} />)}
 </ul>
)

export default MovieList;