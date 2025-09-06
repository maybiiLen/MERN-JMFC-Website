import { Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePage.jsx'
import { admin } from './pages/admin.jsx'
import { Player } from './pages/Players.jsx'
import { Vods } from './pages/Vods.jsx' 
import { PlayerDetail } from './pages/PlayerDetail.jsx'

export const App = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#d80000_100%)]"></div>
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin' element={<admin />} />
        <Route path='/players' element={<Player />} />
        <Route path='/vods' element={<Vods />} />
        <Route path='/player/:id' element={<PlayerDetail />} />
      </Routes>
    </div>
  )
}
