
import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import ScreenRecorderComponent from './screen-recorder'
import TextToSpeech from './speech';
import ReactSpeech from './react-speech';
function App() {
  const codeStyle = {
    fontSize: '15px',
    height: '800px',
    paddingLeft: '100px',
    paddingTop: '20px' // set the font size to 16px
  };
  const code = `
 const height = 5; // Height of the triangle

for (let i = 0; i < height; i++) {
  let row = '';
  for (let j = 0; j < height - i - 1; j++) {
    // Add spaces to left-align the triangle
    row += ' '; 
  }
  for (let k = 0; k < 2 * i + 1; k++) {
    // Add asterisks to form the triangle
    row += '*'; 
  }
  console.log(row); // Print the row
}
// output
    *
   ***
  *****
 *******
*********

  `;
  const [selectedTheme, setSelectedTheme] = useState('oneLight');
  const [selectedStyle, setSelectedStyle] = useState(prismStyles['oneLight']);
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
    }, 130);
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
        {/* <ReactSpeech></ReactSpeech>
        <TextToSpeech></TextToSpeech> */}
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
            <SyntaxHighlighter language="javascript" style={selectedStyle} customStyle={codeStyle}>
              {currentCode}
            </SyntaxHighlighter>

            <span className="cursor"></span>
          </Col>

        </Row>

      </Container>

    </div>
  );
}

export default App;


navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Send the location to the Nominatim API
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error);
    });
}, error => {
  console.log(error);
});




