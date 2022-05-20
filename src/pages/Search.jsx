import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      firstInput: '',
      searchInput: '',
      loading: false,
      showResults: false,
      searchResults: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchFunction = this.searchFunction.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  async searchFunction() {
    const { searchInput } = this.state;
    const inputResults = await searchAlbumsAPI(searchInput);
    this.setState({ firstInput: searchInput,
      searchInput: '',
      loading: false,
      showResults: true,
      searchResults: inputResults });
    // console.log(searchResults);
  }

  render() {
    const { searchInput, loading, showResults, searchResults, firstInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchInput"
              onChange={ this.handleChange }
              value={ searchInput }
              id="search-input"
              placeholder="Insira o nome da banda ou artista"
            />
          </label>
          <button
            disabled={ searchInput.length < 2 }
            data-testid="search-artist-button"
            id="search-button"
            type="button"
            onClick={ this.searchFunction }
          >
            Pesquisar
          </button>
        </form>
        <br />
        {loading && <Loading />}
        {showResults && <MusicCard
          currentAlbums={ searchResults }
          firstInput={ firstInput }
        />}
      </div>
    );
  }
}

export default Search;
