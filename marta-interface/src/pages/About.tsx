import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <Link to="/" className="back-home-link">← Back to Home</Link>
        <h1>About MARTA</h1>
      </header>

      <main className="about-main">
        <div className="about-content">
          <section className="marta-info">
            <h2>Metropolitan Atlanta Rapid Transit Authority</h2>
            <p>
              MARTA is the ninth-largest rapid transit system in the United States by ridership. 
              It operates heavy rail rapid transit and bus services in the Atlanta metropolitan area, 
              serving the cities of Atlanta, Decatur, East Point, and College Park.
            </p>
          </section>

          <section className="marta-map-section">
            <h2>MARTA Rail System Map</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-title">MARTA Rail System</div>
                <div className="map-lines">
                  <div className="map-line" style={{ backgroundColor: '#0066CC' }}>
                    <span>BLUE LINE</span>
                  </div>
                  <div className="map-line" style={{ backgroundColor: '#FFD700' }}>
                    <span>GOLD LINE</span>
                  </div>
                  <div className="map-line" style={{ backgroundColor: '#CC0000' }}>
                    <span>RED LINE</span>
                  </div>
                  <div className="map-line" style={{ backgroundColor: '#009900' }}>
                    <span>GREEN LINE</span>
                  </div>
                </div>
                <p className="map-description">
                  Four rail lines serving the Atlanta metropolitan area with 38 stations
                </p>
              </div>
            </div>
          </section>

          <section className="system-stats">
            <h2>System Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>38</h3>
                <p>Rail Stations</p>
              </div>
              <div className="stat-item">
                <h3>4</h3>
                <p>Rail Lines</p>
              </div>
              <div className="stat-item">
                <h3>48.3</h3>
                <p>Miles of Track</p>
              </div>
              <div className="stat-item">
                <h3>1979</h3>
                <p>System Opened</p>
              </div>
            </div>
          </section>

          <section className="purpose-section">
            <h2>MARTA's Mission</h2>
            <p>
              MARTA's mission is to provide safe, reliable, and cost-effective transit services 
              that enhance mobility, sustainability, and economic vitality in the Atlanta region. 
              The system connects communities, reduces traffic congestion, and provides 
              environmentally friendly transportation options.
            </p>
          </section>

          <section className="accessibility-section">
            <h2>Accessibility</h2>
            <p>
              MARTA is committed to providing accessible transit services for all riders. 
              Most stations are wheelchair accessible, and all trains and buses are equipped 
              with accessibility features. Look for the wheelchair icon (♿) in our interface 
              to identify stations that may have accessibility limitations.
            </p>
          </section>

          <section className="technology-section">
            <h2>Real-Time Information</h2>
            <p>
              This interface provides real-time train arrival information, station details, 
              and system status updates. Data is refreshed automatically to ensure you have 
              the most current information for planning your journey.
            </p>
          </section>
        </div>

        <div className="about-actions">
          <Link to="/" className="cta-button">
            Explore MARTA Lines
          </Link>
        </div>
      </main>

      <footer className="about-footer">
        <p>&copy; 2024 MARTA Interface - Connecting Atlanta</p>
        <div className="footer-links">
          <a href="https://www.itsmarta.com" target="_blank" rel="noopener noreferrer">
            Official MARTA Website
          </a>
          <Link to="/">Home</Link>
        </div>
      </footer>
    </div>
  );
}
