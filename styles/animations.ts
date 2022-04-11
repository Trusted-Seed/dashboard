import { keyframes } from '@emotion/react';

const firstColor = '#1BDD9D';
const secondColor = '#1BDD9D';
// const firstColor = '#2CC9CC';
// const secondColor = '#2CC9CC';
const glow = keyframes`
  from {
    box-shadow: 0 0 15px #000, 0 0 15px ${firstColor}, 0 0 20px ${firstColor}, 0 0 25px ${firstColor}, 0 0 30px ${firstColor}, 0 0 35px ${firstColor};
    // max-width: 1rem;
    // max-height: 1rem;
  }
  to {
    box-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px ${secondColor}, 0 0 20px ${secondColor}, 0 0 25px ${secondColor}, 0 0 30px ${secondColor}, 0 0 35px ${secondColor}, 0 0 40px ${secondColor};
    // max-width: 0.75rem;
    // max-height: 0.75rem;
  }
`;

export const GLOW_ANIMATION = `${glow} 1s ease-in-out infinite alternate`;
