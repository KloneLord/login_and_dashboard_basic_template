const apiUrl = '/api/page4';

// Fetch data
async function fetchPage4Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 4 Data:', data);
}

// Add data
async function addPage4Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 4 Add Response:', result);
}

// Call fetch on page load
fetchPage4Data();
