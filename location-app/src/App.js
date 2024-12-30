import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    house: "",
    area: "",
    category: "",
    favorite: false,
    location: { lat: 0, lng: 0 },
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchAddresses();
    requestCurrentLocation();
  }, []);

  const fetchAddresses = async () => {
    const { data } = await axios.get("http://localhost:5000/addresses");
    setAddresses(data);
  };

  const requestCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setForm({ ...form, location: { lat: latitude, lng: longitude } });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const saveAddress = async () => {
    await axios.post("http://localhost:5000/addresses", form);
    fetchAddresses();
  };

  if (!isLoaded) return <div className="text-center text-xl mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Location/Address App</h1>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        onClick={requestCurrentLocation}
      >
        Locate Me
      </button>
      <div className="mb-5">
        <GoogleMap
          mapContainerClassName="w-full h-96 rounded-lg shadow"
          center={currentLocation || { lat: 0, lng: 0 }}
          zoom={15}
          onClick={(e) =>
            setForm({
              ...form,
              location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            })
          }
        >
          <Marker position={form.location} />
        </GoogleMap>
      </div>
      <div className="bg-gray-100 p-5 rounded shadow mb-5">
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="House/Flat No."
          onChange={(e) => setForm({ ...form, house: e.target.value })}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Area/Road"
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends">Friends</option>
        </select>
        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => setForm({ ...form, favorite: e.target.checked })}
          /> Favorite
        </label>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={saveAddress}
        >
          Save Address
        </button>
      </div>
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Saved Addresses</h2>
        {addresses.map((address) => (
          <div
            key={address._id}
            className="p-4 mb-3 border rounded shadow-sm bg-gray-50"
          >
            <p className="mb-2">
              <span className="font-bold">{address.house}</span>, {address.area} ({address.category})
            </p>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={() =>
                axios
                  .delete(`http://localhost:5000/addresses/${address._id}`)
                  .then(fetchAddresses)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;