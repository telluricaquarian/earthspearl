"use client"

const testimonials = [
  "best moisturizer i've ever used!!!! the only product to ever keep my skin hydrated throughout the winter szn ❄️ just purchased my next refill 👀✅",
  "Honestly, your tallow butter is so smooth, smells great, and my body loves it. I feel hydrated and fresh wearing this :)",
  "This is heavenly on the skin! Thank you!",
  "This stuff is amazing!!!! The only product I wear on my face now",
  "I cracked open the new jar the other week and it is BLESSED!!! sooo creamy and moisturizing I honestly rly love the tallow need it 4ever",
]

const separator = <span className="mx-4 text-white/20 text-[10px] select-none">🐚</span>

export function TestimonialMarquee() {
  const track = [...testimonials, ...testimonials]

  return (
    <div className="mb-4">
      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 px-1 mb-2.5">
        what customers are saying
      </p>

      {/* outer mask: fades at edges */}
      <div
        className="overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* scrolling track — pauses on hover */}
        <div
          className="flex w-max"
          style={{
            animation: "marquee 45s linear infinite",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {track.map((text, i) => (
            <span key={i} className="flex items-center flex-shrink-0">
              <span
                className="text-[12px] text-white/65 whitespace-nowrap"
                style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}
              >
                &ldquo;{text}&rdquo;
              </span>
              {separator}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
