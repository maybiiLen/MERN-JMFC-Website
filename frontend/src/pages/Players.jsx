import React, { useState, useEffect } from 'react';
import defaultPFP from '../asset/defaultPFP.png';

export const Player = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/players/full');
      if (response.ok) {
        const data = await response.json();
        setPlayers(data);
      } else {
        setError('Failed to fetch players');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="players-gradient-bg">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="p-8 text-center text-white">Loading players...</div>
    </div>
  );
  
  if (error) return (
    <div className="players-gradient-bg">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="p-8 text-center text-red-300">{error}</div>
    </div>
  );

  return (
    <div className="players-gradient-bg">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      
      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">JMFC PLAYERS</h1>
        
        {/* Player Cards Grid - 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {players.map((player) => (
            <PlayerCard key={player._id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ player }) => {
  return (
        <div className="player-card">
          <div className="blob"></div>
          <div className="bg">
            {/* Player Image */}
            <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
              <img 
                src={player.avatarUrl || defaultPFP} 
                alt={player.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultPFP;
                }}
              />
            </div>
            
            {/* Player Info */}
            <div className="p-4 flex flex-col h-48">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-1 leading-tight">
                {player.name}
              </h3>
              
              {/* Player Attributes */}
              <div className="grid grid-cols-3 gap-3 text-sm mt-3">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">PAC</div>
                  <div className="text-gray-700 font-medium">{player.attributes?.pace || 50}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">SHO</div>
                  <div className="text-gray-700 font-medium">{player.attributes?.shooting || 50}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">PAS</div>
                  <div className="text-gray-700 font-medium">{player.attributes?.passing || 50}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-orange-600">DRI</div>
                  <div className="text-gray-700 font-medium">{player.attributes?.dribbling || 50}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-600">DEF</div>
                  <div className="text-gray-700 font-medium">{player.attributes?.defending || 50}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-yellow-600">PHY</div>
                  <div className="text-gray-700 font-medium">{player.attributes?.physical || 50}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};
