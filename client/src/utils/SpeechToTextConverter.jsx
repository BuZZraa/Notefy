import { useState, useEffect } from "react";

function SpeechToTextConverter({ onCommand, ...props }) {
  const [listening, setListening] = useState(false);
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionInstance = recognition ? new recognition() : null;

  useEffect(() => {
    if (listening) {
      recognitionInstance.start();
    } else {
      recognitionInstance.stop();
    }

    recognitionInstance.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const cleanedTranscript = result.replace(/[^\w\s]/gi, "");
      onCommand(cleanedTranscript);
    };

    recognitionInstance.onend = () => {
      // Set listening to false when recognition becomes inactive
      setListening(false);
    };

    return () => {
      recognitionInstance.stop();
    };
  }, [listening, onCommand, recognitionInstance]);

  if (!recognitionInstance) {
    console.error("SpeechRecognition API not supported in this browser.");
    return null;
  }

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const toggleListening = () => {
    setListening((prevState) => !prevState);
  };

  return (
    <button onClick={toggleListening} {...props}>
      {listening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}

export default SpeechToTextConverter;
