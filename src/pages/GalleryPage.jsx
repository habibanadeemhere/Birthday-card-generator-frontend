import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPreview from "../components/CardPreview";
import { fetchGallery } from "../api";

export default function GalleryPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGallery()
      .then(setCards)
      .catch(() =>
        setError("Couldn't load the gallery. Make sure the backend and database are running.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Public Gallery</span>
        <h1>Recently issued passes.</h1>
        <p>Every card that's been saved shows up here. Tap one to open its shareable page.</p>
      </div>

      {loading && <div className="loading-row">Loading cards…</div>}

      {!loading && error && (
        <div className="empty-state">
          <span className="emoji">⚠️</span>
          {error}
        </div>
      )}

      {!loading && !error && cards.length === 0 && (
        <div className="empty-state">
          <span className="emoji">🎈</span>
          No cards yet — be the first to create one.
        </div>
      )}

      {!loading && !error && cards.length > 0 && (
        <div className="gallery-grid">
          {cards.map((card) => (
            <div className="gallery-cell" key={card._id} onClick={() => navigate(`/card/${card._id}`)}>
              <CardPreview
                recipientName={card.recipientName}
                senderName={card.senderName}
                message={card.message}
                themeId={card.theme}
                fontId={card.font}
                photo={null}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
