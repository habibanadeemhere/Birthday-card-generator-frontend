import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toPng } from "html-to-image";
import CardPreview from "../components/CardPreview";
import { fetchCard } from "../api";

export default function SharedCardPage() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    fetchCard(id)
      .then(setCard)
      .catch((err) => setError(err.response?.data?.error || "This card couldn't be loaded."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDownload() {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
    const link = document.createElement("a");
    link.download = "birthday-card.png";
    link.href = dataUrl;
    link.click();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (loading) return <div className="loading-row">Loading card…</div>;

  if (error || !card) {
    return (
      <div className="empty-state">
        <span className="emoji">🔍</span>
        {error || "Card not found."}
        <div style={{ marginTop: 16 }}>
          <Link to="/" className="link-btn">
            ← Create a new one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shared-page">
      <Link to="/gallery" className="back-link">
        ← Back to gallery
      </Link>

      <CardPreview
        ref={cardRef}
        recipientName={card.recipientName}
        senderName={card.senderName}
        message={card.message}
        themeId={card.theme}
        fontId={card.font}
        photo={card.photo}
      />

      <div className="shared-actions">
        <button className="btn btn-ghost" type="button" onClick={handleDownload}>
          ⬇ Download PNG
        </button>
        <button className="btn btn-primary" type="button" onClick={handleCopyLink}>
          {copied ? "Link copied!" : "🔗 Copy share link"}
        </button>
      </div>
    </div>
  );
}
