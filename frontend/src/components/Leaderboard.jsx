import React, { useState, useEffect } from 'react'
import defaultPFP from '../asset/defaultPFP.png';
import { Link } from 'react-router-dom';

export const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        if (isMounted) {
          setPlayers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.error('Error fetching leaderboard:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Sort players by score descending
  const sortedPlayers = players.length > 0 ? [...players].sort((a, b) => (b.score || 0) - (a.score || 0)) : [];
  const topScorer = players.length > 0 ? [...players].sort((a, b) => b.goals - a.goals)[0] : null;
  const topAssist = players.length > 0 ? [...players].sort((a, b) => b.assists - a.assists)[0] : null;
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="text-lg">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body text-center">
            <div className="text-error text-lg">Error loading leaderboard: {error}</div>
            <p className="text-sm text-gray-500 mt-2">Make sure your backend server is running on port 5000</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
        {/*card container*/}
        <div className="card bg-base-200 shadow-xl">
            {/*card header*/}
            <div className="card-header p-8 pb-0 text-center">
              <h2 className="text-2xl font-bold text-red-700">JMFC Leaderboard</h2>
            </div>

            {/* leaderboard Table */}
            <div className="card-body">
                <div className="overflow-x-auto">
                    <div className="max-h-[600px] overflow-y-auto">
                        <table className="table">
                            {/*table head*/}
                            <thead className="sticky top-0 bg-base-200 z-10">
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Goals</th>
                                    <th>Assists</th>
                                    <th>Market Value</th>
                                </tr>
                            </thead>
                            
                            {/*table body*/}
                            <tbody>
                                {sortedPlayers.length > 0 ? sortedPlayers.map((player, index) => (
                                    <tr key={player._id}>
                                        {/* Rank */}
                                        <td className="font-bold">{index + 1}</td>
                                        {/*name with avatar */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img 
                                                            src={player.avatarUrl || defaultPFP} 
                                                            alt={player.name || 'Unknown Player'} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="font-bold">{player.name || 'Unknown Player'}</div>
                                            </div>
                                        </td>
                                        {/* Goals */}
                                        <td className="font-semibold text-red-500 pl-7">{player.goals || 0}</td>
                                        {/* Assists */}
                                        <td className="font-semibold text-amber-600 pl-7">{player.assists || 0}</td>
                                        {/* Market Value (using virtual score field) */}
                                        <td className="font-semibold pl-5">${(player.score || 0).toFixed(2)}K</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8">
                                            No players found. Add some players to see the leaderboard!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Top Scorer and Top Assist Cards*/}
        <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Top Scorer Card */}
            {topScorer && (
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body text-center p-4">
                        <h3 className="card-title justify-center text-lg font-bold text-red-500 mb-3">Top Scorer</h3>
                        {/* player avatar */}
                        <div className="avatar mx-auto mb-3">
                            <div className="mask mask-circle w-16 h-16">
                                <img src={topScorer.avatarUrl || defaultPFP} alt={topScorer.name || 'Unknown Player'} />
                            </div>
                        </div>
                        {/* player name */}
                        <div className="text-base font-bold mb-2">{topScorer.name || 'Unknown Player'}</div>
                        {/* player goals - smaller text */}
                        <div className="text-xl font-bold text-red-500">{topScorer.goals || 0} Goals</div>
                    </div>
                </div>
            )}

            {/* Top Assist Card */}
            {topAssist && (
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body text-center p-4">
                        <h3 className="card-title justify-center text-lg font-bold text-amber-600 mb-3">Top Assist</h3>
                        {/* player avatar */}
                        <div className="avatar mx-auto mb-3">
                            <div className="mask mask-circle w-16 h-16">
                                <img src={topAssist.avatarUrl || defaultPFP} alt={topAssist.name || 'Unknown Player'} />
                            </div>
                        </div>
                        {/* player name */}
                        <div className="text-base font-bold mb-2">{topAssist.name || 'Unknown Player'}</div>
                        {/* player assists */}
                        <div className="text-xl font-bold text-amber-600">{topAssist.assists || 0} Assists</div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Leaderboard;