import Train, { type TrainData } from './Train';

// Define the component props
interface TrainListProps {
  color: 'blue' | 'gold' | 'red' | 'green';
  data: TrainData[];
  filters: {
    arriving: boolean;
    scheduled: boolean;
    direction: string | null;
    station: string | null;
  };
}

export default function TrainList({ color, data, filters }: TrainListProps) {
  // Filter trains by the specified line color and remove duplicates
  let filteredTrains = data.filter(train => train.LINE.toUpperCase() === color.toUpperCase());
  
  // Remove duplicate trains by keeping only the most recent record for each train ID and station combination
  const uniqueTrains = filteredTrains.reduce((acc, current) => {
    const key = `${current.TRAIN_ID}-${current.STATION}`;
    const existing = acc.find(train => `${train.TRAIN_ID}-${train.STATION}` === key);
    
    if (!existing) {
      acc.push(current);
    } else {
      // Keep the record with the most recent EVENT_TIME
      const currentTime = new Date(current.EVENT_TIME);
      const existingTime = new Date(existing.EVENT_TIME);
      
      if (currentTime > existingTime) {
        const index = acc.findIndex(train => `${train.TRAIN_ID}-${train.STATION}` === key);
        acc[index] = current;
      }
    }
    
    return acc;
  }, [] as TrainData[]);
  
  filteredTrains = uniqueTrains;

  // Apply arrival filter (trains arriving soon)
  if (filters.arriving) {
    filteredTrains = filteredTrains.filter(train => {
      const waitingSeconds = parseInt(train.WAITING_SECONDS);
      return !isNaN(waitingSeconds) && waitingSeconds <= 300; // 5 minutes or less
    });
  }

  // Apply scheduled filter (trains with specific arrival times)
  if (filters.scheduled) {
    filteredTrains = filteredTrains.filter(train => {
      return train.NEXT_ARR && train.NEXT_ARR.trim() !== '';
    });
  }

  // Apply direction filter
  if (filters.direction) {
    filteredTrains = filteredTrains.filter(train => 
      train.DIRECTION.toUpperCase() === filters.direction!.toUpperCase()
    );
  }

  // Apply station filter
  function normalizeStation(name: string | null) {
    if (!name) return '';
    return name.trim().replace(/\s*STATION$/i, '').toUpperCase();
  }
  if (filters.station) {
    const station = filters.station;
    filteredTrains = filteredTrains.filter(train =>
      normalizeStation(train.STATION) === normalizeStation(station)
    );
  }
  
  
  
  

  // Group trains by station
  const trainsByStation = filteredTrains.reduce((acc, train) => {
    const station = train.STATION;
    if (!acc[station]) {
      acc[station] = [];
    }
    acc[station].push(train);
    return acc;
  }, {} as Record<string, TrainData[]>);

  // Sort stations alphabetically
  const sortedStations = Object.keys(trainsByStation).sort();

  return (
    <div className="train-list">
      <h2 className="line-title" style={{ color: getLineColor(color) }}>
        {color.charAt(0).toUpperCase() + color.slice(1)} Line Trains
        {filteredTrains.length !== data.filter(train => train.LINE.toUpperCase() === color.toUpperCase()).length && 
          ` (${filteredTrains.length} filtered)`
        }
      </h2>
      
      {filteredTrains.length === 0 ? (
        <div className="no-trains">
          <p>No trains currently match the selected filters.</p>
          <p>Try adjusting your filter settings or check back later.</p>
        </div>
      ) : (
        <div className="stations-container">
          {sortedStations.map(station => (
            <div key={station} className="station-group">
              <h3 className="station-title">{station}</h3>
              <div className="trains-container">
                {trainsByStation[station].map(train => (
                  <Train key={`${train.TRAIN_ID}-${train.STATION}`} train={train} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to get the actual color value for each line
function getLineColor(line: 'blue' | 'gold' | 'red' | 'green'): string {
  const colors = {
    blue: '#0066CC',
    gold: '#FFD700',
    red: '#CC0000',
    green: '#009900'
  };
  return colors[line];
}
