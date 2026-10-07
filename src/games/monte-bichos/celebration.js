export function createCelebration({ sound, soundEnabled = true, revealBackground,
  createAudio = (url) => new Audio(url), schedule = setTimeout, cancel = clearTimeout }) {
  const audio = sound ? createAudio(sound) : null;
  let enabled = soundEnabled;
  let timer;
  let started = false;
  let disposed = false;
  let playing = false;
  let playbackId = 0;
  const release = () => { playing = false; };
  const cancelDelay = () => {
    if (timer !== undefined) cancel(timer);
    timer = undefined;
  };
  function playSound() {
    if (!started || disposed || !enabled || !audio || playing) return false;
    // Trava também enquanto play() ainda aguarda o início da reprodução.
    playing = true;
    const id = ++playbackId;
    cancelDelay();
    audio.currentTime = 0;
    audio.play().catch(() => { if (id === playbackId) release(); });
    return true;
  }
  if (audio) { audio.preload = 'auto'; audio.muted = !enabled; }
  audio?.addEventListener('ended', release);
  audio?.addEventListener('error', release);
  return {
    start() {
      if (started || disposed) return;
      started = true;
      revealBackground();
      if (audio && enabled) timer = schedule(() => {
        timer = undefined;
        playSound();
      }, 500);
    },
    playSound,
    setSoundEnabled(value) {
      enabled = value;
      if (audio) {
        audio.muted = !enabled;
        if (!enabled) {
          cancelDelay();
          playbackId++;
          release();
          audio.pause(); audio.currentTime = 0;
        }
      }
    },
    destroy() {
      disposed = true;
      cancelDelay();
      playbackId++;
      if (audio) {
        audio.removeEventListener('ended', release);
        audio.removeEventListener('error', release);
        audio.pause(); audio.removeAttribute('src'); audio.load();
      }
    },
  };
}
