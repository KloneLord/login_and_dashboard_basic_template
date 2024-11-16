const apiUrl = '/api/page3';

// Fetch data
async function fetchPage3Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 3 Data:', data);
}

// Add data
async function addPage3Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 3 Add Response:', result);
}

// Call fetch on page load
fetchPage3Data();
