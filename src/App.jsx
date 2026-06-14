import React, { useState, useCallback, createContext, useContext } from 'react';
import { useVerseStore } from './hooks/useVerseStore';
import { useAudio } from './hooks/useAudio';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import PlayerBar from './components/PlayerBar';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import LecturePage from './pages/LecturePage';
import SelectionPage from './pages/SelectionPage';
import LacunesPage from './pages/LacunesPage';
import RecitationPage from './pages/RecitationPage';
import FlashcardPage from './pages/FlashcardPage';
import NotesPage from './pages/NotesPage';
import DicteePage from './pages/DicteePage';

export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const verseStore = useVerseStore();
  const audio = useAudio();

  const navigate = useCallback((page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(`page-${page}`)?.scrollTo(0, 0);
    });
  }, []);

  const navigateToChapter = useCallback((num) => {
    setCurrentChapter(num);
    setCurrentPage('lecture');
    setSidebarOpen(false);
    requestAnimationFrame(() => {
      document.getElementById('page-lecture')?.scrollTo(0, 0);
    });
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);

  const ctx = {
    currentPage, currentChapter,
    navigate, navigateToChapter,
    sidebarOpen, toggleSidebar, closeSidebar,
    ...verseStore,
    ...audio,
  };

  return (
    <AppContext.Provider value={ctx}>
      {sidebarOpen && (
        <div id="sidebar-overlay" className="visible" onClick={closeSidebar} />
      )}
      <Sidebar />
      <div id="main">
        <Topbar />

        <div className={`page ${currentPage === 'home'       ? 'active' : ''}`} id="page-home">
          <HomePage />
        </div>
        <div className={`page ${currentPage === 'lecture'    ? 'active' : ''}`} id="page-lecture">
          <LecturePage />
        </div>
        <div className={`page ${currentPage === 'selection'  ? 'active' : ''}`} id="page-selection">
          <SelectionPage />
        </div>
        <div className={`page ${currentPage === 'flashcard'  ? 'active' : ''}`} id="page-flashcard">
          <FlashcardPage />
        </div>
        <div className={`page ${currentPage === 'lacunes'    ? 'active' : ''}`} id="page-lacunes">
          <LacunesPage />
        </div>
        <div className={`page ${currentPage === 'recitation' ? 'active' : ''}`} id="page-recitation">
          <RecitationPage />
        </div>
        <div className={`page ${currentPage === 'notes'      ? 'active' : ''}`} id="page-notes">
          <NotesPage />
        </div>
        <div className={`page ${currentPage === 'dictee'     ? 'active' : ''}`} id="page-dictee">
          <DicteePage />
        </div>
      </div>

      <PlayerBar />
      <BottomNav />
    </AppContext.Provider>
  );
}
