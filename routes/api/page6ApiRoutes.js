const apiUrl = '/api/page6';

// Fetch data
async function fetchPage6Data() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Page 6 Data:', data);
}

// Add data
async function addPage6Data(newData) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log('Page 6 Add Response:', result);
}

// Call fetch on page load
fetchPage6Data();
