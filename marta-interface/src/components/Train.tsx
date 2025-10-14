
// Define the API train data structure
export interface TrainData {
  DESTINATION: string;
  DIRECTION: string;
  EVENT_TIME: string;
  LINE: string;
  NEXT_ARR: string;
  STATION: string;
  TRAIN_ID: string;
  WAITING_SECONDS: string;
  WAITING_TIME: string;
  DELAY: string;
}

interface TrainProps {
  train: TrainData;
}

export default function Train({ train }: TrainProps) {
  // Check if train is on time based on DELAY field
  const isOnTime = train.DELAY === "T0S";
  const status = isOnTime ? 'on-time' : 'delayed';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return '#009900';
      case 'delayed':
        return '#CC0000';
      case 'arriving':
        return '#FFD700';
      default:
        return '#666666';
    }
  };

  const getLineColor = (line: string) => {
    const colors: { [key: string]: string } = {
      'BLUE': '#0066CC',
      'GOLD': '#FFD700',
      'RED': '#CC0000',
      'GREEN': '#009900'
    };
    return colors[line.toUpperCase()] || '#666666';
  };

  const formatTime = (timeString: string) => {
    // Handle different time formats from API
    if (!timeString) return 'N/A';
    
    // If it's already in a readable format, return as is
    if (timeString.includes(':') || timeString.includes('min')) {
      return timeString;
    }
    
    // If it's in seconds, convert to minutes
    const seconds = parseInt(timeString);
    if (!isNaN(seconds)) {
      if (seconds < 60) {
        return `${seconds} sec`;
      } else {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
      }
    }
    
    return timeString;
  };

  return (
    <div className="train-card">
      <div className="train-header">
        <div 
          className="line-indicator" 
          style={{ backgroundColor: getLineColor(train.LINE) }}
        >
          {train.LINE}
        </div>
        <div className="train-id">Train {train.TRAIN_ID}</div>
        <div 
          className="status-indicator"
          style={{ color: getStatusColor(status) }}
        >
          {status.toUpperCase()}
        </div>
      </div>
      
      <div className="train-info">
        <div className="route-info">
          <div className="route-path">
            <span className="from-station">{train.STATION}</span>
            <span className="route-arrow">→</span>
            <span className="to-station">{train.DESTINATION}</span>
          </div>
        </div>
        <div className="direction">
          <strong>Direction:</strong> {train.DIRECTION}
        </div>
        <div className="waiting-time">
          <strong>Arrival:</strong> {formatTime(train.WAITING_TIME)}
        </div>
        {train.NEXT_ARR && (
          <div className="next-arrival">
            <strong>Next Arrival:</strong> {train.NEXT_ARR}
          </div>
        )}
      </div>
    </div>
  );
}
