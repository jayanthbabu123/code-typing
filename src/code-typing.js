
import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import Dots from './3-dot';


//✅ ❌ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣

function CodeTyping() {
    const codeStyle = {
        'comment': {
            color: "green"
        },
        fontSize: '16px',
        height: '1300px',
        paddingLeft: '40px',
        paddingTop: '20px',
        paddingBottom: '150px'
    };
    const padding = '${padding}';
    const value = '${value}';
    const code = `
 /* Using separate CSS properties */
div {
  position: absolute;
  top: 50px;
  right: 100px;
  bottom: 50px;
  left: 100px;
  width: 200px;
  height: 200px;
}

/* "inset" shorthand property */
div {
  position: absolute;
  /* top, right, bottom, left */
  inset: 50px 100px 50px 100px; 
  width: 200px;
  height: 200px;
}
  `;
    const [selectedTheme, setSelectedTheme] = useState('dracula');
    const [selectedStyle, setSelectedStyle] = useState(prismStyles['dracula']);
    const [currentCode, setCurrentCode] = useState(``);
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < code.length) {
                setCurrentCode(prevCode => prevCode + code.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 80);
        return () => clearInterval(interval);
    }, [code]);

    const handleThemeChange = (event) => {
        const selectedThemeName = event.target.value;
        setSelectedTheme(selectedThemeName);
        setSelectedStyle(prismStyles[selectedThemeName]);
    };
    const themeOptions = Object.keys(prismStyles).map((themeName) => (
        <option key={themeName} value={themeName}>
            {themeName}
        </option>
    ));
    return (
        <div className="code-container mt-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Select a Theme</Form.Label>
                            <Form.Select onChange={handleThemeChange} value={selectedTheme}>
                                {themeOptions}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={12} >
                        <h4 className='snippet-title'>Margins & Padding Shorthand</h4>
                        <Dots />
                        <SyntaxHighlighter language="css" style={selectedStyle} customStyle={codeStyle}>
                            {currentCode}
                        </SyntaxHighlighter>
                        {/* <CodeEditor></CodeEditor> */}
                        {/* <ReactLiveEditor></ReactLiveEditor> */}
                        <span className="cursor"></span>
                    </Col>

                </Row>

            </Container>

        </div>
    );
}

export default CodeTyping;











