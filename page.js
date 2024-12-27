"use client";
import { useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [size, setSize] = useState("medium");
  const [style, setStyle] = useState("rounded");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      title: "",
      caption: "",
      size: "medium",
      style: "rounded",
    }));
    setImages([...images, ...newImages]);
    setCurrentImage(newImages[0]);
    setShowModal(true);
  };

  const handleSave = () => {
    const newImages = [...images];
    const index = newImages.findIndex((img) => img.url === currentImage.url);
    if (index !== -1) {
      newImages[index].title = title;
      newImages[index].caption = caption;
      newImages[index].size = size;
      newImages[index].style = style;
      setImages(newImages);
    }
    setShowModal(false);
    setTitle("");
    setCaption("");
    setSize("medium");
    setStyle("rounded");
  };

  const handleEdit = (image) => {
    setCurrentImage(image);
    setTitle(image.title);
    setCaption(image.caption);
    setSize(image.size);
    setStyle(image.style);
    setShowModal(true);
  };

  const handleDelete = (image) => {
    setImages(images.filter((img) => img.url !== image.url));
  };

  const getSizeClass = (size) => {
    switch (size) {
      case "small":
        return "h-24";
      case "large":
        return "h-64";
      default:
        return "h-48";
    }
  };

  const getStyleClass = (style) => {
    switch (style) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-none";
      default:
        return "rounded";
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <nav className="flex justify-between items-center mb-8 bg-white p-4 shadow-md rounded-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800">MyPics</h1>
        <button
          onClick={() => document.getElementById('fileInput').click()}
          className="p-2 bg-indigo-500 text-white rounded-lg shadow-sm hover:bg-indigo-600 transition-colors ml-4"
        >
          Upload
        </button>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/png, image/jpeg, image/heic"
          onChange={handleImageUpload}
          className="hidden"
        />
      </nav>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
              <img
                src={image.url}
                alt="Uploaded"
                className={`w-full ${getSizeClass(image.size)} object-cover ${getStyleClass(image.style)} mb-2`}
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center w-full">
                  <p className="text-center font-semibold text-gray-800">{image.title}</p>
                  <p className="text-center text-gray-600">{image.caption}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v.01M12 12v.01M12 18v.01"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(image)}
                    className="p-1 bg-red-200 rounded-full hover:bg-red-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">No images uploaded yet.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Title, Caption, Size, and Style</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
            />
            <textarea
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full mb-2"
            />
            <div className="mb-2">
              <label className="block mb-1">Size:</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Style:</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="rounded">Rounded</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 p-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="p-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
