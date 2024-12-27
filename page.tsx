"use client";
import { useState, useEffect } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";

export default function Home() {
  const [images, setImages] = useState<string[]>([]); // Ensure this always stays an array of strings
  const [file, setFile] = useState<File | null>(null);

  // Mantine File Upload Handler
  const handleMantineFileUpload = (uploadedFile: File | null) => {
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);

      // Safely create a URL and append to images
      const url = URL.createObjectURL(uploadedFile);
      setImages((prevImages) => (Array.isArray(prevImages) ? [...prevImages, url] : [url]));
    } else {
      console.error("Uploaded file is not an image.");
    }
  };

  // Native File Upload Handler
  const handleNativeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => URL.createObjectURL(file));
      setImages((prevImages) => (Array.isArray(prevImages) ? [...prevImages, ...urls] : urls));
    }
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <main className="p-4">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold px-5">My Pinterest App</h1>
      </nav>

      {/* Mantine File Upload */}
      <Group justify="center" className="mb-4">
        <FileButton
          onChange={handleMantineFileUpload}
          accept="image/png,image/jpeg"
        >
          {(props) => <Button {...props}>Upload image with Mantine</Button>}
        </FileButton>
      </Group>

      {/* Display picked file */}
      {file && (
        <Text size="sm" align="center" mt="sm" className="mb-4">
          Picked file: {file.name}
        </Text>
      )}

      {/* Native File Upload */}
      <input
        type="file"
        multiple
        onChange={handleNativeImageUpload}
        className="mb-4"
      />

      {/* Uploaded Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded"
            />
          ))
        ) : (
          <Text align="center">No images uploaded yet.</Text>
        )}
      </div>
    </main>
  );
}