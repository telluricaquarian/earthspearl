export function FloatingShellSeal() {
  return (
    <div className="floating-shell-seal" aria-hidden="true">
      <div className="floating-shell-seal__ring" />
      <div className="floating-shell-seal__button">
        <img
          src="/wtmb.png"
          alt=""
          className="floating-shell-seal__image img-protected"
          draggable={false}
        />
      </div>

      <style>{`
        .floating-shell-seal {
          position: fixed;
          right: max(18px, env(safe-area-inset-right));
          bottom: max(18px, env(safe-area-inset-bottom));
          z-index: 40;
          width: clamp(64px, 13vw, 82px);
          aspect-ratio: 1;
          pointer-events: none;
        }

        .floating-shell-seal__ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: conic-gradient(
            from 0deg,
            rgba(245, 234, 215, 0.28),
            rgba(196, 154, 108, 0.72),
            rgba(72, 46, 32, 0.42),
            rgba(221, 202, 174, 0.58),
            rgba(245, 234, 215, 0.28)
          );
          filter: drop-shadow(0 10px 24px rgba(16, 9, 5, 0.28));
          animation: floatingShellSealRing 12s linear infinite;
        }

        .floating-shell-seal__button {
          position: absolute;
          inset: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          overflow: hidden;
          background: linear-gradient(160deg, #21160F 0%, #17110D 62%, #100B08 100%);
          border: 1px solid rgba(245, 234, 215, 0.16);
          box-shadow:
            inset 0 1px 0 rgba(245, 234, 215, 0.1),
            inset 0 -1px 0 rgba(196, 154, 108, 0.1),
            0 12px 28px rgba(16, 9, 5, 0.3);
        }

        .floating-shell-seal__image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 14px;
        }

        @keyframes floatingShellSealRing {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .floating-shell-seal {
            right: max(14px, env(safe-area-inset-right));
            bottom: max(16px, env(safe-area-inset-bottom));
            width: 64px;
          }

          .floating-shell-seal__image {
            padding: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-shell-seal__ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
