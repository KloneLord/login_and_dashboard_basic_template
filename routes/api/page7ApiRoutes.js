const apiUrl = '/api/page7';

// Fetch data
async function fetchPage7Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 7 Data:', data);
}

// Add data
async function addPage7Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 7 Add Response:', result);
}

// Call fetch on page load
fetchPage7Data();
