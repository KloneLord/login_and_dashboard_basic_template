const apiUrl = '/api/page5';

// Fetch data
async function fetchPage5Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 5 Data:', data);
}

// Add data
async function addPage5Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 5 Add Response:', result);
}

// Call fetch on page load
fetchPage5Data();
