import { useState, useEffect } from 'react';

const SpeechToTextConverter = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [count, setCount] = useState(0);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionInstance = recognition ? new recognition() : null;


  useEffect(() => {
    if (transcript.toLowerCase() === 'increment') {
      setCount((prevCount) => prevCount + 1);
    } else if (transcript.toLowerCase() === 'decrement') {
      setCount((prevCount) => prevCount - 1);
    }
  }, [transcript]);

  if (!recognitionInstance) {
    console.error('SpeechRecognition API not supported in this browser.');
    return null;
  }

  recognitionInstance.lang = 'en-US';
  recognitionInstance.interimResults = false;
  recognitionInstance.maxAlternatives = 1;

  recognitionInstance.onresult = (event) => {
    const result = event.results[0][0].transcript;
    const cleanedTranscript = result.replace(/[^\w\s]/gi, '');
    setTranscript(cleanedTranscript);
  };

  const toggleListening = () => {
    if (listening) {
      recognitionInstance.stop();
    } else {
      recognitionInstance.start();
    }
    setListening(!listening);
  };

  return (
    <div>
      <h1>Speech to Text Converter</h1>
      <p>Count: {count}</p>
      <button onClick={toggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}
      </p>
    </div>
  );
};

export default SpeechToTextConverter;
