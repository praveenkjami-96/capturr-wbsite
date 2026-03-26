import { useState } from "react";

const faces = [
  { id: 1, name: "John", img: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Emily", img: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Alex", img: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Sara", img: "https://i.pravatar.cc/100?img=4" },
];

const photos = [
  { id: 1, url: "https://images.unsplash.com/photo-1", faces: [1, 2] },
  { id: 2, url: "https://images.unsplash.com/photo-2", faces: [2] },
  { id: 3, url: "https://images.unsplash.com/photo-3", faces: [1, 3] },
  { id: 4, url: "https://images.unsplash.com/photo-4", faces: [4] },
];

export default function FaceGallery() {
  const [selectedFaces, setSelectedFaces] = useState([]);

  const toggleFace = (id) => {
    setSelectedFaces((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const filteredPhotos =
    selectedFaces.length === 0
      ? photos
      : photos.filter((p) =>
          selectedFaces.every((faceId) => p.faces.includes(faceId))
        );

  return (
    <div className="face-gallery">
      
      {/* Face Row */}
      <div className="face-row">
        {faces.map((face) => (
          <div
            key={face.id}
            className={`face-item ${
              selectedFaces.includes(face.id) ? "active" : ""
            }`}
            onClick={() => toggleFace(face.id)}
          >
            <img src={face.img} alt={face.name} />
            <span>{face.name}</span>
          </div>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="photo-grid">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}