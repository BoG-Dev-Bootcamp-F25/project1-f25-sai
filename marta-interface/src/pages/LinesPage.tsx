import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar, { type StationData } from '../components/NavBar';
import TrainList from '../components/TrainList';
import { type TrainData } from '../components/Train';

type LineColor = 'blue' | 'gold' | 'red' | 'green';

export default function LinesPage() {
  const { lineColor } = useParams<{ lineColor: string }>();
  const [currColor, setCurrColor] = useState<LineColor>((lineColor as LineColor) || 'blue');
  const [trainData, setTrainData] = useState<TrainData[]>([]);
  const [stationData, setStationData] = useState<StationData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    arriving: false,
    scheduled: false,
    direction: null as string | null,
  });

  // Update currColor when URL changes
  useEffect(() => {
    if (lineColor && ['blue', 'gold', 'red', 'green'].includes(lineColor)) {
      setCurrColor(lineColor as LineColor);
    }
  }, [lineColor]);

  // Fetch train data
  useEffect(() => {
    const fetchTrainData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://midsem-bootcamp-api.onrender.com/arrivals/${currColor}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTrainData(data);
      } catch (err) {
        console.error('Error fetching train data:', err);
        setError(`Failed to load train data for ${currColor}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainData();
  }, [currColor]);

  // Fetch station data
  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await fetch(`https://midsem-bootcamp-api.onrender.com/stations/${currColor}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStationData(data);
      } catch (err) {
        console.error('Error fetching station data:', err);
        // Station data error is less critical, so we don't set the main error state
      }
    };

    fetchStationData();
  }, [currColor]);

  // Reset filters when line changes
  useEffect(() => {
    setFilters({
      arriving: false,
      scheduled: false,
      direction: null,
    });
    setSelectedStation(null);
  }, [currColor]);

  const handleFilterToggle = (filterType: 'arriving' | 'scheduled') => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleDirectionFilter = (direction: string) => {
    setFilters(prev => ({
      ...prev,
      direction: prev.direction === direction ? null : direction
    }));
  };

  const getDirectionButtons = () => {
    const isBlueOrGreen = currColor === 'blue' || currColor === 'green';
    
    if (isBlueOrGreen) {
      return (
        <>
          <button 
            className={`filter-btn ${filters.direction === 'E' ? 'active' : ''}`}
            onClick={() => handleDirectionFilter('E')}
          >
            Eastbound
          </button>
          <button 
            className={`filter-btn ${filters.direction === 'W' ? 'active' : ''}`}
            onClick={() => handleDirectionFilter('W')}
          >
            Westbound
          </button>
        </>
      );
    } else {
      return (
        <>
          <button 
            className={`filter-btn ${filters.direction === 'N' ? 'active' : ''}`}
            onClick={() => handleDirectionFilter('N')}
          >
            Northbound
          </button>
          <button 
            className={`filter-btn ${filters.direction === 'S' ? 'active' : ''}`}
            onClick={() => handleDirectionFilter('S')}
          >
            Southbound
          </button>
        </>
      );
    }
  };

  const combinedFilters = {
    ...filters,
    station: selectedStation,
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading {currColor} line data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="lines-page">
      <NavBar 
        color={currColor} 
        data={stationData} 
        selectedStation={selectedStation}
        onStationSelect={setSelectedStation}
      />
      
      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filters.arriving ? 'active' : ''}`}
            onClick={() => handleFilterToggle('arriving')}
          >
            Arriving
          </button>
          <button 
            className={`filter-btn ${filters.scheduled ? 'active' : ''}`}
            onClick={() => handleFilterToggle('scheduled')}
          >
            Scheduled
          </button>
          {getDirectionButtons()}
        </div>
        
        {selectedStation && (
          <div className="station-filter-info">
            <p>Showing trains for: <strong>{selectedStation}</strong></p>
            <button 
              className="clear-station-btn"
              onClick={() => setSelectedStation(null)}
            >
              Clear Station Filter
            </button>
          </div>
        )}
      </div>
      
      <TrainList 
        color={currColor} 
        data={trainData} 
        filters={combinedFilters}
      />
    </div>
  );
}
