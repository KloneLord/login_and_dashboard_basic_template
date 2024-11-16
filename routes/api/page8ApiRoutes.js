const apiUrl = '/api/page8';

// Fetch data
async function fetchPage8Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 8 Data:', data);
}

// Add data
async function addPage8Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 8 Add Response:', result);
}

// Call fetch on page load
fetchPage8Data();
