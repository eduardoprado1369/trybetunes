import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumCard: [],
      bandName: '',
      albumName: '',
      favoriteSongs: [],
      loading: false,
    };
    this.getMusic = this.getMusic.bind(this);
    this.addSongToFavorites = this.addSongToFavorites.bind(this);
    this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);
    this.loadGetFavoriteSongs = this.loadGetFavoriteSongs.bind(this);
    this.getFavSongs = this.getFavSongs.bind(this);
  }

  componentDidMount() {
    this.getMusic();
    // this.loadGetFavoriteSongs();
    this.getFavSongs();
  }

  async getMusic() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    // const { id } = this.props.match.params;
    const getMusicResults = await getMusics(id);
    this.setState({ albumCard: getMusicResults,
      bandName: getMusicResults[0].artistName,
      albumName: getMusicResults[0].collectionName });
  }

  async getFavSongs() {
    const allFavSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs: allFavSongs });
  }

  loadGetFavoriteSongs(item) {
    // console.log(item);
    const { favoriteSongs } = this.state;
    console.log(favoriteSongs.some((elem) => elem.trackId === item.trackId));
    return favoriteSongs.some((elem) => elem.trackId === item.trackId);
  }

  async addSongToFavorites(item) {
    const { favoriteSongs } = this.state;
    const isSongAlreadyAFav = favoriteSongs.some((elem) => elem.trackId === item.trackId);
    if (isSongAlreadyAFav) {
      this.setState({ loading: true });
      await removeSong(item);
      const newArray = favoriteSongs.filter((song) => song.trackId !== item.trackId);
      this.setState({ favoriteSongs: newArray });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await addSong(item);
      this.setState((prevState) => ({
        favoriteSongs: [...prevState.favoriteSongs, item],
        loading: false,
      }));
    }
    // if (isSongAlreadyAFav === false) {
    //   this.setState({ loading: true });
    //   console.log(`item ${item}`);
    //   await addSong(item);
    //   this.setState({ loading: false });
    // } else { this.removeSongFromFavorites(item); }
  }

  async removeSongFromFavorites(item) {
    const { favoriteSongs } = this.state;
    this.setState({ loading: true });
    await removeSong(item);
    const currentFavSongs = favoriteSongs;
    const newFavSongs = currentFavSongs.filter((elem) => elem.id !== item.id);
    this.setState({ loading: false, favoriteSongs: newFavSongs });
  }

  render() {
    const { albumCard, bandName, albumName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {!loading
          ? (
            <>
              <p data-testid="artist-name">{ `${bandName}` }</p>
              <p data-testid="album-name">{ `${albumName}` }</p>
              {albumCard.map((item) => (
                item.trackId
          && (
            <div key={ item.id }>
              <p>{ `${item.trackName}` }</p>
              <audio
                data-testid="audio-component"
                src={ item.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorita">
                Favorita
                <input
                  data-testid={ `checkbox-music-${item.trackId}` }
                  id="favorita"
                  type="checkbox"
                  onClick={ () => this.addSongToFavorites(item) }
                  // onClick={ ({ target }) => (target.checked === false
                  //   ? (this.addSongToFavorites(item))
                  //   : (this.removeSongFromFavorites(item))) }
                  checked={ this.loadGetFavoriteSongs(item) }
                />
              </label>
            </div>
          )
              ))}
              )
            </>) : (<h1>Carregando...</h1>
          ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
