
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [phase, setPhase] = useState<'initial' | 'growing' | 'shrinking' | 'complete'>('initial');

  useEffect(() => {
    // Son de démarrage (son libre de droits)
    const playStartupSound = () => {
      try {
        // Création d'un son synthétique Netflix-like
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Première note (grave)
        const oscillator1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        oscillator1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);
        oscillator1.frequency.setValueAtTime(130.81, audioContext.currentTime); // C3
        oscillator1.type = 'sine';
        gainNode1.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode1.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
        gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        oscillator1.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 1.5);

        // Deuxième note (médium) - légèrement décalée
        setTimeout(() => {
          const oscillator2 = audioContext.createOscillator();
          const gainNode2 = audioContext.createGain();
          oscillator2.connect(gainNode2);
          gainNode2.connect(audioContext.destination);
          oscillator2.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
          oscillator2.type = 'sine';
          gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode2.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
          gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
          oscillator2.start(audioContext.currentTime);
          oscillator2.stop(audioContext.currentTime + 1.2);
        }, 200);

        // Troisième note (aigu) - finale
        setTimeout(() => {
          const oscillator3 = audioContext.createOscillator();
          const gainNode3 = audioContext.createGain();
          oscillator3.connect(gainNode3);
          gainNode3.connect(audioContext.destination);
          oscillator3.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          oscillator3.type = 'sine';
          gainNode3.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode3.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
          gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
          oscillator3.start(audioContext.currentTime);
          oscillator3.stop(audioContext.currentTime + 0.8);
        }, 400);
      } catch (error) {
        console.log('Audio non supporté ou bloqué');
      }
    };

    // Séquence d'animation
    const timer1 = setTimeout(() => {
      playStartupSound();
      setPhase('growing');
    }, 500);

    const timer2 = setTimeout(() => {
      setPhase('shrinking');
    }, 2500);

    const timer3 = setTimeout(() => {
      setPhase('complete');
      setTimeout(onLoadingComplete, 500);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-1000 ${
      phase === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-netflix-red/20 rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-netflix-red/15 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white/5 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Cercles animés */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`absolute rounded-full border border-netflix-red/20 transition-all duration-2000 ease-out ${
          phase === 'growing' ? 'w-96 h-96 opacity-100' : 'w-0 h-0 opacity-0'
        }`}></div>
        <div className={`absolute rounded-full border border-netflix-red/10 transition-all duration-2000 ease-out delay-300 ${
          phase === 'growing' ? 'w-[32rem] h-[32rem] opacity-100' : 'w-0 h-0 opacity-0'
        }`}></div>
        <div className={`absolute rounded-full border border-white/5 transition-all duration-2000 ease-out delay-500 ${
          phase === 'growing' ? 'w-[40rem] h-[40rem] opacity-100' : 'w-0 h-0 opacity-0'
        }`}></div>
      </div>

      {/* Logo principal */}
      <div className="flex items-center justify-center h-full relative z-10">
        <div className={`transition-all duration-1000 ease-out ${
          phase === 'initial' 
            ? 'opacity-0 scale-50 translate-y-8' 
            : phase === 'growing'
            ? 'opacity-100 scale-100 translate-y-0'
            : phase === 'shrinking'
            ? 'opacity-100 scale-75 translate-y-0'
            : 'opacity-100 scale-50 translate-y-0'
        }`}>
          <h1 className={`font-netflix font-bold tracking-wider text-white transition-all duration-1000 ease-out ${
            phase === 'initial' || phase === 'growing'
              ? 'text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem]'
              : phase === 'shrinking'
              ? 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl'
              : 'text-xl sm:text-2xl md:text-3xl'
          }`} style={{
            textShadow: '0 0 30px rgba(229, 9, 20, 0.5), 0 0 60px rgba(229, 9, 20, 0.3), 2px 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            KTA<span className="text-netflix-red">FLIX</span>
          </h1>
        </div>
      </div>
      
      {/* Effet de brillance */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-1000 ${
        phase === 'growing' ? 'translate-x-full opacity-100' : 'translate-x-[-100%] opacity-0'
      }`} style={{ transform: 'skewX(-20deg)' }}></div>

      {/* Overlay d'éclaircissement progressif */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 transition-opacity duration-1500 ${
        phase === 'initial' || phase === 'growing' ? 'opacity-100' : 'opacity-0'
      }`}></div>

      {/* Indicateur de chargement minimaliste */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`flex space-x-1 transition-opacity duration-500 ${
          phase === 'complete' ? 'opacity-0' : 'opacity-60'
        }`}>
          <div className="w-2 h-2 bg-netflix-red rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-netflix-red rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-netflix-red rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
