
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Volume2, VolumeX, X, Share2, Crown, PenLine } from 'lucide-react';
import { Button, Input } from './UIComponents';
import { Mystery } from '../types';
import { playSoftBell, playMysteryBell, speakText, stopSpeech } from '../services/audio';
import { AppContext } from '../App';
import { toast } from 'sonner';
import { PRAYERS_TEXT } from '../constants';

const generateRosaryPoints = (radius: number, centerX: number, centerY: number) => {
  const points = [];
  const totalBeadsInLoop = 55; 
  
  for (let i = 0; i < totalBeadsInLoop; i++) {
    const angle = (i / totalBeadsInLoop) * 2 * Math.PI - Math.PI / 2; 
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const isLarge = i % 11 === 0;
    points.push({ x, y, isLarge, index: i, angle });
  }
  return points;
};

interface Step {
  type: string;
  text: string;
  sub: string;
  beadIndex: number;
  desc?: string;
  prayerText?: string;
}

const Rosary: React.FC<{ mystery: Mystery, onComplete: () => void, voice: 'female' | 'male' }> = ({ mystery, onComplete, voice }) => {
  const navigate = useNavigate();
  const { themeColors, profile, updateProfile } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [globalCount] = useState(() => Math.floor(1240000 + Math.random() * 5000));
  const [showDedication, setShowDedication] = useState(false);
  const [dedication, setDedication] = useState('');

  const steps: Step[] = [
    { type: 'intro', text: 'Sinal da Cruz', sub: 'Em nome do Pai...', beadIndex: -1, prayerText: 'Em nome do Pai, e do Filho e do Espírito Santo. Amém.' },
    { type: 'intro', text: 'Creio', sub: 'Creio em Deus Pai...', beadIndex: -2, prayerText: PRAYERS_TEXT.creio },
    { type: 'intro', text: 'Pai Nosso', sub: 'Pela intenção do Papa', beadIndex: -3, prayerText: PRAYERS_TEXT.paiNosso },
    { type: 'intro', text: 'Ave Maria', sub: 'Pelo aumento da Fé', beadIndex: -4, prayerText: PRAYERS_TEXT.aveMaria },
    { type: 'intro', text: 'Ave Maria', sub: 'Pelo aumento da Esperança', beadIndex: -5, prayerText: PRAYERS_TEXT.aveMaria },
    { type: 'intro', text: 'Ave Maria', sub: 'Pelo aumento da Caridade', beadIndex: -6, prayerText: PRAYERS_TEXT.aveMaria },
    { type: 'intro', text: 'Glória', sub: 'Glória ao Pai...', beadIndex: -7, prayerText: PRAYERS_TEXT.gloria },
  ];

  mystery.mysteries.forEach((decade, dIdx) => {
    steps.push({ 
      type: 'mystery', 
      text: `${dIdx + 1}º Mistério`, 
      sub: decade.title, 
      desc: decade.meditation, 
      beadIndex: -10,
      prayerText: `${dIdx + 1}º Mistério: ${decade.title}. ${decade.meditation}.`
    });
    
    steps.push({ type: 'large', text: 'Pai Nosso', sub: 'Pai Nosso que estais nos céus...', beadIndex: dIdx * 11, prayerText: PRAYERS_TEXT.paiNosso });
    
    for (let i = 0; i < 10; i++) {
      steps.push({ type: 'small', text: 'Ave Maria', sub: `Ave Maria (${i+1}/10)`, beadIndex: (dIdx * 11) + 1 + i, prayerText: PRAYERS_TEXT.aveMaria });
    }
    
    steps.push({ type: 'gloria', text: 'Glória', sub: 'Glória ao Pai...', beadIndex: (dIdx * 11) + 10, prayerText: PRAYERS_TEXT.gloria }); 
    steps.push({ type: 'jaculatoria', text: 'Ó Meu Jesus', sub: 'Perdoai-nos e livrai-nos...', beadIndex: -20, prayerText: PRAYERS_TEXT.ohJesus });
  });
  
  steps.push({ type: 'end', text: 'Salve Rainha', sub: 'Mãe de Misericórdia...', beadIndex: -99, prayerText: PRAYERS_TEXT.salveRainha });

  const current = steps[currentStep];
  const progress = (currentStep / (steps.length - 1)) * 100;
  const beads = generateRosaryPoints(120, 160, 160);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    if (isAutoPlay && !isCompleted) {
      const textToSpeak = current.prayerText || current.text;
      speakText(textToSpeak, voice, () => {
        setTimeout(() => {
           handleNext(true); 
        }, 1500);
      });
    } else {
      stopSpeech();
    }
  }, [isAutoPlay, currentStep, isCompleted, voice]);

  const handleToggleAudio = () => {
    if (!profile.is_premium) {
      toast.error("Voz Guiada disponível no Premium", {
        description: "Assine para ter o terço rezado em áudio.",
        icon: <Crown className="text-yellow-400" />
      });
      return;
    }
    setIsAutoPlay(!isAutoPlay);
  };

  const handleNext = (auto = false) => {
    if (!auto && isAutoPlay) setIsAutoPlay(false);
    if (navigator.vibrate) navigator.vibrate(50);
    
    // Lógica do Sino: Verifica o TIPO do passo ATUAL ou PRÓXIMO para decidir o som
    // Se o próximo passo for um Mistério, toca o sino solene.
    // Se for uma conta normal, toca o sino suave.
    
    const nextIndex = currentStep + 1;
    
    if (nextIndex < steps.length) {
      const nextType = steps[nextIndex].type;
      if (nextType === 'mystery' || nextType === 'end') {
         playMysteryBell();
      } else {
         playSoftBell();
      }
      setCurrentStep(p => p + 1);
    } else {
      playMysteryBell(); // Sino final
      setIsCompleted(true);
      setIsAutoPlay(false);
      updateProfile({ ...profile, rosaries_prayed: (profile.rosaries_prayed || 0) + 1 });
      onComplete();
    }
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    stopSpeech();
    if (currentStep > 0) setCurrentStep(p => p - 1);
  };

  if (isCompleted) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-sacred-sapphire relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           {Array.from({length: 50}).map((_, i) => (
             <div key={i} className="absolute w-2 h-2 bg-sacred-gold rounded-full animate-float" 
                  style={{ 
                    left: `${Math.random()*100}%`, 
                    bottom: `-20px`, 
                    animationDuration: `${3+Math.random()*5}s`,
                    opacity: Math.random(),
                    animationDelay: `${Math.random()*2}s`
                  }} 
             />
           ))}
        </div>

        <div className="text-center z-10 p-8 space-y-8 animate-fade-in max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-sacred-gold/20 blur-3xl rounded-full animate-pulse-slow"></div>
            <h1 className="text-3xl font-serif text-white mb-4 relative drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              Salve Maria!
            </h1>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-serif text-sacred-gold italic">
              "Obrigado por rezar comigo, alma devota."
            </p>
            <p className="text-gray-300 font-light">
              Que Nossa Senhora te cubra com seu santo manto e proteja seus caminhos.
            </p>
            {dedication && (
                <div className="bg-white/5 p-3 rounded-lg border border-sacred-gold/20 mt-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Sua Intenção</p>
                    <p className="text-white font-serif italic">"{dedication}"</p>
                </div>
            )}
          </div>

          <div className="py-6">
             <div className="bg-white/10 border border-sacred-gold/30 p-4 rounded-xl backdrop-blur-md">
                <p className="text-xs text-sacred-gold uppercase tracking-widest mb-1">Terço Global</p>
                <p className="text-2xl font-mono text-white">{(globalCount + 1).toLocaleString()}</p>
             </div>
          </div>

          <div className="flex gap-4 justify-center w-full">
            <Button onClick={() => navigate('/')} variant="outline" className="flex-1">Voltar</Button>
            <Button onClick={() => { 
               if(navigator.share) {
                 navigator.share({ 
                   title: 'Fiat - Oração', 
                   text: `Rezei o Santo Terço hoje com o app Fiat. Junte-se a mim em oração! 🙏✨` 
                 }).catch((err) => console.log('Share dismissed', err));
               } else {
                 toast.success('Link copiado para compartilhar!');
               }
            }} variant="sacred" className="flex-1 gap-2">
              <Share2 size={18} /> Compartilhar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] relative overflow-hidden">
      {showDedication && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-sacred-sapphire border border-sacred-gold p-6 rounded-xl w-full max-w-sm shadow-2xl">
                <h3 className="text-sacred-gold font-serif text-xl mb-4">Dedicação</h3>
                <Input 
                    placeholder="Por quem você reza hoje?" 
                    value={dedication}
                    onChange={(e) => setDedication(e.target.value)}
                    autoFocus
                />
                <div className="flex gap-2 mt-4">
                    <Button variant="ghost" className="flex-1" onClick={() => setShowDedication(false)}>Cancelar</Button>
                    <Button variant="sacred" className="flex-1" onClick={() => { toast.success('Intenção salva.'); setShowDedication(false); }}>Salvar</Button>
                </div>
            </div>
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-black opacity-80"></div>
      {isAutoPlay && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red] z-20" title="Gravando/Falando"></div>
      )}

      <div className="flex justify-between items-center p-4 z-10 relative">
        <Button variant="ghost" onClick={() => { stopSpeech(); navigate('/'); }} className="!p-2 hover:bg-white/10 rounded-full"><X size={24}/></Button>
        
        <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setShowDedication(true)} className={`!p-2 rounded-full transition-colors ${dedication ? 'text-sacred-gold bg-sacred-gold/10' : 'text-gray-400'}`}>
                <PenLine size={24} />
            </Button>
            <Button variant="ghost" onClick={handleToggleAudio} className={`!p-2 rounded-full transition-colors ${isAutoPlay ? 'bg-sacred-gold/20 text-sacred-gold' : 'text-gray-400'}`}>
            {isAutoPlay ? <Volume2 size={24}/> : <VolumeX size={24}/>}
            </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative w-[340px] h-[340px] mx-auto my-6">
          <svg width="340" height="340" viewBox="0 0 340 340" className="absolute inset-0 drop-shadow-2xl">
            <circle cx="170" cy="170" r="130" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            {beads.map((b, i) => {
               const isActive = current.beadIndex === b.index;
               const isPast = b.index < current.beadIndex;
               const isFuture = b.index > current.beadIndex;
               return (
                 <g key={i}>
                   <circle 
                     cx={b.x + 10} 
                     cy={b.y + 10}
                     r={b.isLarge ? (isActive ? 8 : 6) : (isActive ? 5 : 3)}
                     fill={isActive ? themeColors.primary : (isPast ? themeColors.primary : '#334155')}
                     opacity={isFuture ? 0.3 : 1}
                     className={`transition-all duration-500 ease-out ${isActive ? 'animate-pulse' : ''}`}
                     style={{ filter: isActive ? `drop-shadow(0 0 12px ${themeColors.primary})` : 'none' }}
                   />
                   {isActive && (
                     <circle cx={b.x+10} cy={b.y+10} r={12} fill="none" stroke={themeColors.primary} strokeWidth="1" className="animate-ping-slow opacity-50" />
                   )}
                 </g>
               );
            })}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center p-14 text-center flex-col z-20 pointer-events-none">
             {current.type === 'mystery' ? (
               <div className="animate-fade-in space-y-4">
                 <p className="text-sacred-gold text-xs uppercase tracking-[0.2em]">Mistério Atual</p>
                 <h2 className="text-xl font-serif text-white leading-snug drop-shadow-lg">{current.sub}</h2>
                 <p className="text-xs text-gray-300 leading-relaxed font-light">{current.desc}</p>
               </div>
             ) : (
               <div className="animate-fade-in">
                 <h2 className="text-3xl font-serif text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{current.text}</h2>
                 <p className="text-sm text-sacred-gold/80 font-serif italic">{current.sub}</p>
               </div>
             )}
          </div>
        </div>
        <div className="absolute inset-0 z-0" onClick={() => handleNext(false)}></div>
      </div>

      <div className="p-6 pb-12 z-20 w-full max-w-md mx-auto bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-center mb-4">
           <button onClick={handlePrev} className="p-4 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all disabled:opacity-20" disabled={currentStep===0}>
             <ChevronLeft size={24} className="text-gray-300" />
           </button>
           <div className="flex flex-col items-center gap-2 w-full px-6">
             <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden border border-white/5">
               <div className="h-full bg-gradient-to-r from-sacred-gold to-yellow-200 transition-all duration-500 ease-out shadow-[0_0_10px_#d4af37]" style={{ width: `${progress}%` }} />
             </div>
             <span className="text-[10px] text-gray-500 uppercase tracking-widest">{Math.round(progress)}% Concluído</span>
           </div>
           <button onClick={() => handleNext(false)} className="p-4 rounded-full bg-sacred-gold text-sacred-sapphire shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95 hover:scale-105 transition-all">
             <ChevronRight size={24} />
           </button>
        </div>
        <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest">Toque na tela para avançar</p>
      </div>
    </div>
  );
};

export default Rosary;
