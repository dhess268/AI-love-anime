import PropTypes from 'prop-types';

export default function UserAnimeList({ anime }) {
  function renderAnime() {
    return anime.map((singleAnime) => (
      <div>
        <span>{singleAnime.title}</span>
      </div>
    ));
  }

  return anime ? renderAnime() : <div>loading</div>;
}

UserAnimeList.propTypes = {
  anime: PropTypes.array,
};
