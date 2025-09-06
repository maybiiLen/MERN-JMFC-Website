import React from 'react'
import defaultPFP from '../asset/defaultPFP.png';

const samplePlayers = [
    { id: 1, name: "Player One", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 2, name: "Player Two", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 3, name: "Player Three", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
    { id: 1, name: "Player One", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 2, name: "Player Two", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 3, name: "Player Three", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
        { id: 1, name: "Player One", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 2, name: "Player Two", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 3, name: "Player Three", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
]

export const Leaderboard = () => {
  // Find top scorer and top assist player
  const topScorer = samplePlayers.sort((a, b) => b.goals - a.goals)[0]
  const topAssist = samplePlayers.sort((a, b) => b.assists - a.assists)[0]
  
  return (
    <div className="max-w-4xl mx-auto p-6">
        {/*card container*/}
        <div className="card bg-base-200 shadow-xl">
            {/*card header*/}
            <div className="card-header p-6 pb-0">
              <h2 className="card-title text-2xl font-bold text-primary ">JMFC Leaderboard</h2>
            </div>

            {/* leaderboard Table */}
            <div className="card-body">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/*table head*/}
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Goals</th>
                                <th>Assists</th>
                                <th>Base Value</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                    </table>
                    
                    {/* Scrollable table body - max 6 players */}
                    <div className="max-h-96 overflow-y-auto">
                        <table className="table">
                            {/*table body*/}
                            <tbody>
                                {samplePlayers.map((player,index) => (
                                    <tr key={player.id}>
                                        {/* Rank */}
                                        <td className="font-bold">{index + 1}</td>
                                        {/*name with avatar */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={player.avatarUrl} alt={player.name} />
                                                    </div>
                                                </div>
                                                <div className="font-bold">{player.name}</div>
                                            </div>
                                        </td>
                                        {/* Goals */}
                                        <td className="font-semibold text-success">{player.goals}</td>
                                        {/* Assists */}
                                        <td className="font-semibold text-info">{player.assists}</td>
                                        {/* Base Value */}
                                        <td className="font-semibold">${player.baseValue}M</td>
                                        {/* Total Value */}
                                        <td className="font-semibold">${player.totalValue}M</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Top Scorer and Top Assist Cards*/}
        <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Top Scorer Card */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center p-4">
                    <h3 className="card-title justify-center text-lg font-bold text-success mb-3">Top Scorer</h3>
                    {/* player avatar */}
                    <div className="avatar mx-auto mb-3">
                        <div className="mask mask-circle w-16 h-16">
                            <img src={topScorer.avatarUrl} alt={topScorer.name} />
                        </div>
                    </div>
                    {/* player name */}
                    <div className="text-base font-bold mb-2">{topScorer.name}</div>
                    {/* player goals - smaller text */}
                    <div className="text-xl font-bold text-success">{topScorer.goals} Goals</div>
                </div>
            </div>

            {/* Top Assist Card */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center p-4">
                    <h3 className="card-title justify-center text-lg font-bold text-info mb-3">Top Assist</h3>
                    {/* player avatar */}
                    <div className="avatar mx-auto mb-3">
                        <div className="mask mask-circle w-16 h-16">
                            <img src={topAssist.avatarUrl} alt={topAssist.name} />
                        </div>
                    </div>
                    {/* player name */}
                    <div className="text-base font-bold mb-2">{topAssist.name}</div>
                    {/* player assists */}
                    <div className="text-xl font-bold text-info">{topAssist.assists} Assists</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Leaderboard;