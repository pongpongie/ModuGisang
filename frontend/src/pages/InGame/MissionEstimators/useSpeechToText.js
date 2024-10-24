import React, { useState, useEffect } from 'react';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const useSpeechToText = duration => {
  const [listening, setListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.warn('Browser dose not support speech recognition.');
      return;
    }
    SpeechRecognition.startListening({ continuous: true });
    setListening(true);

    const timer = setTimeout(() => {
      SpeechRecognition.stopListening();
      setListening(false);
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [duration]);

  const stop = () => {
    setListening(false);

    SpeechRecognition.stopListening();
  };

  return { transcript, listening, stop, resetTranscript };
};

export default useSpeechToText;
