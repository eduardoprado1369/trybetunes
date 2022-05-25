import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.createCard = this.createCard.bind(this);
    // this.state = {
    //   showArtistName: false,
    // };
  }

  createCard() {
    const { currentAlbums } = this.props;
    if (!currentAlbums) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    // this.setState({ showArtistName: true });
    return currentAlbums.map((element) => (
      <Link
        to={ `/album/${element.collectionId}` }
        key={ element.collectionId }
        data-testid={ `link-to-album-${element.collectionId}` }
      >
        <div key={ element.collectionId }>
          <img src={ element.artworkUrl100 } alt={ element.collectionName } />
          <p>{element.collectionName}</p>
          <p>{element.artistName}</p>
        </div>
      </Link>
    ));
  }

  render() {
    const { currentAlbums, firstInput } = this.props;
    console.log(currentAlbums);
    // const { showArtistName } = this.state;
    return (
      <div>
        <p>
          {currentAlbums.length < 1 ? <p>Nenhum álbum foi encontrado</p>
            : `Resultado de álbuns de: ${firstInput}`}
          <br />
          {this.createCard()}
          {/* {currentAlbums.length < 1 && <p>Nenhum álbum foi encontrado</p> } */}
        </p>
      </div>
    );
  }
}

MusicCard.propTypes = {
  currentAlbums: PropTypes.arrayOf(PropTypes.object).isRequired,
  firstInput: PropTypes.string.isRequired,
};

export default MusicCard;
