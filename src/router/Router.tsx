import { Route, Routes } from 'react-router-dom';

import HomePage from '@/pages/home/HomePage';
import StudyRooms from '@/pages/study-room/StudyRooms';
import LoginPage from '@/pages/login/LoginPage';
import SignUpPage from '@/pages/signUp/SignUpPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import Planner from '@/pages/planner/Planner';
import PrivateStudyRoom from '@/pages/privateStudyRoom/PrivateStudyRoom';
import AllStatisticsPage from '@/pages/statistics/all/AllStatisticsPage';
import MyStatisticsPage from '@/pages/statistics/my/MyStatisticsPage';
import MultiStudyRoom from '@/pages/multiStudyRoom/MultiStudyRoom';
import Ranking from '@/pages/ranking/Ranking';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/study-rooms" element={<StudyRooms />} />
      <Route path="/statistics/all" element={<AllStatisticsPage />} />
      <Route path="/statistics/my" element={<MyStatisticsPage />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/study-room/:id" element={<PrivateStudyRoom />} />
      <Route path="/multi-study-room/:id" element={<MultiStudyRoom />} />
    </Routes>
  );
}
