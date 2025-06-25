/*
Mars Rover 100 Sol Photo Viewer:
Function to fetch Mars photos from Mars day 100 using the NASA Mars Rover Photos API.

Main program flow:
1. Get user's selection (rover and camera)
2. Fetch data from NASA API
3. Display fetched data or show an error message if fetch fails
*/ 


// Define cameras available for each rover
const roverCameras = {
    curiosity: [
        { code: "FHAZ", name: "Front Hazard Avoidance Camera" },
        { code: "RHAZ", name: "Rear Hazard Avoidance Camera" },
        { code: "MAST", name: "Mast Camera" },
        { code: "CHEMCAM", name: "Chemistry and Camera Complex" },
        { code: "MAHLI", name: "Mars Hand Lens Imager" },
        { code: "MARDI", name: "Mars Descent Imager" },
        { code: "NAVCAM", name: "Navigation Camera" }
    ],
    opportunity: [
        { code: "FHAZ", name: "Front Hazard Avoidance Camera" },
        { code: "RHAZ", name: "Rear Hazard Avoidance Camera" },
        { code: "NAVCAM", name: "Navigation Camera" },
        { code: "PANCAM", name: "Panoramic Camera" },
        { code: "MINITES", name: "Miniature Thermal Emission Spectrometer" }
    ],
    spirit: [
        { code: "FHAZ", name: "Front Hazard Avoidance Camera" },
        { code: "RHAZ", name: "Rear Hazard Avoidance Camera" },
        { code: "NAVCAM", name: "Navigation Camera" },
        { code: "PANCAM", name: "Panoramic Camera" },
        { code: "MINITES", name: "Miniature Thermal Emission Spectrometer" }
    ]
};

// Populate camera options based on selected rover
function updateCameraOptions() {
    const rover = document.getElementById('rover').value;
    const cameraSelect = document.getElementById('camera');
    cameraSelect.innerHTML = ''; // Clear existing options

    roverCameras[rover].forEach(cam => {
        const option = document.createElement('option');
        option.value = cam.code;
        option.textContent = `${cam.name} (${cam.code})`;
        cameraSelect.appendChild(option);
    });
}

// Fetch Mars photo from backend proxy and display it
async function fetchMarsPhoto(event) {
    event.preventDefault();

    const rover = document.getElementById('rover').value;
    const camera = document.getElementById('camera').value;
    const sol = 100; // Mars sol (day) number

    const url = `http://localhost:3000/api/marsphotos?rover=${rover}&camera=${camera}&sol=${sol}`;
    const img = document.getElementById('marsImage');
    const info = document.getElementById('marsInfo');

    img.style.display = 'none';
    info.textContent = 'Loading...';

    try {
        const response = await fetch

