import React, { Component } from 'react'
import MovieList from './MovieList.jsx';
import movies from '../../../helpers/movieApi.js';
import $ from 'jquery';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      add: '',
      search: ''
    }
    //bind zone
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onAddMovie = this.onAddMovie.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    //get movie data
    this.getData();
  }

  getData () {
    var that = this;
    $.ajax({
      url: 'http://localhost:3000/api/movies',
      type: 'GET',
      success: function(data) {
        console.log('data', data);
        that.setState({
          movies: data
        });
      }
    });
  }

  onAddMovie (event) {
    event.preventDefault();
    let copy = this.state.movies.slice();
    let movieObj = {title: this.state.add};
    var that = this;
    copy.push(movieObj);
    $.ajax({
      url: 'http://localhost:3000/api/movies',
      type: 'POST',
      data: JSON.stringify(movieObj),
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        that.setState({
          movies: copy
        });
      }
    });
  }

  onFormSubmit (e) {
    e.preventDefault();
    var copy = this.state.movies.slice();
    var term = this.state.value;
    var filtered = [];
    for(var i = 0; i < copy.length; i++) {
      let title = copy[i].title.toLowerCase();
      if (title.includes(term)) {
        filtered.push(copy[i]);
      }
    }
    this.setState({movies: filtered});
  }

  handleInputChange (e) {
    let lowerCaseTerm = e.target.value.toLowerCase();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }



  render() {

  if (this.state.movies.length === 0) {
      return (
          <div>
          <h1>Movie List 300</h1>
          <h2>No movies with that title were found</h2>
          <form onSubmit={this.onAddMovie} onChange={this.handleInputChange}>
            <label>
              Add
              <input type="text" name="add" />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <form onSubmit={this.onFormSubmit} onChange={this.handleInputChange}>
            <label>
              Search:
              <input type="text" name="search" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <MovieList movies={this.state.movies} />
        </div>
      )
    }

    else {
      return (
        <div>
          <h1>Movie List</h1>
          <form onSubmit={this.onAddMovie} onChange={this.handleInputChange}>
            <label>
              Add Movie
              <input type="text" name="add" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={this.onFormSubmit} onChange={this.handleInputChange}>
            <label>
              Search
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <MovieList movies={this.state.movies} />
        </div>
      )
    }
  }
}
