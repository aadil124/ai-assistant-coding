import { useState, useEffect } from 'react';

/**
 * Reusable hook to manage WebRTC connection states, audio, video and screen share triggers.
 */
export function useWebRTC(channelId) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState('Excellent');
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoStopped, setVideoStopped] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!channelId) return;

    // Simulate WebRTC connection establishment delay
    setIsConnected(true);
    logEvent('RTC_CONNECTION_ESTABLISHED', { channelId });

    // Simulate occasional connection quality adjustments
    const interval = setInterval(() => {
      const qualities = ['Excellent', 'Good', 'Fair', 'Poor'];
      const randomQual = qualities[Math.floor(Math.random() * qualities.length)];
      setConnectionQuality((prev) => {
        if (prev !== randomQual) {
          logEvent('RTC_CONNECTION_QUALITY_CHANGED', { quality: randomQual });
        }
        return randomQual;
      });
    }, 15000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
      logEvent('RTC_CONNECTION_CLOSED', { channelId });
    };
  }, [channelId]);

  const logEvent = (type, payload = {}) => {
    setEvents((prev) => [
      ...prev,
      { type, timestamp: new Date().toLocaleTimeString(), payload }
    ]);
  };

  const toggleAudio = () => {
    setAudioMuted((prev) => {
      const newState = !prev;
      logEvent(newState ? 'AUDIO_MUTED' : 'AUDIO_UNMUTED');
      return newState;
    });
  };

  const toggleVideo = () => {
    setVideoStopped((prev) => {
      const newState = !prev;
      logEvent(newState ? 'VIDEO_STOPPED' : 'VIDEO_STARTED');
      return newState;
    });
  };

  const toggleScreenShare = () => {
    setIsSharingScreen((prev) => {
      const newState = !prev;
      logEvent(newState ? 'SCREEN_SHARE_ON' : 'SCREEN_SHARE_OFF');
      return newState;
    });
  };

  return {
    isConnected,
    connectionQuality,
    audioMuted,
    videoStopped,
    isSharingScreen,
    events,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    logEvent
  };
}
