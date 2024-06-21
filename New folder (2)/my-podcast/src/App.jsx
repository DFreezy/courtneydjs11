import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowHome from './components/Home'; // Adjust paths for other components
import Favorites from './components/Favorites';
import Login from './components/Login';
import ShowDetails from './components/ShowDetails';

const App = () => {
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const addToFavorites = (episode, show, season) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorite = { episode, show, season, dateAdded: new Date() };
    const updatedFavorites = [...storedFavorites, newFavorite];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowHome />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/showdetails/:id" 
          element={<ShowDetails 
            selectedPodcast={selectedPodcast} 
            setSelectedPodcast={setSelectedPodcast} 
            addToFavorites={addToFavorites} 
          />} 
        />
        <Route path="*" element={<ShowHome />} />
      </Routes>
    </Router>
  );
};

export default App;
