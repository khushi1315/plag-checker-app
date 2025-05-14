html, body {
    background: linear-gradient(120deg, #23235b 0%, #4f8cff 100%);
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Poppins', sans-serif;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  
  .navbar {
    width: 100%;
    background: rgba(36, 34, 73, 0.97);
    box-shadow: 0 2px 12px rgba(60,72,88,0.10);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 24px 40px;
    box-sizing: border-box;
  }
  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .navbar-title {
    font-size: 1.4rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: 0.5px;
  }
  .navbar-links {
    list-style: none;
    display: flex;
    gap: 24px;
    margin: 0;
    padding: 0;
    align-items: center;
  }
  .nav-link {
    text-decoration: none !important;
    color: #b3cfff !important;
    font-weight: 700;
    font-size: 1.08rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px 24px;
    border-radius: 8px;
    transition: background 0.2s, color 0.2s;
    outline: none;
    display: inline-block;
  }
  .nav-link.active, .nav-link:hover, .nav-link:focus {
    background: #4f8cff !important;
    color: #fff !important;
    text-decoration: none !important;
  }
  .nav-about-btn {
    border: 1.5px solid #4f8cff;
    background: #23235b;
    color: #b3cfff !important;
    margin-left: 6px;
    min-width: 70px;
    font-weight: 700;
  }
  .nav-about-btn:hover {
    background: #4f8cff;
    color: #fff !important;
  }
  
  .landing-split {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 48px;
    max-width: 1200px;
    margin: 64px auto 0 auto;
    width: 100%;
    min-height: 60vh;
    box-sizing: border-box;
  }
  
  .landing-card {
    border-radius: 28px;
    box-shadow: 0 8px 40px rgba(60, 72, 88, 0.20);
    padding: 38px 32px 28px 32px;
    max-width: 480px;
    min-width: 320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 22px;
    background: #fff;
  }
  
  .dark-card {
    background: linear-gradient(120deg, #1d1d3a 0%, #23235b 100%);
    color: #fff;
    position: relative;
    border-radius: 28px;
    border: 1.5px solid #23235b;
    box-shadow: 0 8px 40px 0 rgba(60,72,88,0.30);
  }
  
  .landing-title {
    font-size: 2.5em;
    font-weight: 900;
    color: #fff;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    letter-spacing: 0.5px;
  }
  
  .gold-bar {
    background: linear-gradient(90deg, #ffe082 0%, #ffb300 100%);
    color: #232946;
    font-weight: 900;
    font-size: 1.18em;
    border-radius: 12px;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px #ffb30022;
  }
  
  .why-text {
    font-size: 1.18em;
    color: #fff;
    margin-bottom: 18px;
  }
  
  .how-works-title {
    color: #ffe082;
    font-weight: 800;
    font-size: 1.15em;
    margin-bottom: 8px;
    margin-top: 18px;
  }
  
  .how-works-list {
    color: #fff;
    font-size: 1.1em;
    margin: 0 0 18px 22px;
  }
  
  .big-check-btn {
    margin: 24px auto 0 auto;
    font-size: 1.22rem;
    padding: 18px 42px;
    font-weight: 900;
    border-radius: 14px;
    box-shadow: 0 4px 24px #4f8cff22;
    background: linear-gradient(90deg, #4f8cff, #2355d8);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    letter-spacing: 0.5px;
  }
  .big-check-btn:hover {
    background: linear-gradient(90deg, #2355d8, #4f8cff);
  }
  
  .right-card {
    background: linear-gradient(120deg, #ffeccb 70%, #fffbe6 100%);
    color: #232946;
    align-items: center;
    justify-content: flex-start;
    min-height: 420px;
    box-shadow: 0 8px 40px rgba(60, 72, 88, 0.18);
    position: relative;
    padding-top: 38px;
    padding-bottom: 32px;
    border-radius: 28px;
    border: 1.5px solid #ffe082;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  
  .checker-title {
    font-size: 1.5em;
    font-weight: 800;
    color: #232946;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    text-align: center;
  }
  
  .checker-desc {
    color: #232946;
    font-size: 1.08em;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .landing-image {
    width: 100%;
    max-width: 220px;
    margin: 20px auto 0 auto;
    display: block;
    border-radius: 16px;
    box-shadow: 0 4px 24px #4f8cff22;
    background: #fff;
    object-fit: contain;
  }
  
  /* FOOTER */
  .footer-warning {
    background: rgba(255, 80, 80, 0.13);
    color: #ffb3b3;
    border-radius: 10px;
    padding: 12px 18px;
    margin-top: 28px;
    font-size: 1.05rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-weight: 700;
    box-shadow: 0 2px 8px #0001;
    border: 1.5px solid #ffb3b3;
  }
  .dark-footer {
    background: rgba(80, 80, 120, 0.22);
    color: #ffb3b3;
    margin-top: 36px;
    font-size: 1.06em;
    font-weight: 800;
    box-shadow: 0 2px 8px #0001;
    border: none;
  }
  .main-footer {
    max-width: 900px;
    margin: 40px auto 0 auto;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  
  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .landing-split {
      flex-direction: column;
      align-items: center;
      gap: 32px;
      max-width: 98vw;
      margin-top: 32px;
    }
    .landing-card, .dark-card {
      max-width: 98vw;
      min-width: 0;
    }
    .landing-image {
      max-width: 180px;
    }
    .main-footer {
      margin: 32px auto 0 auto;
    }
  }
  @media (max-width: 700px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 4vw;
      gap: 8px;
    }
    .navbar-links {
      gap: 10px;
      margin-top: 6px;
      flex-wrap: wrap;
    }
  }
  