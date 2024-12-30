# Location/Address App

This project is a web application that allows users to:

- Detect their current location.
- Select a location using Google Maps.
- Save addresses with details such as house number, area, and category.
- Manage saved addresses (view, delete).

## Built with:

- **Frontend:** React, Google Maps JavaScript API, Tailwind CSS.
- **Backend:** Node.js, Express, MongoDB.

## Features

### Locate Me
Uses the browser's Geolocation API to fetch and display the user's current location on a map.

### Google Maps Integration
Displays an interactive map where users can select and adjust their location.

### Address Management
Allows users to save addresses with details such as house/flat number, area, and category (e.g., Home, Office). Users can view and delete saved addresses.

### Responsive Design
Styled with Tailwind CSS to ensure a clean and responsive user interface.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or hosted)
- Google Cloud Project with the following APIs enabled:
    - Maps JavaScript API
    - Geolocation API
    - Places API (if needed for autocomplete or place searches)

## Setup Instructions

### Backend

Clone the repository:
```sh
git clone <repository-url>
cd <repository-folder>
```

Navigate to the backend folder:
```sh
cd backend
```

Install dependencies:
```sh
npm install
```

Start the MongoDB server (if running locally):
```sh
mongod
```

Start the backend server:
```sh
node server.js
```

The backend will run at `http://localhost:5000`.

### Frontend

Navigate to the frontend folder:
```sh
cd location-app
```

Install dependencies:
```sh
npm install
```

Configure the `.env` file:
- Create a `.env` file in the root of the frontend directory.
- Add your Google Maps API key:
    ```env
    REACT_APP_GOOGLE_MAP_API=your_actual_api_key
    ```

Start the development server:
```sh
npm start
```

The frontend will run at `http://localhost:3000`.

### Google Cloud Setup

#### Create a Project
- Go to Google Cloud Console.
- Create a new project or select an existing one.

#### Enable APIs
- Navigate to APIs & Services > Library.
- Enable the following APIs:
    - Maps JavaScript API
    - Geolocation API
    - Places API (optional).

#### Create an API Key
- Go to APIs & Services > Credentials.
- Create a new API key.

#### Restrict the API Key
- **Application Restrictions:** Choose HTTP referrers and add:
    ```
    http://localhost:3000
    ```
- **API Restrictions:** Restrict the key to the enabled APIs (e.g., Maps JavaScript API).

#### Billing
Ensure the project is linked to an active billing account.

## Folder Structure

```
.
├── backend
│   ├── server.js         # Backend server code
│   ├── models            # MongoDB schemas
├── frontend
│   ├── src
│   │   ├── App.js        # Main React component
│   │   ├── index.js      # Entry point
│   │   ├── index.css     # Tailwind CSS setup
│   ├── public            # Static assets
├── .env                  # Environment variables
```

## Usage

- Open the application in your browser at `http://localhost:3000`.
- Use the Locate Me button to detect your current location.
- Select a location on the map and fill in the address details.
- Save the address and view it in the saved addresses list.
- Manage saved addresses by deleting them as needed.

## Troubleshooting

### Environment Variables Not Loaded
- Ensure the `.env` file is in the root of the frontend directory.
- Restart the development server after making changes to `.env`.

### Google Maps API Errors
- Check the browser console for detailed error messages.
- Ensure the API key is correct and associated with the right project.
- Verify that the required APIs are enabled in the Google Cloud Console.

### Backend Not Connecting to MongoDB
- Ensure MongoDB is running locally or update the connection string in `server.js` for a remote database.

## License

This project is licensed under the MIT License.