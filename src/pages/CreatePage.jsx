import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import CardEditor from "../components/CardEditor";
import CardPreview from "../components/CardPreview";
import { createCard } from "../api";

const DEFAULT_FORM = {
  recipientName: "",
  senderName: "",
  message: "",
  theme: "midnight-glass",
  font: "playfair",
  photo: null,
};

function burst() {
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 38,
    origin: { y: 0.6 },
    colors: ["#6366f1", "#a855f7", "#f6c453", "#ffffff"],
  });
}

export default function CreatePage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'error' | 'success', text }
  const cardRef = useRef(null);
  const navigate = useNavigate();

  async function handleDownload() {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.download = `${(form.recipientName || "wishcard").replace(/\s+/g, "-").toLowerCase()}-birthday-card.png`;
      link.href = dataUrl;
      link.click();
      burst();
    } catch (err) {
      setStatus({ type: "error", text: "Couldn't export the image. Try again." });
    }
  }

  async function handleSave() {
    if (!form.recipientName.trim() || !form.senderName.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Add a recipient, your name, and a message first." });
      return;
    }

    setSaving(true);
    setStatus(null);
    try {
      const saved = await createCard(form);
      burst();
      setStatus({ type: "success", text: "Saved! Taking you to the shareable link..." });
      setTimeout(() => navigate(`/card/${saved._id}`), 700);
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.error || "Couldn't reach the server. Is the backend running?",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Birthday Card Generator</span>
        <h1>Turn a few words into a keepsake.</h1>
        <p>
          Pick a theme, write something real, and export it as an image — or save it to get a
          link you can send.
        </p>
      </div>

      <div className="studio">
        <div>
          <CardEditor form={form} setForm={setForm} />
          <div className="actions">
            <button className="btn btn-ghost" type="button" onClick={handleDownload}>
              ⬇ Download PNG
            </button>
            <button className="btn btn-primary" type="button" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "💾 Save & get link"}
            </button>
          </div>
          {status && <div className={`status-msg ${status.type}`}>{status.text}</div>}
        </div>

        <div className="stage">
          <CardPreview ref={cardRef} {...form} themeId={form.theme} fontId={form.font} />
        </div>
      </div>
    </>
  );
}
