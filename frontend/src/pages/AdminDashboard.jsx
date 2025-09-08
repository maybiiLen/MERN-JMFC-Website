import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    goals: 0,
    assists: 0,
    saves: 0,
    baseValue: 0,
    avatarUrl: '',
    attributes: {
      pace: 50,
      shooting: 50,
      passing: 50,
      dribbling: 50,
      defending: 50,
      physical: 50
    }
  });
  const navigate = useNavigate();

  // Fetch players on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/players', {
        credentials: 'include', // Include cookies for auth
      });

      if (response.status === 401) {
        // Not authenticated, redirect to login
        navigate('/admin-login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched players:', data); // Debug: see what we're getting
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

  const handleDelete = async (playerId) => {
    if (!confirm('Are you sure you want to delete this player?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/players/${playerId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchPlayers(); // Refresh the list
      } else {
        setError('Failed to delete player');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newPlayer),
      });

      if (response.ok) {
        setNewPlayer({ 
          name: '', 
          goals: 0, 
          assists: 0, 
          saves: 0, 
          baseValue: 0, 
          avatarUrl: '',
          attributes: {
            pace: 50,
            shooting: 50,
            passing: 50,
            dribbling: 50,
            defending: 50,
            physical: 50
          }
        });
        fetchPlayers(); // Refresh the list
      } else {
        setError('Failed to create player');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const handleLogout = () => {
    // Clear any auth state and redirect
    navigate('/admin-login');
  };

  const handleEdit = (player) => {
    console.log('Editing player:', player); // Debug: see what player data we have
    setEditingPlayer({
      ...player,
      goals: player.goals || 0,
      assists: player.assists || 0,
      saves: player.saves || 0,
      baseValue: player.baseValue || 0,
      attributes: {
        pace: player.attributes?.pace || 50,
        shooting: player.attributes?.shooting || 50,
        passing: player.attributes?.passing || 50,
        dribbling: player.attributes?.dribbling || 50,
        defending: player.attributes?.defending || 50,
        physical: player.attributes?.physical || 50
      }
    });
  };

  const handleUpdatePlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/admin/players/${editingPlayer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editingPlayer),
      });

      if (response.ok) {
        setEditingPlayer(null);
        fetchPlayers(); // Refresh the list
      } else {
        setError('Failed to update player');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  const cancelEdit = () => {
    setEditingPlayer(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Edit Player Modal */}
        {editingPlayer && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Player</h3>
              <form onSubmit={handleUpdatePlayer} className="space-y-4">
                <input
                  type="text"
                  placeholder="Player Name"
                  value={editingPlayer.name}
                  onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                <input
                  type="url"
                  placeholder="Avatar URL"
                  value={editingPlayer.avatarUrl || ''}
                  onChange={(e) => setEditingPlayer({...editingPlayer, avatarUrl: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Goals"
                  value={editingPlayer.goals}
                  onChange={(e) => setEditingPlayer({...editingPlayer, goals: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Assists"
                  value={editingPlayer.assists}
                  onChange={(e) => setEditingPlayer({...editingPlayer, assists: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Saves"
                  value={editingPlayer.saves}
                  onChange={(e) => setEditingPlayer({...editingPlayer, saves: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Base Value"
                  value={editingPlayer.baseValue}
                  onChange={(e) => setEditingPlayer({...editingPlayer, baseValue: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <h4 className="text-md font-bold text-gray-900 mt-4 mb-2">Player Attributes</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Pace"
                    min="1"
                    max="99"
                    value={editingPlayer.attributes.pace}
                    onChange={(e) => setEditingPlayer({
                      ...editingPlayer, 
                      attributes: {...editingPlayer.attributes, pace: parseInt(e.target.value) || 50}
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Shooting"
                    min="1"
                    max="99"
                    value={editingPlayer.attributes.shooting}
                    onChange={(e) => setEditingPlayer({
                      ...editingPlayer, 
                      attributes: {...editingPlayer.attributes, shooting: parseInt(e.target.value) || 50}
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Passing"
                    min="1"
                    max="99"
                    value={editingPlayer.attributes.passing}
                    onChange={(e) => setEditingPlayer({
                      ...editingPlayer, 
                      attributes: {...editingPlayer.attributes, passing: parseInt(e.target.value) || 50}
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Dribbling"
                    min="1"
                    max="99"
                    value={editingPlayer.attributes.dribbling}
                    onChange={(e) => setEditingPlayer({
                      ...editingPlayer, 
                      attributes: {...editingPlayer.attributes, dribbling: parseInt(e.target.value) || 50}
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Defending"
                    min="1"
                    max="99"
                    value={editingPlayer.attributes.defending}
                    onChange={(e) => setEditingPlayer({
                      ...editingPlayer, 
                      attributes: {...editingPlayer.attributes, defending: parseInt(e.target.value) || 50}
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Physical"
                    min="1"
                    max="99"
                    value={editingPlayer.attributes.physical}
                    onChange={(e) => setEditingPlayer({
                      ...editingPlayer, 
                      attributes: {...editingPlayer.attributes, physical: parseInt(e.target.value) || 50}
                    })}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Update Player
                  </button>
                  <button 
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add New Player Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Player</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Player Name"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="url"
              placeholder="Avatar URL"
              value={newPlayer.avatarUrl}
              onChange={(e) => setNewPlayer({...newPlayer, avatarUrl: e.target.value})}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Goals"
              value={newPlayer.goals}
              onChange={(e) => setNewPlayer({...newPlayer, goals: parseInt(e.target.value) || 0})}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Assists"
              value={newPlayer.assists}
              onChange={(e) => setNewPlayer({...newPlayer, assists: parseInt(e.target.value) || 0})}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Saves"
              value={newPlayer.saves}
              onChange={(e) => setNewPlayer({...newPlayer, saves: parseInt(e.target.value) || 0})}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Base Value"
              value={newPlayer.baseValue}
              onChange={(e) => setNewPlayer({...newPlayer, baseValue: parseInt(e.target.value) || 0})}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <div className="col-span-2">
              <h4 className="text-md font-bold text-gray-900 mb-2">Player Attributes</h4>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Pace"
                  min="1"
                  max="99"
                  value={newPlayer.attributes.pace}
                  onChange={(e) => setNewPlayer({
                    ...newPlayer, 
                    attributes: {...newPlayer.attributes, pace: parseInt(e.target.value) || 50}
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Shooting"
                  min="1"
                  max="99"
                  value={newPlayer.attributes.shooting}
                  onChange={(e) => setNewPlayer({
                    ...newPlayer, 
                    attributes: {...newPlayer.attributes, shooting: parseInt(e.target.value) || 50}
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Passing"
                  min="1"
                  max="99"
                  value={newPlayer.attributes.passing}
                  onChange={(e) => setNewPlayer({
                    ...newPlayer, 
                    attributes: {...newPlayer.attributes, passing: parseInt(e.target.value) || 50}
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Dribbling"
                  min="1"
                  max="99"
                  value={newPlayer.attributes.dribbling}
                  onChange={(e) => setNewPlayer({
                    ...newPlayer, 
                    attributes: {...newPlayer.attributes, dribbling: parseInt(e.target.value) || 50}
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Defending"
                  min="1"
                  max="99"
                  value={newPlayer.attributes.defending}
                  onChange={(e) => setNewPlayer({
                    ...newPlayer, 
                    attributes: {...newPlayer.attributes, defending: parseInt(e.target.value) || 50}
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Physical"
                  min="1"
                  max="99"
                  value={newPlayer.attributes.physical}
                  onChange={(e) => setNewPlayer({
                    ...newPlayer, 
                    attributes: {...newPlayer.attributes, physical: parseInt(e.target.value) || 50}
                  })}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="col-span-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Add Player
            </button>
          </form>
        </div>

        {/* Players Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assists</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saves</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SHO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DRI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEF</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {players.map((player) => (
                <tr key={player._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {player.avatarUrl && (
                        <img className="h-10 w-10 rounded-full mr-3" src={player.avatarUrl} alt="" />
                      )}
                      <div className="text-sm font-medium text-gray-900">{player.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.goals || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.assists || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.saves || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.baseValue || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.attributes?.pace || 50}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.attributes?.shooting || 50}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.attributes?.passing || 50}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.attributes?.dribbling || 50}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.attributes?.defending || 50}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.attributes?.physical || 50}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round((player.baseValue || 0) + ((player.goals || 0) * 5) + ((player.assists || 0) * 2.5) + ((player.saves || 0) * 1))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(player)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(player._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
