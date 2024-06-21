import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ShowDetails.css'; // Import the CSS file for styling

const ShowDetails = ({ selectedPodcast, setSelectedPodcast, addToFavorites }) => {
  const audioRef = useRef(null);
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching show details: ${response.status}`);
        }
        const responseData = await response.json();
        setShowDetails(responseData);
        setLoading(false);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        setError("Error fetching show details. Please try again later.");
        setLoading(false);
      }
    };
    fetchShowDetails();
  }, [id]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const toggleFavorite = () => {
    const isFavorite = selectedPodcast && selectedPodcast.id === id;
    if (isFavorite) {
      setSelectedPodcast(null); // Remove from favorites
    } else {
      setSelectedPodcast(showDetails); // Add to favorites
      addToFavorites(showDetails); // Optionally pass season and title as needed
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  const handleAudioProgress = () => {
    // Handle audio progress update as needed
  };

  // Function to handle adding to favorites
  const handleAddToFavorites = () => {
    addToFavorites(showDetails); // Call addToFavorites with showDetails
    // Optionally handle UI state change or feedback
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!showDetails) {
    return <div>Show not found</div>;
  }

  return (
    <div className="show-details-container">
      <div className="show-details-box">
        <button onClick={handleBackClick} className="back-button">&larr; Back</button>
        <h1 className="show-title">{showDetails.title}</h1>
        <img src={showDetails.image} alt={showDetails.title} className="show-image" />

        <p className="show-description">{showDetails.description}</p>

        

     

        {selectedSeason ? (
          <div className="selected-season-container">
            <h2 className="selected-season-title">{selectedSeason.title}</h2>
            <img src={selectedSeason.image} alt={selectedSeason.title} className="selected-season-image" />
            <h3 className="episodes-title">Episodes</h3>
            {selectedSeason.episodes.map(episode => (
              <div key={episode.id} className="episode-item">
                <p className="episode-title">{episode.title}</p>
                <audio
                  ref={audioRef}
                  className="audio-player"
                  onTimeUpdate={handleAudioProgress}
                >
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <div className="audio-controls">
                  <button onClick={playAudio} className="play-button">{audioPlaying ? 'Pause' : 'Play'}</button>
                  <button onClick={pauseAudio} className="stop-button">Stop</button>
                  <button
          onClick={toggleFavorite}
          className={`favorite-button ${selectedPodcast && selectedPodcast.id === id ? 'remove-favorite' : 'add-favorite'}`}
        >
          {selectedPodcast && selectedPodcast.id === id ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="seasons-container">
            <h2 className="seasons-title">Seasons</h2>
            {showDetails.seasons.map(season => (
              <div
                key={season.id}
                className="season-item"
                onClick={() => handleSeasonSelect(season)}
              >
                <h3 className="season-title">{season.title}</h3>
                <p className="episode-count">Episodes: {season.episodes.length}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
