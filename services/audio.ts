
// Simple Synth for Bell Sounds using Web Audio API
// This ensures offline capability without needing mp3 assets.

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    // Cross-browser support
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * Inicializa o contexto de áudio. Deve ser chamado em uma interação do usuário.
 */
export const initAudio = () => {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        // Play silent sound to unlock audio engine on iOS/Chrome
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0.001; // Quase mudo, só para "acordar"
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio init failed", e);
    }
};

export const playSoftBell = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Bell-like physics simulation
    // Primary tone (C5 - High pitch for beads)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); 

    // Envelope (Attack, Decay)
    // Fast attack (ding) -> Long decay (hum)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0); 

    // Lowpass filter to soften the sine wave (make it sound more "metallic" less "electronic")
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    // Connect graph
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
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Deeper tone for mysteries (C4)
    // Som mais solene e profundo
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(261.63, ctx.currentTime); 

    // Envelope (Attack, Decay)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1); // Ataque um pouco mais lento (Gong)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0); // Decay bem longo

    // Lowpass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    // Connect
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 4.5);
  } catch (e) {
    console.error("Mystery audio play failed", e);
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
  
  stopSpeech(); // Stop any current speech
  
  synthesis = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance(text);
  
  utterance.lang = 'pt-BR';
  utterance.rate = 0.9; // Slightly slower for prayer
  
  // Ensure voices are loaded
  if (voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
  }

  const ptVoices = voices.filter(v => v.lang.includes('pt') || v.lang.includes('BR'));
  let selectedVoice: SpeechSynthesisVoice | undefined;

  if (gender === 'female') {
    selectedVoice = ptVoices.find(v => 
      v.name.toLowerCase().includes('maria') || 
      v.name.toLowerCase().includes('luciana') || 
      v.name.toLowerCase().includes('joana') ||
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
