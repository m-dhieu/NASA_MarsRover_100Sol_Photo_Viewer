/*
Mars Rover 100 Sol Photo Viewer:
Function to fetch Mars photos from Mars day 100 using the NASA Mars Rover Photos API.

Main program flow:
1. Get user's selection (rover and camera)
2. Fetch data from NASA API
3. Display fetched data or show an error message if fetch fails
*/ 


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

function updateCameraOptions() {
    const rover = document.getElementById('rover').value;
    const cameraSelect = document.getElementById('camera');
    cameraSelect.innerHTML = '';
    roverCameras[rover].forEach(cam => {
        const opt = document.createElement('option');
        opt.value = cam.code;
        opt.textContent = cam.name + ` (${cam.code})`;
        cameraSelect.appendChild(opt);
    });
}

async function fetchMarsPhoto(event) {
    event.preventDefault();
    const rover = document.getElementById('rover').value;
    const camera = document.getElementById('camera').value;
    const apiKey = 'DEMO_key';
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&camera=${camera}&api_key=${apiKey}`;
    const img = document.getElementById('marsImage');
    const info = document.getElementById('marsInfo');
    img.style.display = 'none';
    info.textContent = 'Loading...';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const photo = (data.photos || [])[0];
        if (photo) {
            img.src = photo.img_src;
            img.alt = `${rover} - ${camera}`;
            img.style.display = 'block';
            info.textContent = `Rover: ${rover.charAt(0).toUpperCase() + rover.slice(1)}, Camera: ${photo.camera.full_name}, Sol: ${photo.sol}, Earth Date: ${photo.earth_date}`;
        } else {
            img.style.display = 'none';
            info.textContent = 'No photo found for this camera on sol 1000.';
        }
    } catch (error) {
        img.style.display = 'none';
        info.textContent = 'Error: ' + error.message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCameraOptions();
    document.getElementById('rover').addEventListener('change', updateCameraOptions);
    document.getElementById('roverForm').addEventListener('submit', fetchMarsPhoto);
});
