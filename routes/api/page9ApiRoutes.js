const apiUrl = '/api/page9';

// Fetch data
async function fetchPage9Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 9 Data:', data);
}

// Add data
async function addPage9Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 9 Add Response:', result);
}

// Call fetch on page load
fetchPage9Data();
