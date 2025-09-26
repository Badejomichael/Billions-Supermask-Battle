/* app/api/og/route.tsx */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const winner = searchParams.get('winner') || '/masks/mask1.png';
  const loser = searchParams.get('loser') || '/masks/mask2.png';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #001f3f, #0074D9)',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Winner */}
        <div style={{ textAlign: 'center', marginRight: 40 }}>
          <img
            src={winner}
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '20px',
              border: '6px solid #FFD700',
            }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 48,
              fontWeight: 'bold',
              color: '#FFD700',
            }}
          >
            Winner 👑
          </div>
        </div>

        {/* VS */}
        <div style={{ fontSize: 72, fontWeight: 'bold', color: '#fff' }}>⚔️</div>

        {/* Loser */}
        <div style={{ textAlign: 'center', marginLeft: 40 }}>
          <img
            src={loser}
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '20px',
              opacity: 0.4,
            }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              fontWeight: 'bold',
              color: '#ccc',
            }}
          >
            Defeated
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            width: '100%',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Supermask Battles ⚡ | Billions Network
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
