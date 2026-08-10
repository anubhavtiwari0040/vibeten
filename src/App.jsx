import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [fakeIp, setFakeIp] = useState('185.220.101.45');
  const [incidentId, setIncidentId] = useState('ERR-SYS-99042');

  // Randomize IP and Incident code periodically to give a live intrusion tracking feel
  useEffect(() => {
    const interval = setInterval(() => {
      const p1 = Math.floor(Math.random() * 200) + 50;
      const p2 = Math.floor(Math.random() * 250) + 10;
      const p3 = Math.floor(Math.random() * 250) + 10;
      const p4 = Math.floor(Math.random() * 250) + 10;
      setFakeIp(`${p1}.${p2}.${p3}.${p4}`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Synth Eerie Warning Alarm on user click
  const playAlarmSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio fallback silent
    }
  };

  // Background Dark Red Canvas Matrix/Particle Network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - dist / 120) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handlePanicLeave = () => {
    playAlarmSound();
    // Redirect immediately to safety / google / back
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  return (
    <div className="suspended-wrapper" onClick={playAlarmSound}>
      {/* Red Emergency Vignette Flash */}
      <div className="horror-vignette" />
      
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="canvas-bg" />
      <div className="grid-overlay" />
      <div className="scanline" />

      {/* Main Horror Warning Card */}
      <main className="suspended-card">
        {/* Emergency Alert Pill */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="horror-alert-pill">
            <span className="pulsing-dot" />
            ⚠️ CRITICAL WARNING: ACCESS DENIED
          </div>
        </div>

        {/* Skull / Biohazard Icon */}
        <div className="skull-wrapper">
          <div className="skull-glow-ring" />
          <svg
            className="skull-icon"
            width="46"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a8 8 0 0 0-8 8c0 3.3 2 6.1 5 7.3V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.7c3-1.2 5-4 5-7.3a8 8 0 0 0-8-8z" />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path d="M10 16v3" />
            <path d="M14 16v3" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="horror-title">
          <span className="glitch-horror" data-text="WEBSITE SUSPENDED">
            WEBSITE SUSPENDED
          </span>
        </h1>

        {/* Subtext */}
        <p className="horror-subtext">
          This domain has been <span>TERMINATED & SEIZED</span> by network security.<br />
          Unauthorized attempts to breach this system are actively monitored.
        </p>

        {/* Live Cyber Intrusion Tracker */}
        <div className="tracker-box">
          <div className="tracker-row">
            <span className="tracker-key">VISITOR_IP_LOGGED:</span>
            <span className="tracker-val">{fakeIp}</span>
          </div>
          <div className="tracker-row">
            <span className="tracker-key">SECURITY_LEVEL:</span>
            <span className="tracker-val">MAXIMUM_LOCKDOWN</span>
          </div>
          <div className="tracker-row">
            <span className="tracker-key">DEVICE_TRACE:</span>
            <span className="tracker-val">ACTIVE_TRACKING...</span>
          </div>
        </div>

        {/* Panic Button */}
        <button className="panic-btn" onClick={handlePanicLeave}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          LEAVE IMMEDIATELY (GO BACK)
        </button>
      </main>
    </div>
  );
}

export default App;
