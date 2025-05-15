import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';  // Import the icon here
import './Landing.css';


function Landing() {
  const navigate = useNavigate();

  // If these states belong to a parent or context, you need to pass props or use context.
  // Otherwise, you can remove these calls or define states here.
  // For now, I'll remove them to avoid errors.

  return (
    <div className="landing-split dark-bg">
      <div className="landing-card dark-card">
        <h1 className="landing-title">
          <FaFileAlt style={{ color: "#4f8cff", marginRight: 14 }} />
          Why Plagiarism Matters
        </h1>
        <div className="gold-bar">Why this matters</div>
        <div className="why-text">
          Plagiarism can harm your academic and professional reputation.<br />
          Checking your work helps you stand out and build trust!
        </div>
        <div className="how-works-title">How it works</div>
        <ol className="how-works-list">
          <li>Click the <b>Check Plagiarism</b> button in the navbar.</li>
          <li>Upload your PDF or paste your text.</li>
          <li>Click <b>Check with AI</b> to scan for plagiarism.</li>
          <li>View your results and download the report.</li>
        </ol>
        <button
          className="big-check-btn"
          onClick={() => {
            // Removed setResult, setText, setPdfName calls as undefined
            navigate("/check");
          }}
        >
          Check Plagiarism Now
        </button>
        <div className="footer-warning dark-footer">
          Built with <span role="img" aria-label="heart">❤️</span> by Khushi | AI-powered
        </div>
      </div>
      <div className="landing-image-col">
        <img
          src={ process.env.PUBLIC_URL + "/Landing_page.png"}
          alt="Plagiarism illustration"
          className="landing-image"
        />
      </div>
    </div>
  );
}

export default Landing;
