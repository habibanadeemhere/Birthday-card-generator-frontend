import React, { useRef } from "react";
import ThemeSwatches from "./ThemeSwatches";
import { FONTS, SAMPLE_MESSAGES } from "../themes";

const MAX_MESSAGE = 220;

export default function CardEditor({ form, setForm }) {
  const fileInputRef = useRef(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Please choose a photo under 1.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result);
    reader.readAsDataURL(file);
  }

  function surpriseMessage() {
    const random = SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)];
    update("message", random);
  }

  return (
    <div className="panel">
      <h2>Design the card</h2>

      <div className="field">
        <label htmlFor="recipientName">Recipient's name</label>
        <input
          id="recipientName"
          type="text"
          maxLength={60}
          placeholder="e.g. Ayesha"
          value={form.recipientName}
          onChange={(e) => update("recipientName", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="senderName">Your name</label>
        <input
          id="senderName"
          type="text"
          maxLength={60}
          placeholder="e.g. Habiba"
          value={form.senderName}
          onChange={(e) => update("senderName", e.target.value)}
        />
      </div>

      <div className="field">
        <div className="field-row">
          <label htmlFor="message">Birthday message</label>
          <button type="button" className="link-btn" onClick={surpriseMessage}>
            Surprise me
          </button>
        </div>
        <textarea
          id="message"
          rows={4}
          maxLength={MAX_MESSAGE}
          placeholder="Write something only this person would get..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
        <div className="char-count">
          {form.message.length}/{MAX_MESSAGE}
        </div>
      </div>

      <div className="field">
        <label>Theme</label>
        <ThemeSwatches value={form.theme} onChange={(id) => update("theme", id)} />
      </div>

      <div className="field" style={{ marginTop: 26 }}>
        <label>Headline font</label>
        <div className="pill-row">
          {FONTS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`pill ${form.font === f.id ? "active" : ""}`}
              style={{ fontFamily: f.family }}
              onClick={() => update("font", f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Photo (optional)</label>
        <div className="photo-upload">
          <div className="photo-preview">
            {form.photo ? <img src={form.photo} alt="preview" /> : "🙂"}
          </div>
          <button type="button" className="upload-btn" onClick={() => fileInputRef.current?.click()}>
            {form.photo ? "Change photo" : "Upload photo"}
          </button>
          {form.photo && (
            <button type="button" className="remove-photo" onClick={() => update("photo", null)}>
              Remove
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhoto}
          />
        </div>
      </div>
    </div>
  );
}
