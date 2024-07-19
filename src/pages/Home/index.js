import { Component } from "react";
import SearchBar from "../../components/SearchBar";
import MovieCard from "../../components/MovieCard";
import { Blocks } from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  in_progress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movies: [],
    totalResults: null,
    searchInput: "",
    showErrorMessage: false,
  };

  onSetSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onClearSearchInput = () => {
    this.setState({ searchInput: "" });
  };

  onHandleSearch = () => {
    const { searchInput } = this.state;
    if (searchInput.trim() === "") {
      this.setState({ showErrorMessage: true });
      return;
    }
    this.setState({
      apiStatus: apiStatusConstants.in_progress,
      showErrorMessage: false,
    });
    this.fetchMovies();
  };

  fetchMovies = async () => {
    const { searchInput } = this.state;
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchInput.trim()}`
      );
      const data = await response.json();
      const results = data.docs.map((doc) => ({
        title: doc.title,
        author_name: doc.author_name,
        first_publish_year: doc.first_publish_year,
      }));
      this.setState({
        movies: results,
        totalResults: data.num_found,
        apiStatus: apiStatusConstants.success,
      });
    } catch (err) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderInitialView = (message) => (
    <div className="status-message-container">
      <h1 className="welcome-message">Welcome!</h1>
      <p className="status-message">
        Start your search by typing a movie name in the search bar above.
      </p>
    </div>
  );

  renderInProgressView = () => (
    <div className="in-progress-container">
      <Blocks />
    </div>
  );

  renderFailureView = () => (
    <div className="status-message-container">
      <p className="status-message">
        Failed to fetch movies.
        <br /> Please try again.
      </p>
      <button className="try-again-button" onClick={this.onHandleSearch}>
        Try Again
      </button>
    </div>
  );

  renderMovieCards = () => {
    const { movies } = this.state;
    return (
      <div className="cards-container">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            author={
              movie.author_name ? movie.author_name.join(", ") : "Unknown"
            }
            year={movie.first_publish_year}
          />
        ))}
      </div>
    );
  };

  renderPosterMovieDetails = () => {
    const { totalResults } = this.state;
    return (
      <>
        <h1 className="total-results">{totalResults} Movies Found</h1>

        {totalResults === 0 ? (
          <div className="no-results">
            <h1 className="welcome-message">No movies found.</h1>
            <p className="status-message">
              Please try searching with different keywords.
            </p>
          </div>
        ) : (
          this.renderMovieCards()
        )}
      </>
    );
  };

  renderApiStatusView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView();
      case apiStatusConstants.in_progress:
        return this.renderInProgressView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.success:
        return this.renderPosterMovieDetails();
      default:
        return null;
    }
  };

  render() {
    const { searchInput, showErrorMessage } = this.state;
    return (
      <div className="home-container">
        <div className="home-background-gradient">
          <div className="home-radial-gradient"></div>
        </div>
        <SearchBar
          searchInput={searchInput}
          onSetSearchInput={this.onSetSearchInput}
          onClearSearchInput={this.onClearSearchInput}
          onHandleSearch={this.onHandleSearch}
        />
        {showErrorMessage && (
          <p className="invalid-input-message">Please enter a valid input.</p>
        )}
        {this.renderApiStatusView()}
      </div>
    );
  }
}

export default Home;
