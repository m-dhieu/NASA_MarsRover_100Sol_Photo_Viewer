/*
Mars Rover 100 Sol Photo Viewer:
Function to fetch Mars photos from Mars day 100 using the NASA Mars Rover Photos API.

Main program flow:
1. Get user's selection (rover and camera)
2. Fetch data from NASA API
3. Display fetched data or show an error message if fetch fails
*/ 


async function fetchMarsPhoto(event) {
    event.preventDefault();
    const rover = document.getElementById('rover').value;
    const camera = document.getElementById('camera').value;
    const sol = 1000; // or let user choose

    const url = `http://localhost:3000/api/marsphotos?rover=${rover}&camera=${camera}&sol=${sol}`;
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
