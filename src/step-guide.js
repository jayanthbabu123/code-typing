import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';
import './step-guide.css';

function StepGuide({ snippets }) {
    const [steps, setSteps] = useState(snippets.steps);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [currentCode, setCurrentCode] = useState('');

    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < currentStep.code.length) {
                setCurrentCode(prevCode => prevCode + currentStep.code.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 70);
        return () => clearInterval(interval);
    }, [currentStep]);

    const newStepClassName = currentStepIndex > completedSteps.length ? 'new-step' : '';

    const handleNextStep = () => {
        setCompletedSteps(prevSteps => [...prevSteps, currentStep]);
        setCurrentStepIndex(prevIndex => prevIndex + 1);
        setCurrentCode('');
    };

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h4 className='page-heading'>{snippets.concept}</h4>
                </div>
            </div>
            <div className="steps">
                {completedSteps.map((step, index) => (
                    <div key={index} className="completed-step mb-4">
                        <span className='step-name'>{step.name}: </span><span>{step.description}</span>
                        <SyntaxHighlighter language={step.language} style={dracula}>
                            {step.code}
                        </SyntaxHighlighter>
                    </div>
                ))}
                <div className={`current-step ${newStepClassName}`}>
                    <span className='step-name'>{currentStep.name}: </span><span>{currentStep.description}</span>
                    <SyntaxHighlighter language={currentStep.language} style={dracula}>
                        {currentCode}
                    </SyntaxHighlighter>
                </div>
            </div>
            {currentStepIndex < steps.length - 1 ? (
                <div className='text-center'><button className='btn btn-primary' onClick={handleNextStep}>Next Step</button></div>
            ) : <div className='text-success my-5 text-center'>All the steps are completed. Just go and implement it</div>}
        </div>
    );
}

export default StepGuide;
