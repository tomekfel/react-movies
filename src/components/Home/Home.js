import React, { Component } from "react";
import { MY_API_URL } from "../../config";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import FontAwesome from "react-fontawesome";
import "./Home.css";
import SideDrawer from "../elements/SideDrawer/SideDrawer";
import lscache from "lscache";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 1,
    totalPages: 0,
    searchTerm: "",
    color: 30,
    ratingCount: 1000,
  };

  componentDidMount() {
    // flush expired cache
    lscache.flushExpired();
    if (lscache.get(`HomeState_${this.state.color}`)) {
      const state = JSON.parse(lscache.get(`HomeState_${this.state.color}`));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${MY_API_URL}movie/search.php?s=${this.state.searchTerm}&l=${this.state.currentPage}&c=${this.state.color}&rating_count=${this.state.ratingCount},MAX`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = (searchTerm) => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      currentPage: 1,
      searchTerm,
    });

    if (searchTerm === "") {
      // change number of days checked to last 30 days
      this.setState({ color: 30 });
      endpoint = `${MY_API_URL}movie/search.php?s=${this.state.searchTerm}&l=${this.state.currentPage}&c=${this.state.color}&rating_count=${this.state.ratingCount},MAX`;
    } else {
      // change number of days checked to all time
      this.setState({ color: 9999, ratingCount: 1 });
      endpoint = `${MY_API_URL}movie/search.php?s=${this.state.searchTerm}&l=${this.state.currentPage}&c=${this.state.color}&rating_count=${this.state.ratingCount},MAX`;
    }

    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${MY_API_URL}movie/search.php?s=${this.state.searchTerm}&l=${
        this.state.currentPage + 1
      }&c=${this.state.color}&rating_count=${this.state.ratingCount},MAX`;
    } else {
      endpoint = `${MY_API_URL}movie/search.php?s=${this.state.searchTerm}&l=${
        this.state.currentPage + 1
      }&c=${this.state.color}&rating_count=${this.state.ratingCount},MAX`;
    }
    this.fetchItems(endpoint);
  };

  passedFunction = (color) => {
    this.setState(
      {
        movies: [],
        loading: true,
        currentPage: 1,
        color,
      },
      () => {
        let endpoint = "";
        console.log(color);
        endpoint = `${MY_API_URL}movie/search.php?s=${this.state.searchTerm}&l=${this.state.currentPage}&c=${this.state.color}&rating_count=${this.state.ratingCount},MAX`;
        this.fetchItems(endpoint);
      }
    );
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result.records[0]);
        this.setState(
          {
            movies: [...this.state.movies, ...result.records],
            heroImage: this.state.heroImage || result.records[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
          },
          () => {
            if (this.state.searchTerm === "") {
              lscache.set(
                `HomeState_${this.state.color}`,
                JSON.stringify(this.state),
                2
              );
            }
          }
        );
      });
  };

  render() {
    return (
      <div className="rmdb-home">
        <SideDrawer passedFunction={this.passedFunction} />
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${this.state.heroImage.imdb_image_url}`}
              title={this.state.heroImage.imdb_title}
              text={this.state.heroImage.imdb_description}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? "Search result" : "Popular Movies"}
            loading={this.state.loading}
          >
            {this.state.movies.map((element, i) => {
              return (
                <div className="rmdb-thumb">
                  <MovieThumb
                    key={i}
                    clickable={true}
                    image={
                      element.imdb_image_url
                        ? // ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                          `${element.imdb_image_url}`
                        : "./images/no_image.jpg"
                    }
                    // movieId={element.id}
                    movieId={element.imdb_link.split("/")[4]}
                    // movieName={element.original_title}
                    movieName={element.imdb_title}
                    imdb_user_rating={element.imdb_user_rating}
                  />

                  <span className="rmdb-thumb-name">
                    <FontAwesome
                      className="far fa-star"
                      name="star"
                      size="lg"
                    />
                    {element.imdb_user_rating}
                  </span>
                  <span className="rmdb-thumb-character">
                    {element.imdb_title}
                  </span>
                </div>
              );
            })}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {this.state.currentPage < this.state.totalPages &&
          !this.state.loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
