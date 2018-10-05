import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationMoreHoriz from  'material-ui/svg-icons/navigation/more-horiz';


import axios from 'axios';
import MovieResults from '../movie-results/MovieResults';

const styles = {
    uploadButton: {
      verticalAlign: 'middle',
      width: '80%',
    },
    uploadInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    },
  };

 class Search extends Component {

     state = {
         searchText: '',
         amount: 9,
         apiUrl: 'http://beatporttopcharts.com/php/api/movie/search.php',
         movies: [],
         value: 30
     };

     componentDidMount(){
        axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`)
        .then(res=>this.setState({movies : res.data.records}))
        .catch(err => console.log(err));
     }

     onTextChange = (e) => {
        let val = e.target.value;
        this.setState({[e.target.name] : val}, () => {
            if (val===''){
                this.setState({amount:9});
                console.log(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`);
                axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`)
                    .then(res=>this.setState({movies : res.data.records}))
                    .catch(err => console.log(err));
            } else {
                axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`)
                    .then(res=>this.setState({movies : res.data.records}))
                    .catch(err => console.log(err));
            }            
        });
     };

     onAmountChange = (e, index, value) => {
        let val = e.target.textContent;
        this.setState({amount:val});
        this.setState({[this.state.amount] : val}, () => {  
            axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`)
                .then(res=>this.setState({movies : res.data.records}))
                .catch(err => console.log(err));                       
        });
    };

    onMoreClicked = (e) => {
        //this.setState({amount: this.state.amount+9});
        //let more = this.state.amount;
        this.setState({amount : this.state.amount+9}, () => {  
            axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`)
                .then(res=>this.setState({movies : res.data.records}))
                .catch(err => console.log(err));                       
        });
    };

    handleChange = (event, index, value) => {
        // method to displayed movies created in 
        // the last {this.state.value} days
        this.setState({value},() => {
            axios.get(`${this.state.apiUrl}?s=${this.state.searchText}&l=${this.state.amount}&c=${this.state.value}`)
                .then(res=>this.setState({movies : res.data.records}))
                .catch(err => console.log(err)); 
        });        
    }

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
                value={this.state.value}
                floatingLabelText="Movies added"            
                onChange={this.handleChange}
            >
                <MenuItem value={0} primaryText="Today" />
                <MenuItem value={1} primaryText="Yesterday" />
                <MenuItem value={7} primaryText="In the last 7 days" />
                <MenuItem value={30} primaryText="In the last 30 days" />
                <MenuItem value={999} primaryText="All" />
            </SelectField>
            <br/>
            {this.state.movies.length > 0 ? (<MovieResults movies={this.state.movies} />) : null}
            <br/>
            {/* {(this.state.movies.length > 0) && (this.state.movies.length >= this.state.amount) ? (<button onClick={this.onMoreClicked}>Load more...</button>) : null}        */}
            {(this.state.movies.length > 0) && (this.state.movies.length >= this.state.amount) ? (<FlatButton label="Load more" fullWidth={true} onClick={this.onMoreClicked} style={styles.uploadButton} icon={<NavigationMoreHoriz />} /> ) : null} 
        </div>      
        )
    }
}

export default Search;
