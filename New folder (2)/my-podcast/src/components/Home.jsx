import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const genres = {
  0: 'All',
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

const ShowHome = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setShows(data);
        } else {
          setShows([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShows([]);
        setLoading(false);
      });
  }, []);

  const changeGenreHandler = (e) => {
    setSelectedGenre(Number(e.target.value));
  };

  const changeSortOrderHandler = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredShows = shows.filter(show => {
    return selectedGenre === 0 || show.genre === genres[selectedGenre];
  });

  const sortedShows = filteredShows.sort((a, b) => {
    switch (sortOrder) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'reverse-alphabetical':
        return b.title.localeCompare(a.title);
      case 'newest-to-oldest':
        return new Date(b.updated) - new Date(a.updated);
      case 'oldest-to-newest':
        return new Date(a.updated) - new Date(b.updated);
      default:
        return 0;
    }
  });

  const navigateToDetails = (id) => {
    navigate(`/showdetails/${id}`); // Navigate to the details page for the show with given id
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="heading">Shows</h1>
      <div className="filters">
        <select
          name="genreFilter"
          value={selectedGenre}
          onChange={changeGenreHandler}
          className="genre-select"
        >
          {Object.entries(genres).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <select
          name="sortOrder"
          value={sortOrder}
          onChange={changeSortOrderHandler}
          className="sort-order-select"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="reverse-alphabetical">Reverse Alphabetical</option>
          <option value="newest-to-oldest">Newest to Oldest</option>
          <option value="oldest-to-newest">Oldest to Newest</option>
        </select>
      </div>
      <div className="show-grid">
        {sortedShows.map(show => (
          <div key={show.id} className="show-card">
            <img className="show-image" src={show.image} alt={show.title} />
            <div className="show-details">
              <h2 className="show-title">{show.title}</h2>
              <p className="show-meta">Seasons: {show.seasons.length}</p>
              <p className="show-meta">Updated: {new Date(show.updated).toLocaleDateString()}</p>
              <button onClick={() => navigateToDetails(show.id)} className="view-details-btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/favorites')} className="favorites-button">
        Go to Favorites
      </button>
    </div>
  );
};

export default ShowHome;
