import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [voice, setVoice] = useState(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleVoiceChange = (event) => {
        setVoice(event.target.value);
    };

    const handleSpeak = (event) => {
        event.preventDefault();
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        synth.speak(utterance);
        const audioBlob = new Blob([utterance], { type: 'audio/mpeg' });
        saveAs(audioBlob, 'audio.mp3');
    };

    return (
        <div>
            <form>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label>Select Voice</label>
                            <select value={voice} className="form-select" onChange={handleVoiceChange}>
                                <option value="en-US">US English Female</option>
                                <option value="en-GB">UK English Female</option>
                                <option value="de-DE">German Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <label>Enter Text</label>
                    <textarea type="text" className='form-control' value={text} onChange={handleTextChange} />
                </div>

                <button className='btn btn-primary mt-3' onClick={handleSpeak}>Speak and Download</button>
            </form>
        </div>
    );
};

export default TextToSpeech;
