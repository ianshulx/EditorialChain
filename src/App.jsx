import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DailyArticlePage from './pages/DailyArticlePage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CollaboratorPage from './pages/CollaboratorPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/article" element={<DailyArticlePage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/collaborators" element={<CollaboratorPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
