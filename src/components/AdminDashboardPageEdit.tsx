import { useState } from "react"
import InputBoxAdd from "./AdminDashboard/InputBoxAdd"
import DescriptionBoxAdd from "./AdminDashboard/DescriptionBoxAdd"

const AdminDashboardPageEdit = () => {
  const [images, setImages] = useState<string[]>([""])

  const addImageField = () => {
    setImages([...images, ""])
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const facilities = [
    "Wifi",
    "AC",
    "Swimming Pool",
    "Parking Area",
    "Breakfast",
    "Restaurant",
    "Free Smoking",
    "Smoking Area",
    "Pet Allowed",
    "Guest Room",
    "Disability",
    "Gym",
    "Shuttle"
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Add New Hotel</h1>

        <form className="flex flex-col gap-5">
          <InputBoxAdd type="text">Hotel Name</InputBoxAdd>
          <InputBoxAdd type="text">City</InputBoxAdd>
          <InputBoxAdd type="text">Full Address</InputBoxAdd>

          <DescriptionBoxAdd />

          {/* IMAGE URLS */}
          <div>
            <label className="font-medium block mb-2">
              Hotel Images (URLs)
            </label>

            {images.map((img, idx) => (
              <input
                key={idx}
                type="text"
                placeholder="Input Image"
                value={img}
                onChange={(e) => updateImage(idx, e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-2"
              />
            ))}

            <button
              type="button"
              onClick={addImageField}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another image
            </button>
          </div>

          {/* FACILITIES */}
          <div>
            <label className="font-medium block mb-2">Facilities</label>

            <div className="grid grid-cols-2 gap-2 text-sm">
              {facilities.map(
                (facility) => (
                  <label key={facility} className="flex items-center gap-2">
                    <input type="checkbox" />
                    {facility}
                  </label>
                )
              )}
            </div>
          </div>

          {/* PRICE */}
          <InputBoxAdd type="number">Price</InputBoxAdd>

          {/* STATUS */}
          <div>
            <label className="font-medium">Status</label>
            <select className="w-full border rounded-lg px-3 py-2 mt-1">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-900"
          >
            Save Hotel
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminDashboardPageEdit;
