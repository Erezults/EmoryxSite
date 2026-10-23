import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Emoryx — Your private vault. On your device.';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(1200px 600px at 18% 12%, rgba(124,58,237,0.55), transparent 65%), radial-gradient(900px 500px at 92% 88%, rgba(37,99,235,0.55), transparent 65%), #08080B',
          padding: 80,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* faint top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: '#7C3AED',
              boxShadow: '0 0 16px #7C3AED',
              display: 'block',
            }}
          />
          <span>EMORYX · iOS &amp; MAC</span>
        </div>

        {/* big logo + name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 36,
          }}
        >
          {/* simple glyph block as a stand-in for the actual icon (ImageResponse can't easily inline external PNG) */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 28,
              background:
                'linear-gradient(135deg, #C026D3 0%, #7C3AED 35%, #2563EB 70%, #38BDF8 100%)',
              boxShadow:
                '0 30px 70px -20px rgba(124,58,237,0.6), inset 0 0 0 2px rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 78,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: -4,
            }}
          >
            E
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: -3,
            }}
          >
            Emoryx
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: 80,
            lineHeight: 1.05,
            letterSpacing: -2.5,
            maxWidth: 950,
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 0.35em',
          }}
        >
          <span>Your private vault.</span>
          <span
            style={{
              backgroundImage:
                'linear-gradient(110deg, #C026D3, #7C3AED 50%, #38BDF8)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            On your device.
          </span>
        </div>

        {/* tagline strip */}
        <div
          style={{
            marginTop: 32,
            display: 'flex',
            gap: 28,
            alignItems: 'center',
            fontSize: 20,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: 0.5,
          }}
        >
          <span>No accounts.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>No tracking.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>No servers.</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ color: '#fff' }}>End-to-end encrypted.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
