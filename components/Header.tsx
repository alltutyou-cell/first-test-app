
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, showBack, onBack }) => {
  return (
    <header className="p-6 flex items-center justify-between sticky top-0 bg-[#F5F2ED]/80 backdrop-blur-sm z-[60]">
      {showBack ? (
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      ) : (
        <div className="w-10 h-10"></div>
      )}
      
      <button onClick={onLogoClick} className="text-xl font-bold tracking-tight">
        LUMINA<span className="text-gray-400">.</span>
      </button>

      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/></svg>
      </button>
    </header>
  );
};

export default Header;
