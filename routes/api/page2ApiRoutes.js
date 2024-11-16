const apiUrl = '/api/page2';

// Fetch data
async function fetchPage2Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 2 Data:', data);
}

// Add data
async function addPage2Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 2 Add Response:', result);
}

// Call fetch on page load
fetchPage2Data();
