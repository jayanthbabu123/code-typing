import StepGuide from './step-guide';
import 'bootstrap/dist/css/bootstrap.min.css';
const snippets = {
  concept: 'How to download web pages as pdf in react',
  steps: [
    {
      name: 'Step 1',
      description: 'Install the html2canvas and jsPDF libraries:',
      code: `  npm install html2canvas jspdf`,
      language: 'bash'
    },
    {
      name: 'Step 2',
      description: 'Import the libraries in your React component:',
      code: `  import html2canvas from 'html2canvas';
 import jsPDF from 'jspdf';`,
      language: 'javascript'
    },
    {
      name: 'Step 3',
      description: `Create template that you want to download and attach ref to it`,
      code: ` // create a ref by importing useRef from react
const pdfRef = useRef();

// add the content here
<div ref={pdfRef}>
  // your pdf content here
</div>`,
      language: 'javascript'
    },
    {
      name: 'Step 4',
      description: `Add a button or link in your component's JSX that will trigger the PDF download: `,
      code: ` <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>`,
      language: 'xml'
    },
    {
      name: 'Step 5',
      description: ` Write a function that will handle the PDF download when the button is clicked:`,
      code: ` const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');
    });
  };`,
      language: 'javascript'
    },

  ],
}
const snippets1 = {
  concept: "HTML5 Semantic Elements",
  steps: [
    {
      name: '1',
      description: "Traditional approach - Without Semantic Elements",
      code: `
 <div class="header">
  <h1>My Website</h1>
  <ul class="nav">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
  </ul>
</div>

<div class="content">
  <div class="section">
    <h2>Section 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</div>

<div class="sidebar">
  <h3>Related Articles</h3>
  <ul>
    <li><a href="#">Article 1</a></li>
    <li><a href="#">Article 2</a></li>
  </ul>
</div>

<div class="footer">
  <p>&copy; 2023 My Website</p>
</div>

            `,
      language: 'html'
    },
    {
      name: '2',
      description: "With Semantic Elements",
      code: `
 <header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h2>Section 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </section>
  <aside>
    <h3>Related Articles</h3>
    <ul>
      <li><a href="#">Article 1</a></li>
      <li><a href="#">Article 2</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2023 My Website</p>
</footer>

            `,
      language: 'html'
    }
  ]
}
  ;

const CodeDisplay = () => {
  return (
    <div className='main-container'>
      <StepGuide snippets={snippets} />
    </div>
  );
};

export default CodeDisplay;
