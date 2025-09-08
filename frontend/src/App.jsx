import { Route, Routes } from 'react-router-dom'
import { HomePage } from './Pages/HomePage.jsx'
import { Player } from './pages/Players.jsx'
import { Vods } from './pages/Vods.jsx' 
import { Shops } from './pages/Shops.jsx'
import { PlayerDetail } from './pages/PlayerDetail.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Navbar from './components/Navbar.jsx'
import backgroundImage from './asset/background.jpg';

export const App = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with image and grid pattern */}
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-slate-950"
        style={{
          height: 'calc(100vh + 300px)',
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
            linear-gradient(to right, #4f4f4f2e 1px, transparent 1px),
            linear-gradient(to bottom, #4f4f4f2e 1px, transparent 1px),
            url(${backgroundImage})
          `,
          backgroundSize: 'cover, 14px 24px, 14px 24px, cover',
          backgroundPosition: 'center, 0 0, 0 0, center',
          backgroundRepeat: 'no-repeat, repeat, repeat, no-repeat'
        }}
      >
      </div>

      <Navbar />
      
              <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<Player />} />
          <Route path="/vods" element={<Vods />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/player/:playerId" element={<PlayerDetail />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
    </div>
  )
}
