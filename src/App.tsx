import React from 'react';
import AppBar from './AppBar';
import Home from './pages/Home';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none z-20">
          <AppBar />
        </div>
      )}
      <div className="relative flex-auto">
        <Home />
      </div>
    </div>
  );
}

export default App;
