import React from 'react'
import defaultPFP from '../asset/defaultPFP.png';

const samplePlayers = [
    { id: 1, name: "Player One", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 2, name: "Player Two", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 3, name: "Player Three", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
    { id: 4, name: "Player Four", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 5, name: "Player Five", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 6, name: "Player Six", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
    { id: 7, name: "Player Seven", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 8, name: "Player Eight", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 9, name: "Player Nine", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
    { id: 10, name: "Player Ten", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 11, name: "Player Eleven", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 12, name: "Player Twelve", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 13, name: "Player Thirteen", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
    { id: 14, name: "Player Fourteen", goals: 15, assists: 8, baseValue : 50, totalValue : 100, avatarUrl: defaultPFP },
    { id: 15, name: "Player Fifteen", goals: 10, assists: 5, baseValue : 30, totalValue : 60, avatarUrl: defaultPFP },
    { id: 16, name: "Player Sixteen", goals: 12, assists: 7, baseValue : 40, totalValue : 80, avatarUrl: defaultPFP },
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
                                    <th>Total Value</th>
                                </tr>
                            </thead>
                            
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
                                        <td className="font-semibold text-red-500 pl-7">{player.goals}</td>
                                        {/* Assists */}
                                        <td className="font-semibold text-amber-600 pl-7">{player.assists}</td>
                                        {/* Total Value */}
                                        <td className="font-semibold pl-5">${player.totalValue}M</td>
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
                    <h3 className="card-title justify-center text-lg font-bold text-red-500 mb-3">Top Scorer</h3>
                    {/* player avatar */}
                    <div className="avatar mx-auto mb-3">
                        <div className="mask mask-circle w-16 h-16">
                            <img src={topScorer.avatarUrl} alt={topScorer.name} />
                        </div>
                    </div>
                    {/* player name */}
                    <div className="text-base font-bold mb-2">{topScorer.name}</div>
                    {/* player goals - smaller text */}
                    <div className="text-xl font-bold text-red-500">{topScorer.goals} Goals</div>
                </div>
            </div>

            {/* Top Assist Card */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center p-4">
                    <h3 className="card-title justify-center text-lg font-bold text-amber-600 mb-3">Top Assist</h3>
                    {/* player avatar */}
                    <div className="avatar mx-auto mb-3">
                        <div className="mask mask-circle w-16 h-16">
                            <img src={topAssist.avatarUrl} alt={topAssist.name} />
                        </div>
                    </div>
                    {/* player name */}
                    <div className="text-base font-bold mb-2">{topAssist.name}</div>
                    {/* player assists */}
                    <div className="text-xl font-bold text-amber-600">{topAssist.assists} Assists</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Leaderboard;