import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";

import { motion } from 'framer-motion';
import { FaFilePdf, FaFileAlt} from 'react-icons/fa';
import Landing from './components/Landing';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Set correct path for worker (especially if app is hosted in a subfolder)
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;




function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const textAreaRef = useRef(null);
  

  // For drag & drop
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  // Routing
  const navigate = useNavigate();

  // Extract text from PDF
  const extractTextFromPDF = async (pdfFile) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(pdfFile);
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let textContent = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        textContent += pageText + ' ';
      }
      setText(textContent);
    };
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setPdfName(file.name);
      extractTextFromPDF(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  const handleFileInput = (e) => {
    handleFile(e.target.files[0]);
  };

  // Scroll progress bar
  const handleScroll = () => {
    const textarea = textAreaRef.current;
    if (!textarea) return;
    const scrollHeightDiff = textarea.scrollHeight - textarea.clientHeight;
    if (scrollHeightDiff === 0) {
      setScrollProgress(0);
      return;
    }
    const progress = (textarea.scrollTop / scrollHeightDiff) * 100;
    setScrollProgress(progress);
  };

  // Check plagiarism
  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://plag-checker-app.onrender.com/api/check', { text });
      setResult(res.data);
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Save as text
  const handleSaveAsText = () => {
    if (!result) return;
    const report = `Plagiarism Report\n------------------\nText:\n${text}\n\nResult:\n${result.percentage}% plagiarized\nMessage: ${result.message}`;
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    saveAs(blob, 'plagiarism-report.txt');
  };

  // Save as PDF
  const handleSaveAsPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("📄 Plagiarism Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Text:\n${text}`, 20, 30);
    doc.text(`\nResult:`, 20, 50);
    doc.text(`Plagiarism: ${result.percentage}%`, 20, 60);
    doc.text(`Message: ${result.message}`, 20, 70);
    doc.text("\nNote: This tool is for educational purposes only. Please cite your sources.", 20, 100);
    doc.save('plagiarism-report.pdf');
  };

  

  // Result badge color
  const getResultClass = (percentage) => {
    if (percentage < 10) return 'result-minimal';
    if (percentage < 50) return 'result-medium';
    return 'result-high';
  };

  // Main checker split layout
  const mainChecker = (
    <div className="checker-split-wrapper">
      <div className="checker-input-col">
        <h2 className="checker-title"><FaFileAlt style={{marginRight:8}}/>Plagiarism Checker</h2>
        <div className="drop-upload-wrapper">
          <label
            className={`drop-upload-btn${dragActive ? " drag-active" : ""}`}
            htmlFor="file-upload"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            tabIndex={0}
            aria-label="Upload PDF"
          >
            <FaFilePdf size={22} style={{ marginRight: 8 }} />
            <span>Upload PDF</span>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={handleFileInput}
              tabIndex={-1}
            />
          </label>
          <div className="drop-upload-hint">or drag &amp; drop PDF here</div>
          <div className="file-name">{pdfName ? pdfName : "No file chosen"}</div>
        </div>
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
        <textarea
          className="text-preview"
          ref={textAreaRef}
          rows="10"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={handleScroll}
        />
        <div className="word-count">
          Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}
        </div>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 4px 24px #4f8cff44" }}
          whileTap={{ scale: 0.98 }}
          animate={loading ? { scale: [1, 1.05, 1], boxShadow: "0 0 0 4px #4f8cff33" } : {}}
          transition={{ duration: 0.4, repeat: loading ? Infinity : 0 }}
          className="check-btn"
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? "Checking..." : <>Check with AI <span role="img" aria-label="search">🔍</span></>}
        </motion.button>
      </div>
      <div className="checker-result-col">
        {result ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className={`result-glass-card ${getResultClass(result.percentage)}`}
          >
            <h2 className="result-title">Result:</h2>
            <div className="result-row">
              <span className="result-label">Plagiarism:</span>
              <span className="result-value">{result.percentage}%</span>
            </div>
            <div className="result-message">{result.message}</div>
            <div className="save-share-row" style={{ marginTop: 12 }}>
              <button className="icon-btn" onClick={handleSaveAsText} title="Save as Text">
                <span role="img" aria-label="save">💾</span> Save as Text
              </button>
              <button className="icon-btn" onClick={handleSaveAsPDF} title="Save as PDF">
                <span role="img" aria-label="pdf">📄</span> Save as PDF
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="result-placeholder">
            <span role="img" aria-label="search" style={{fontSize: '2em'}}>🔍</span>
            <div>Results will appear here after you check plagiarism.</div>
          </div>
        )}
        <div className="ai-emoji-block">
  {result && (
    <img
      src={
        result.percentage < 10
          ? process.env.PUBLIC_URL + "/Happy.png"
          : result.percentage < 50
          ? process.env.PUBLIC_URL + "/Neutral.png"
          : process.env.PUBLIC_URL + "/Sad.png"
      }
      alt={
        result.percentage < 10
          ? "Happy AI Emoji"
          : result.percentage < 50
          ? "Neutral AI Emoji"
          : "Sad AI Emoji"
      }
      className="ai-emoji-img"
    />
  )}
  {result && (
    <div className="ai-emoji-caption">
      {result.percentage < 10
        ? "Great job! Your work is original 🎉"
        : result.percentage < 50
        ? "Not bad! Try to improve originality 😊"
        : "Oops! High plagiarism detected 😢"}
    </div>
  )}
</div>
        <footer className="footer-warning">
          <span role="img" aria-label="warning">🚨</span>
          This tool is for educational use only. Please cite your sources to avoid plagiarism.
          <br />
          <span role="img" aria-label="lock">🔐</span> Built with ❤️ by Khushi | AI-powered ✨
        </footer>
      </div>
      

    </div>
  );

  // Navbar
  const Navbar = () => (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaFileAlt style={{ color: "#2355d8", marginRight: 4 }} />
        <span className="navbar-title">Plagiarism Pro</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
            Why Plagiarism Matters
          </NavLink>
        </li>
        <li>
          <NavLink to="/check" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Check Plagiarism
          </NavLink>
        </li>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
  About
</NavLink>

      </ul>
    </nav>
  );

 
  function About() {
    return (
      <div className="about-page">
        <h1>About</h1>
        <p>
          This plagiarism checker was built by <b>Khushi</b> for Hackathon 2025.<br />
          It helps you check originality and improve your writing.<br /><br />
          <b>Why this matters:</b><br />
          Original writing is essential for academic and professional success. Plagiarism can harm your reputation and opportunities. Use this tool to ensure your work is unique and stands out on your resume or application!
        </p>
      </div>
    );
  }
  
  
  

  return (
    <>
      <Navbar />
      
      <Routes>
          <Route path="/" element={<Landing />} />
        <Route path="/check" element={mainChecker} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
