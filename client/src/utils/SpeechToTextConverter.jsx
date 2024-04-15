import { useState, useEffect } from "react";

function SpeechToTextConverter({ onCommand, ...props }) {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionInstance = recognition ? new recognition() : null;

  useEffect(() => {
    if (transcript) {
      onCommand(transcript);
    }
  }, [transcript, onCommand]);

  if (!recognitionInstance) {
    console.error("SpeechRecognition API not supported in this browser.");
    return null;
  }

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognitionInstance.onresult = (event) => {
    const result = event.results[0][0].transcript;
    const cleanedTranscript = result.replace(/[^\w\s]/gi, "");
    setTranscript(cleanedTranscript);
  };

  recognitionInstance.onend = () => {
    setListening(false); // Set to false when recognition becomes inactive
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
    <button onClick={toggleListening} {...props}>
      {listening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}

export default SpeechToTextConverter;
