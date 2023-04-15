import React, { useState, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
function LiveEditor() {
  const [html, setHtml] = useState(`
<div id="box" class="box"></div>
<style>
    .box {
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
        top: 50px;
        left: 50px;
        cursor: move;
    }
</style>


<script>
    const box = document.getElementById("box");
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

box.addEventListener("mousedown", (event) => {
  isDragging = true;
  const { left, top } = box.getBoundingClientRect();
  dragOffset.x = event.clientX - left;
  dragOffset.y = event.clientY - top;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    box.style.left = (event.clientX - dragOffset.x) + "px";
    box.style.top = (event.clientY - dragOffset.y) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

</script>
</body>

`);
  const [css, setCss] = useState('h1 { color: red; }');
  const [js, setJs] = useState('console.log("Hello, World!");');
  const iframeRef = useRef(null);

  const executeCode = () => {

    const iframe = iframeRef.current;
    iframe.style.width = '50%';
    iframe.style.height = '100%';
    iframe.style.border = '3px dashed blue';
    iframe.style.marginLeft = '80px'
    document.body.appendChild(iframe);

    const documentContents = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
      </html>
    `;
    iframe.contentDocument.open();
    iframe.contentDocument.write(documentContents);
    iframe.contentDocument.close();
  };

  return (
    <div>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '45.33%', height: '100%', padding: '10px' }}>
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            customStyle={{ width: '100%', height: '100%' }}
            showLineNumbers
            wrapLines
            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            onChange={(e) => setHtml(e.target.value)}

          >{html}</SyntaxHighlighter>
        </div>

      </div>
      <button onClick={executeCode}>Execute</button>
      <div style={{ width: '100%', height: 'auto' }}>
        <iframe
          ref={iframeRef}
          style={{ width: '100%', height: '100%' }}
          sandbox="allow-scripts allow-same-origin"
          title="output"
        />
      </div>
    </div>
  );
}

export default LiveEditor;
