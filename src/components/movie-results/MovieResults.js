import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

 class MovieResults extends Component {
     
     state = ({
         open:false,
         currentMovie:''
     });

     handleOpen = img => {
         this.setState({
             open: true,
             currentMovie: img
         });
     }

     handleClose = () => {
        this.setState({
            open: false
        });
    }


  render() {

      let movieListContent;
      const {movies} = this.props;
      
      if(movies) {
        movieListContent = (
            <GridList cols={3}>
                {movies.map(img=>(
                    <GridTile
                        title={img.imdb_title}
                        key={img.imdb_link}
                        subtitle={
                            <span>
                                <strong>{img.imdb_user_rating}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton onClick={() => this.handleOpen(img)}>
                                <ZoomIn color="white" />
                            </IconButton>
                        }
                    >
                    <img src={img.imdb_image_url} alt=""/>
                    </GridTile>
                ))}
            </GridList>
        )
      } else {
        movieListContent = null;
      }

      const actions =[
          <FlatButton label="Close" primary={true} onClick={this.handleClose} />
      ];

    return (
      <div>
        {movieListContent}
        <Dialog 
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            >
            {/* <div class="container">                 */}
                <img src={this.state.currentMovie.imdb_image_url} alt="Avatar" style={{width: '100%'}} />
                <h1>{this.state.currentMovie.imdb_title}</h1>
                <h4><b>Storyline</b></h4>
                <p>{this.state.currentMovie.imdb_description}</p>
            {/* </div> */}
            {/* <div class="container"> */}
                <h3>IMDB</h3>
                <p><b>User Rating</b> {this.state.currentMovie.imdb_user_rating}/10 {"(" + this.state.currentMovie.imdb_rating_count + " Users)"}</p>
                <p><b>Genre</b> {this.state.currentMovie.imdb_genre}</p>
                <p><b>Rating</b> {this.state.currentMovie.imdb_rating}</p>
                <p><b>Duration</b> {this.state.currentMovie.imdb_duration}</p>
                <p><b>Published</b> {this.state.currentMovie.imdb_date_published}</p>
                <p><b>Release</b> {this.state.currentMovie.version}</p>
            {/* </div> */}
            {/* <div class="container"> */}
                <h3>LINKS</h3>
                <a href={this.state.currentMovie.imdb_link}>IMDB</a>
                <br/>
                <a href={"https://www.imdb.com" + this.state.currentMovie.imdb_trailer_url}>Trailer</a>
            {/* </div> */}
            {/* <img src={this.state.currentMovie.imdb_image_url} alt="" style={{ width : '100%'}}/>
            <p>{this.state.currentMovie.imdb_description}</p> */}
        </Dialog>
      </div>
    )
  }
}

MovieResults.propTypes = {
    movies : PropTypes.array.isRequired
}

export default MovieResults;
