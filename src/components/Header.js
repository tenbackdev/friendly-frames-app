import React from 'react';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-gray-100 p-4 print:hidden">
      <header className="max-w-4xl mx-auto bg-indigo-600 rounded-lg shadow">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Friendly Frames</h2>
        </div>
      </header>
    </div>
  );
};

export default Header;