
// Define the station data structure from API (array of station names)
export type StationData = string[];

interface NavBarProps {
  color: 'blue' | 'gold' | 'red' | 'green';
  data: StationData;
  selectedStation: string | null;
  onStationSelect: (station: string | null) => void;
}

export default function NavBar({ color, data, selectedStation, onStationSelect }: NavBarProps) {
  const getLineColor = (line: 'blue' | 'gold' | 'red' | 'green') => {
    const colors = {
      blue: '#0066CC',
      gold: '#FFD700',
      red: '#CC0000',
      green: '#009900'
    };
    return colors[line];
  };

  const handleStationClick = (stationName: string) => {
    if (selectedStation === stationName) {
      onStationSelect(null); // Deselect if already selected
    } else {
      onStationSelect(stationName);
    }
  };

  return (
    <nav className="navbar" style={{ borderBottom: `4px solid ${getLineColor(color)}` }}>
      <div className="nav-header">
        <h1 className="nav-title">
          MARTA {color.charAt(0).toUpperCase() + color.slice(1)} Line
        </h1>
        <div className="line-indicator" style={{ backgroundColor: getLineColor(color) }}>
          {color.toUpperCase()}
        </div>
      </div>
      
      <div className="stations-list">
        <h3>Stations on {color.charAt(0).toUpperCase() + color.slice(1)} Line:</h3>
        <div className="stations-grid">
          {data.map(station => (
            <div 
              key={station} 
              className={`station-item ${selectedStation === station ? 'selected' : ''}`}
              onClick={() => handleStationClick(station)}
            >
              <span className="station-name">{station}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
