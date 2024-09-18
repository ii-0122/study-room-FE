import { Route, Routes } from 'react-router-dom';

import StudyRooms from '@/pages/study-room/StudyRooms';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import Planner from '@/pages/planner/Planner';

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/planner" element={<Planner />}></Route>
      <Route path="/study-rooms" element={<StudyRooms />}></Route>
    </Routes>
  );
}
