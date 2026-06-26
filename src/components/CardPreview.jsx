import React, { forwardRef } from "react";
import { getTheme, FONTS } from "../themes";

function Pattern({ type, accent, accent2 }) {
  // Lightweight inline SVGs, tiled as a background pattern per theme.
  switch (type) {
    case "confetti":
      return (
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="confettiPat" width="46" height="46" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="10" r="2.2" fill={accent} />
              <rect x="22" y="4" width="6" height="3" fill={accent2} transform="rotate(20 25 6)" />
              <circle cx="36" cy="24" r="1.6" fill="#fff" opacity="0.7" />
              <rect x="10" y="30" width="5" height="3" fill={accent} transform="rotate(-15 12 31)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#confettiPat)" />
        </svg>
      );
    case "stars":
      return (
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="starPat" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.4" fill="#fff" />
              <circle cx="34" cy="20" r="1" fill="#fff" opacity="0.7" />
              <circle cx="48" cy="44" r="1.6" fill={accent} />
              <circle cx="18" cy="50" r="1" fill="#fff" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#starPat)" />
        </svg>
      );
    case "balloons":
      return (
        <svg width="100%" height="100%" preserveAspectRatio="none" style={{ opacity: 0.35 }}>
          <defs>
            <pattern id="balloonPat" width="90" height="120" patternUnits="userSpaceOnUse">
              <ellipse cx="20" cy="24" rx="13" ry="17" fill={accent} opacity="0.5" />
              <ellipse cx="65" cy="60" rx="11" ry="15" fill="#fff" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#balloonPat)" />
        </svg>
      );
    case "petals":
      return (
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="petalPat" width="54" height="54" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="14" r="3" fill={accent} opacity="0.55" />
              <circle cx="34" cy="38" r="2.2" fill="#fff" opacity="0.3" />
              <circle cx="44" cy="10" r="1.6" fill={accent2} opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#petalPat)" />
        </svg>
      );
    case "rays":
      return (
        <svg width="100%" height="100%" viewBox="0 0 460 320" preserveAspectRatio="none" style={{ opacity: 0.25 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x={i * 50 - 60}
              y="-40"
              width="14"
              height="420"
              fill="#fff"
              opacity="0.18"
              transform={`rotate(18 ${i * 50} 160)`}
            />
          ))}
        </svg>
      );
    default:
      return (
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="sparkPat" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M10 4 L11.4 8.6 L16 10 L11.4 11.4 L10 16 L8.6 11.4 L4 10 L8.6 8.6 Z" fill={accent} opacity="0.5" />
              <circle cx="36" cy="32" r="1.3" fill="#fff" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sparkPat)" />
        </svg>
      );
  }
}

const CardPreview = forwardRef(function CardPreview(
  { recipientName, senderName, message, themeId, fontId, photo },
  ref
) {
  const theme = getTheme(themeId);
  const font = FONTS.find((f) => f.id === fontId) || FONTS[0];
  const initial = (recipientName || "?").trim().charAt(0).toUpperCase();
  const issueDate = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ticket-wrap" ref={ref}>
      <div
        className="ticket"
        style={{
          background: theme.gradient,
          color: theme.dark === false ? "#3a0f12" : "#fff",
        }}
      >
        <div className="ticket-stub">
          <span className="stub-label">Birthday Pass</span>
          <div className="stub-avatar">
            {photo ? <img src={photo} alt={recipientName} /> : initial}
          </div>
          <div className="stub-dots">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        <div className="ticket-main">
          <div className="ticket-pattern">
            <Pattern type={theme.pattern} accent={theme.accent} accent2={theme.accent2} />
          </div>

          <div className="ticket-eyebrow">Admit One &middot; Party Pass</div>
          <h2 className="ticket-heading" style={{ fontFamily: font.family }}>
            Happy Birthday
          </h2>
          <div className="ticket-to">to {recipientName || "Someone Wonderful"}</div>
          <p className="ticket-message">
            {message ||
              "Wishing you a day filled with laughter, love, and just the right amount of cake."}
          </p>

          <div className="ticket-footer">
            <div className="ticket-from">
              With love,
              <b>{senderName || "A friend"}</b>
            </div>
            <div>
              <div className="ticket-barcode">
                {Array.from({ length: 22 }).map((_, i) => (
                  <i key={i} style={{ height: `${8 + ((i * 7) % 14)}px` }} />
                ))}
              </div>
              <div className="ticket-date">ISSUED {issueDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CardPreview;
