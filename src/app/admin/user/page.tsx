"use client";
// pages/index.tsx
import { useEffect, useState } from "react";

const Admin = () => {
  const [storageItems, setStorageItems] = useState<
    Array<{ key: string; value: string }>
  >([]);

  // Fetch all items from localStorage on page load
  useEffect(() => {
    const items: Array<{ key: string; value: string }> = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key || "");
      if (key) {
        items.push({ key, value: value || "" });
      }
    }
    setStorageItems(items);
  }, []);

  // Handle deleting an item from localStorage
  const handleDelete = (key: string) => {
    localStorage.removeItem(key);
    setStorageItems(storageItems.filter((item) => item.key !== key)); // Update the UI
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">User Information Page</h1>
      <div className="space-y-4">
        {storageItems.length === 0 ? (
          <p>No Users in localStorage</p>
        ) : (
          storageItems.map(({ key, value }) => (
            <div
              key={key}
              className="border p-4 rounded-lg shadow-md bg-gray-100"
            >
              {/* Render User Data in Separate Boxes */}
              <div className="space-y-2">
                <div>
                  <strong>Key: </strong>
                  {key}
                </div>
                <div>
                  <strong>Value: </strong>
                  {value}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(key)}
                className="mt-3 text-red-500 hover:text-red-700 font-semibold"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
