import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import BookList from './BookList';
import './App.css';

class BooksApp extends Component {
  state = {
    myBooks: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => this.setState({myBooks:books}))
  }

  onChangeShelf= (e, book) => {
    BooksAPI
    .update(book, e.target.value)
    .then(
      result => {
        BooksAPI
          .getAll()
          .then( books => {this.setState({myBooks: books})
           }
        )
      }
    )
  }

  onSearchBook= (query) => {
    console.log('Query:', query);
    BooksAPI
      .search(query)
      .then(books => {
        if( books && books instanceof Array) {
          this.setState({searchBooks: books});
        }
      })
  }

  

  render() {
    return (
      <div className="app">
       
       <Route exact path='/' render={()=>(
          <BookList books={this.state.myBooks} onChangeShelf={this.onChangeShelf}/>
       )} />
       <Route  path='/search' render={({history}) => (
         <SearchBook onSearchBook={this.onSearchBook} 
              books={this.state.searchBooks}
              myBooks={this.state.myBooks}
              onChangeShelf={this.onChangeShelf} />
       )} />
        
      </div>
    )
  }
}

export default BooksApp
