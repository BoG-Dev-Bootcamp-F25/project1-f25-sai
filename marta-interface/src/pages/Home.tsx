import { Link } from 'react-router-dom';

export default function Home() {
  const lineColors = [
    { color: 'blue', name: 'Blue Line' },
    { color: 'gold', name: 'Gold Line' },
    { color: 'red', name: 'Red Line' },
    { color: 'green', name: 'Green Line' }
  ];

  const getLineColor = (color: string) => {
    const colors: { [key: string]: string } = {
      'blue': '#0066CC',
      'gold': '#FFD700',
      'red': '#CC0000',
      'green': '#009900'
    };
    return colors[color] || '#666666';
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1 className="marta-title">MARTA</h1>
          <p className="marta-subtitle">Metropolitan Atlanta Rapid Transit Authority</p>
          <Link to="/about" className="about-link">About MARTA</Link>
        </div>
      </header>

      <main className="home-main">
        <div className="welcome-section">
          <h2>Welcome to MARTA</h2>
          <p>Select a train line to view real-time arrivals and station information.</p>
        </div>

        <div className="lines-grid">
          {lineColors.map(line => (
            <Link 
              key={line.color}
              to={`/lines/${line.color}`}
              className="line-card"
              style={{ 
                borderLeft: `8px solid ${getLineColor(line.color)}`,
                '--line-color': getLineColor(line.color)
              } as React.CSSProperties}
            >
              <div className="line-indicator" style={{ backgroundColor: getLineColor(line.color) }}>
                {line.color.toUpperCase()}
              </div>
              <h3 className="line-name">{line.name}</h3>
              <p className="line-description">
                Click to view trains, stations, and real-time arrivals
              </p>
              <div className="line-arrow">→</div>
            </Link>
          ))}
        </div>

        
      </main>

    </div>
  );
}
