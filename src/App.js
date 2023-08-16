import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import AppProvider from './components/Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes >
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
          <AddRoomModal />
        </AppProvider>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
