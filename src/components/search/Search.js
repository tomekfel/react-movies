import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import axios from 'axios';
import MovieResults from '../movie-results/MovieResults';

 class Search extends Component {

     state = {
         searchText: '',
         amount: 9,
         apiUrl: 'http://beatporttopcharts.com/php/api/movie/search.php',
         movies: []
     };

     onTextChange = (e) => {
        let val = e.target.value;
        this.setState({[e.target.name] : val}, () => {
            if (val===''){
                this.setState({movies:[]});
            } else {
                axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}`)
                    .then(res=>this.setState({movies : res.data.records}))
                    .catch(err => console.log(err));
            }            
        });
     };

     onAmountChange = (e, index, value) => {
        let val = e.target.textContent;
        this.setState({amount:val});
        this.setState({[this.state.amount] : val}, () => {  
            axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}`)
                .then(res=>this.setState({movies : res.data.records}))
                .catch(err => console.log(err));                       
        });
    };

    onMoreClicked = (e) => {
        //this.setState({amount: this.state.amount+9});
        //let more = this.state.amount;
        this.setState({amount : this.state.amount+9}, () => {  
            axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}`)
                .then(res=>this.setState({movies : res.data.records}))
                .catch(err => console.log(err));                       
        });
    };

  render() {
    return (
      <div>
        <TextField 
            name="searchText"
            value={this.state.searchText}
            onChange={this.onTextChange}
            floatingLabelText="Search For Movies"
            fullWidth={true}
        />
        <br/>
        <SelectField
            name="amount"
            value={this.state.amount}
            floatingLabelText="Amount"            
            onChange={this.onAmountChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={"Twenty"}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={"all"}>All</MenuItem>
        </SelectField>
        <br/>
        {this.state.movies.length > 0 ? (<MovieResults movies={this.state.movies} />) : null}
        <br/>
        {(this.state.movies.length > 0) && (this.state.movies.length >= this.state.amount) ? (<button onClick={this.onMoreClicked}>Load more...</button>) : null}        
      </div>      
    )
  }
}

export default Search;
