import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import { FiMaximize, FiMinimize, FiCalendar, FiUsers } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import './Map.css';

export const Map = () => {
  const [workLocations, setWorkLocations] = useState([]);
  const [newMarker, setNewMarker] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [overlappingProjects, setOverlappingProjects] = useState([]);
  const [showProjectRadius, setShowProjectRadius] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [interDepartmentalProjects, setInterDepartmentalProjects] = useState([]);
  const [resourceSharing, setResourceSharing] = useState([]);

  // Raipur coordinates
  const center = [21.2514, 81.6296];

  const departments = [
    { id: 'water', name: 'Water Department', color: '#2196F3' },
    { id: 'road', name: 'Road Department', color: '#FF9800' },
    { id: 'sanitation', name: 'Sanitation Department', color: '#4CAF50' },
    { id: 'electricity', name: 'Electricity Department', color: '#FFC107' },
    { id: 'construction', name: 'Construction Department', color: '#9C27B0' }
  ];

  const customIcon = (color) => new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const handleMapClick = (e) => {
    if (selectedDepartment) {
      const newLocation = {
        id: Date.now(),
        position: [e.latlng.lat, e.latlng.lng],
        department: selectedDepartment,
        description: '',
        status: 'In Progress'
      };
      setNewMarker(newLocation);
    }
  };

  const handleSubmit = (description) => {
    if (newMarker && description) {
      setWorkLocations([...workLocations, { ...newMarker, description }]);
      setNewMarker(null);
    }
  };

  const toggleFullScreen = () => {
    const mapElement = document.querySelector('.map-container');
    setIsFullScreen(!isFullScreen);

    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        mapElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        mapElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        mapElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Mock project data (replace with actual API call)
  const projectsData = [
    {
      id: 1,
      department: 'water',
      position: [21.2514, 81.6296],
      radius: 500, // meters
      description: 'Water pipeline installation',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      status: 'Planned',
      budget: '₹50,00,000',
      contactPerson: 'Mr. Sharma',
      contactEmail: 'sharma@dept.gov.in'
    },
    {
      id: 2,
      department: 'road',
      position: [21.2520, 81.6290],
      radius: 600,
      description: 'Road resurfacing',
      startDate: '2024-05-01',
      endDate: '2024-07-15',
      status: 'Planned',
      budget: '₹75,00,000',
      contactPerson: 'Mr. Patel',
      contactEmail: 'patel@dept.gov.in'
    }
    // Add more project data as needed
  ];

  // Helper function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Function to check for overlapping projects
  const checkProjectOverlaps = (projects) => {
    const overlaps = [];
    
    projects.forEach((project1, index1) => {
      projects.forEach((project2, index2) => {
        if (index1 < index2) { // Avoid comparing same projects and duplicate comparisons
          const distance = calculateDistance(
            project1.position[0],
            project1.position[1],
            project2.position[0],
            project2.position[1]
          );
          
          if (distance < 0.5) { // If projects are within 500m
            overlaps.push({
              project1,
              project2,
              distanceInKm: Number(distance.toFixed(2)) // Convert to number with 2 decimal places
            });
          }
        }
      });
    });
    
    setOverlappingProjects(overlaps);
  };

  // Schedule Meeting Component
  const ScheduleMeetingForm = ({ projects }) => {
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [agenda, setAgenda] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement meeting scheduling logic here
      console.log('Meeting scheduled:', { meetingDate, meetingTime, agenda, projects });
      // Add API call to save meeting details
    };

    return (
      <div className="schedule-meeting-form">
        <h3>Schedule Coordination Meeting</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            required
          />
          <textarea
            placeholder="Meeting Agenda"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            required
          />
          <button type="submit">Schedule Meeting</button>
        </form>
      </div>
    );
  };

  // Add resource sharing functionality
  const handleResourceSharing = (project1, project2) => {
    const sharingRequest = {
      requestingDept: project1.department,
      sharingDept: project2.department,
      resources: ['machinery', 'technical expertise'],
      duration: '2 weeks',
      status: 'pending'
    };
    setResourceSharing(prev => [...prev, sharingRequest]);
  };

  return (
    <div className="map-section">
      <div className={`map-container ${isFullScreen ? 'fullscreen' : ''}`}>
        {isFullScreen && (
          <div className="fullscreen-message">
            Press ESC to exit fullscreen
          </div>
        )}
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          onClick={handleMapClick}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {workLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={customIcon(departments.find(d => d.id === location.department).color)}
            >
              <Popup>
                <div className="marker-popup">
                  <h3>{departments.find(d => d.id === location.department).name}</h3>
                  <p>{location.description}</p>
                  <p>Status: {location.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {newMarker && (
            <Marker
              position={newMarker.position}
              icon={customIcon(departments.find(d => d.id === selectedDepartment).color)}
            >
              <Popup>
                <div className="new-marker-form">
                  <h3>Add Work Location</h3>
                  <textarea
                    placeholder="Enter work description"
                    onChange={(e) => setNewMarker({...newMarker, description: e.target.value})}
                  />
                  <button onClick={() => handleSubmit(newMarker.description)}>
                    Add Location
                  </button>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Render project markers and circles */}
          {projectsData.map((project) => (
            <React.Fragment key={project.id}>
              <Marker
                position={project.position}
                icon={customIcon(departments.find(d => d.id === project.department).color)}
                eventHandlers={{
                  click: () => setSelectedProject(project)
                }}
              >
                <Popup>
                  <div className="project-popup">
                    <h3>{departments.find(d => d.id === project.department).name}</h3>
                    <p>{project.description}</p>
                    <p>Status: {project.status}</p>
                    <p>Timeline: {project.startDate} to {project.endDate}</p>
                    <p>Budget: {project.budget}</p>
                    <p>Contact: {project.contactPerson}</p>
                    <button onClick={() => setSelectedProject(project)}>
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
              {showProjectRadius && (
                <Circle
                  center={project.position}
                  radius={project.radius}
                  pathOptions={{
                    color: departments.find(d => d.id === project.department).color,
                    fillColor: departments.find(d => d.id === project.department).color,
                    fillOpacity: 0.2
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Overlapping Projects Panel */}
        <div className="overlapping-projects-panel">
          <h3>Overlapping Projects</h3>
          {overlappingProjects.map((overlap, index) => (
            <div key={index} className="overlap-item">
              <p>
                {departments.find(d => d.id === overlap.project1.department).name} &
                {departments.find(d => d.id === overlap.project2.department).name}
              </p>
              <p>Distance: {overlap.distanceInKm}km</p>
              <button onClick={() => setSelectedProject(overlap)}>
                Schedule Meeting
              </button>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="project-details-modal">
            <ScheduleMeetingForm projects={[selectedProject]} />
          </div>
        )}

        <button 
          className="fullscreen-button"
          onClick={toggleFullScreen}
          title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullScreen ? <FiMinimize /> : <FiMaximize />}
        </button>

        <div className="map-legend">
          {departments.map(dept => (
            <div key={dept.id} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: dept.color }}></span>
              <span>{dept.name}</span>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="map-controls">
          <button
            className="control-button"
            onClick={() => setShowProjectRadius(!showProjectRadius)}
            title="Toggle Project Radius"
          >
            Show/Hide Radius
          </button>
          <button
            className="control-button"
            onClick={() => checkProjectOverlaps(projectsData)}
            title="Find Overlapping Projects"
          >
            Find Overlaps
          </button>
        </div>

        {/* Add new coordination panel */}
        {overlappingProjects.length > 0 && (
          <div className="coordination-panel">
            <h3>Project Coordination Required</h3>
            {overlappingProjects.map((overlap, index) => (
              <div key={index} className="overlap-alert">
                <p>Projects requiring coordination:</p>
                <p>{overlap.project1.description} and {overlap.project2.description}</p>
                <p>Distance: {overlap.distanceInKm} km</p>
                <button 
                  onClick={() => handleResourceSharing(overlap.project1, overlap.project2)}
                  className="coordination-button"
                >
                  Initialize Resource Sharing
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};