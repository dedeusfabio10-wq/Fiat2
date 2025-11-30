import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIA_SACRA } from '../constants';
import { Button } from '../ui/UIComponents';
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const ViaSacraPage: React.FC = () => {
  const [currentStation, setCurrentStation] = useState(0);
  const navigate = useNavigate();
  const station = VIA_SACRA[currentStation];
  const handleNext = () => { if (currentStation < VIA_SACRA.length - 1) setCurrentStation(c => c + 1); else { alert('Via Sacra concluída.'); navigate('/'); } };
  const progress = ((currentStation + 1) / VIA_SACRA.length) * 100;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col">
      <SEO title="Via-Sacra Meditada – As 15 Estações da Paixão" description="Medite a Paixão de Jesus com texto completo das 15 estações da Via-Sacra." />
      <div className="flex items-center p-4 border-b border-stone-800 bg-stone-950/50 backdrop-blur-md sticky top-0 z-20"><button onClick={() => navigate('/')} className="p-2 mr-2 text-stone-400 hover:text-white"><ArrowLeft /></button><div><h1 className="text-lg font-serif text-purple-400">Via Sacra</h1><p className="text-xs text-stone-500 uppercase tracking-widest">Caminho da Cruz</p></div></div>
      <div className="h-72 bg-stone-900 relative w-full overflow-hidden shadow-inner group">
         <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent z-10"></div>
         <div className="absolute inset-0 opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" style={{ backgroundColor: currentStation % 2 === 0 ? '#4a0404' : '#2e1065', backgroundImage: `radial-gradient(circle at center, transparent 0%, #000 100%)` }}></div>
         <div className="absolute inset-0 flex items-center justify-center"><span className="font-serif text-9xl text-white/5 font-bold select-none">{station.id}</span></div>
         <div className="absolute bottom-6 left-6 right-6 z-20"><span className="bg-purple-900/80 px-3 py-1 rounded text-[10px] font-bold text-purple-200 uppercase tracking-widest mb-2 inline-block border border-purple-500/30">{station.title}</span><h2 className="text-2xl font-serif text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">{station.meditation}</h2></div>
      </div>
      <div className="flex-1 p-8 flex flex-col items-center text-center space-y-8 bg-gradient-to-b from-stone-950 to-[#0c0a09]">
         <div className="space-y-4 max-w-md animate-fade-in"><p className="font-serif text-stone-400 italic text-lg">"Nós vos adoramos, Senhor Jesus Cristo, e vos bendizemos."</p><p className="font-serif text-white font-medium">"Porque pela vossa Santa Cruz remistes o mundo."</p></div>
         <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-900 to-transparent"></div>
         <div className="text-sm leading-relaxed text-stone-300 max-w-md font-serif opacity-90">Contemplemos o Senhor nesta estação. Ofereça seu coração e suas dores em união com a Paixão de Cristo pela salvação das almas.</div>
      </div>
      <div className="p-6 border-t border-stone-800 bg-stone-950">
        <div className="flex items-center justify-between max-w-md mx-auto gap-4">
            <Button variant="outline" onClick={() => setCurrentStation(Math.max(0, currentStation - 1))} disabled={currentStation === 0} className="border-stone-800 text-stone-500 hover:text-stone-300 hover:bg-stone-900"><ChevronLeft /></Button>
            <div className="flex-1 text-center"><div className="text-[10px] text-stone-500 uppercase tracking-widest mb-2">Estação {currentStation + 1} / 15</div><div className="h-1 bg-stone-800 rounded-full overflow-hidden"><div className="h-full bg-purple-600 transition-all duration-500 shadow-[0_0_10px_purple]" style={{ width: `${progress}%` }}></div></div></div>
            <Button variant="primary" className="bg-purple-800 text-white hover:bg-purple-700 shadow-lg shadow-purple-900/20 border-none" onClick={handleNext}><ChevronRight /></Button>
        </div>
      </div>
    </div>
  );
};

export default ViaSacraPage;
