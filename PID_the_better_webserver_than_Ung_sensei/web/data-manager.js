// Configuration
const API_URL = 'a.json';
const STORAGE_KEY = 'data';
const MAX_DATA_POINTS = 20000; // Maximum number of data points to store

class DataManager {
    constructor() {
        this.isRunning = false;
        this.intervalId = null;
    }

    // Start data fetching
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.fetchAndStore();
        this.intervalId = setInterval(() => this.fetchAndStore(), 500);
    }

    // Stop data fetching
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    }

    // Fetch data from API and store it
    async fetchAndStore() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const timestamp = new Date().toISOString();

            // Process and format data
            const processedData = {
                timestamp,
                ...this.processData(data)
            };

            // Store in session storage
            this.updateStorage(processedData, sessionStorage);

            // Store in local storage
            this.updateStorage(processedData, localStorage);

        } catch (error) {
            console.error('Error fetching or storing data:', error);
        }
    }

    // Process raw data from API
    processData(data) {
        return {
            PV: parseFloat(data.PV) || 0,
            CO: parseFloat(data.CO) || 0,
            SP: parseFloat(data.SP) || 0,
            MA: parseInt(data.MA) || 0,
            Kp: parseFloat(data.Kp) || 0,
            TD: parseFloat(data.TD) || 0,
            TI: parseFloat(data.TI) || 0,
            TSL: parseFloat(data.TSL) || 0,
            TSH: parseFloat(data.TSH) || 0
        };
    }

    // Update storage (both session and local)
    updateStorage(newData, storageType) {
        const storedData = this.getStoredData(storageType);
        storedData.push(newData);

        // Limit the number of stored data points
        if (storedData.length > MAX_DATA_POINTS) {
            storedData.shift(); // Remove oldest data point
        }

        storageType.setItem(STORAGE_KEY, JSON.stringify(storedData));
    }

    // Get stored data from storage
    getStoredData(storageType) {
        const stored = storageType.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // Get data for visualization
    getVisualizationData(storageType) {
        return this.getStoredData(storageType).map(item => ({
            timestamp: new Date(item.timestamp),
            PV: item.PV,
            CO: item.CO,
            SP: item.SP
        }));
    }

    getVisualizationDataArr(storageType) {
        let data = this.getVisualizationData(storageType);

        var timestamps = [];
        var pvValues = [];
        var coValues = [];
        var spValues = [];

        data.forEach(item => {
            // Validate each item has required properties
            if (!item.timestamp || typeof item.PV === 'undefined' ||
                typeof item.CO === 'undefined' || typeof item.SP === 'undefined') {
                throw new Error('Invalid data format: missing required properties');
            }

            timestamps.push(item.timestamp);
            pvValues.push(item.PV);
            coValues.push(item.CO);
            spValues.push(item.SP);
        });

        // Return object with transposed arrays
        return {
            timestamps,
            pvValues,
            coValues,
            spValues
        };
    }

    // Clear all stored data
    clearStorage() {
        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Usage example:
const processManager = new DataManager();

// Start data collection
processManager.start();