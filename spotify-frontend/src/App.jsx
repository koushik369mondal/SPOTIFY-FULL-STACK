import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import QueueDrawer from './components/QueueDrawer';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-[#06080e] flex flex-col font-sans select-none'>
      {/* Ambient Aurora Glow Orbs */}
      <div className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

      {/* Main Workspace */}
      <div className='flex-1 flex overflow-hidden p-2 gap-2 relative z-10'>
        <Sidebar />
        <Display />
      </div>

      {/* Bottom Floating Glass Player */}
      <div className="relative z-20 px-2 pb-2">
        <Player />
      </div>

      {/* Queue Drawer overlay */}
      <QueueDrawer />

      {/* Persistent HTML Audio element */}
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload='auto'
      />
    </div>
  );
};

export default App;
