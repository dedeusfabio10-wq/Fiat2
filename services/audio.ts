
// Simple Synth for Bell Sounds using Web Audio API
// This ensures offline capability without needing mp3 assets.

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    // Cross-browser support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

/**
 * Inicializa o contexto de áudio. Deve ser chamado em uma interação do usuário (clique).
 */
export const initAudio = () => {
    try {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume();
        }
        // Toca um oscilador mudo para desbloquear o motor de áudio no iOS/Chrome
        if (ctx) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            gain.gain.value = 0.001; 
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        }
    } catch (e) {
        console.error("Audio init failed", e);
    }
};

export const playSoftBell = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Bell-like physics simulation
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); 

    // Envelope (Attack, Decay)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0); 

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 2.5);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export const playMysteryBell = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Deeper tone for mysteries (C4)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(261.63, ctx.currentTime); 

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0); 

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 4.5);
  } catch (e) {
    console.error("Mystery audio play failed", e);
  }
};

/**
 * Toca um "Acorde Celestial" puramente sintético.
 * Não depende de arquivos mp3 externos, garantindo funcionamento na Vercel.
 */
export const playSacredIntro = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const playChord = () => {
        const now = ctx.currentTime;
        const duration = 4.0;
        
        // Acorde Dó Maior com 7ª e 9ª (Cmaj9) - Frequências Etéreas
        const frequencies = [261.63, 329.63, 392.00, 493.88, 587.33];
        
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.1, now + 1.0); // Fade in suave
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration); // Fade out longo
        masterGain.connect(ctx.destination);

        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            // Mistura sine e triangle para textura rica
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            
            // Leve detune para efeito de "coro"
            const detune = (Math.random() * 10) - 5;
            osc.detune.setValueAtTime(detune, now);
            
            osc.connect(masterGain);
            osc.start(now);
            osc.stop(now + duration + 1);
        });
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(playChord);
    } else {
      playChord();
    }

  } catch (e) {
    console.error("Intro audio failed", e);
  }
};

// Web Speech API for Premium Voice
let synthesis: SpeechSynthesis | null = null;
let utterance: SpeechSynthesisUtterance | null = null;
let voices: SpeechSynthesisVoice[] = [];

if ('speechSynthesis' in window) {
    const loadVoices = () => {
      voices = window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}

export const speakText = (text: string, gender: 'female' | 'male' = 'female', onEnd?: () => void) => {
  if (!('speechSynthesis' in window)) {
      if(onEnd) onEnd();
      return;
  }
  
  stopSpeech(); 
  
  synthesis = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.9; 
  
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }

  // Tenta encontrar vozes brasileiras de qualidade
  const ptVoices = voices.filter(v => v.lang.includes('pt') || v.lang.includes('BR'));
  let selectedVoice: SpeechSynthesisVoice | undefined;

  if (gender === 'female') {
    selectedVoice = ptVoices.find(v => 
      v.name.toLowerCase().includes('maria') || 
      v.name.toLowerCase().includes('luciana') ||
      v.name.includes('Google Português')
    );
     utterance.pitch = selectedVoice ? 1.0 : 1.1;
  } else {
    selectedVoice = ptVoices.find(v => 
      v.name.toLowerCase().includes('daniel') || 
      v.name.toLowerCase().includes('felipe')
    );
    utterance.pitch = selectedVoice ? 1.0 : 0.8;
  }
  
  if (selectedVoice) {
      utterance.voice = selectedVoice;
  }
  
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  
  utterance.onerror = (e) => {
      console.warn("TTS error", e);
      if (onEnd) onEnd();
  };

  try {
    synthesis.speak(utterance);
  } catch (e) {
    console.error("TTS Speak failed", e);
    if (onEnd) onEnd();
  }
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};