import React, { useState, useEffect } from 'react';

function App() {
    const [text, setText] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        // Fetch the list of voices when the component mounts
        setVoices(window.speechSynthesis.getVoices());

        // Update the list of voices when the voices change
        window.speechSynthesis.onvoiceschanged = () => {
            setVoices(window.speechSynthesis.getVoices());
        };
    }, []);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleVoiceChange = (event) => {
        setSelectedVoice(voices.find(voice => voice.name === event.target.value));
    };

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        window.speechSynthesis.speak(utterance);
    };

    const handleDownload = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        const audioUrl = URL.createObjectURL(new Blob([text], { type: 'audio/wav' }));
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'audio.wav';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <textarea value={text} onChange={handleTextChange} />
            <select value={selectedVoice ? selectedVoice.name : ''} onChange={handleVoiceChange}>
                <option value="">Select a voice...</option>
                {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                    </option>
                ))}
            </select>
            <button onClick={handleSpeak}>Speak</button>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
}

export default App;
