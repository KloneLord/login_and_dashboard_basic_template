const apiUrl = '/api/page1';

// Fetch data
async function fetchPage1Data() {
    try {
        console.log('Fetching data from:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error('Failed to fetch data. HTTP Status:', response.status);
            return;
        }

        const data = await response.json();
        console.log('Page 1 Data:', data);
    } catch (error) {
        console.error('Error fetching Page 1 data:', error.message);
    }
}

// Add data
async function addPage1Data(newData) {
    try {
        console.log('Adding data:', newData);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            console.error('Failed to add data. HTTP Status:', response.status);
            return;
        }

        const result = await response.json();
        console.log('Page 1 Add Response:', result);
    } catch (error) {
        console.error('Error adding Page 1 data:', error.message);
    }
}