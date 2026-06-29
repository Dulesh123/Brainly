const BrainLogo = ({ width = 50, height = 50 } ) => (
  <svg width={width} height={height} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(200,220)">
      <path d="M-4,-55 C-14,-68 -42,-72 -62,-56 C-80,-42 -82,-18 -72,0 C-64,14 -52,22 -52,36 C-52,48 -42,58 -28,58 C-18,58 -10,52 -8,44 C-5,48 -2,50 0,50 L0,-55 Z" fill="#ffffff"/>
      <path d="M4,-55 C14,-68 42,-72 62,-56 C80,-42 82,-18 72,0 C64,14 52,22 52,36 C52,48 42,58 28,58 C18,58 10,52 8,44 C5,48 2,50 0,50 L0,-55 Z" fill="#ffffff"/>
      <line x1="0" y1="-55" x2="0" y2="50" stroke="transparent" strokeWidth="2.5"/>
      <path d="M-58,-18 C-46,-28 -32,-22 -28,-8" fill="none" stroke="transparent" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M-60,8 C-48,0 -34,6 -30,20" fill="none" stroke="transparent" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M-48,34 C-38,26 -28,30 -24,44" fill="none" stroke="transparent" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M58,-18 C46,-28 32,-22 28,-8" fill="none" stroke="transparent" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M60,8 C48,0 34,6 30,20" fill="none" stroke="transparent" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M48,34 C38,26 28,30 24,44" fill="none" stroke="transparent" strokeWidth="2.2" strokeLinecap="round"/>
    </g>
  </svg>
);

export default BrainLogo;