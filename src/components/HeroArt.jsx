/** Hero illustration — original flat scene drawn for KrishiProhori. */
export default function HeroArt() {
  const stalk = (x, y, s = 1, flip = 1) => (
    <g key={`${x}-${y}-${s}-${flip}`} transform={`translate(${x} ${y}) scale(${s * flip} ${s})`}>
      <path d="M0 0 C-2 -14 -2 -26 0 -38" stroke="#0B5D45" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M0 -12c-7 0-11-4-12-11 7 0 11 4 12 11Z" fill="#168E5A" />
      <path d="M0 -20c7 0 11-4 12-11-7 0-11 4-12 11Z" fill="#0B5D45" />
      <path d="M0 -30c-6 0-9-3-10-9 6 0 9 3 10 9Z" fill="#168E5A" />
      <ellipse cx="0" cy="-40" rx="3" ry="6" fill="#D5F36A" />
    </g>
  )

  return (
    <svg viewBox="0 0 520 430" className="hero-art" role="img" aria-label="ক্ষেত ও ধানগাছের চিত্রণ">
      <rect x="0" y="0" width="520" height="430" rx="28" fill="#EAF6E8" />

      {/* sun + sky */}
      <circle cx="418" cy="86" r="46" fill="#D5F36A" opacity="0.75" />
      <circle cx="418" cy="86" r="64" fill="#D5F36A" opacity="0.25" />
      <ellipse cx="120" cy="82" rx="52" ry="20" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="156" cy="70" rx="34" ry="18" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="266" cy="58" rx="30" ry="13" fill="#FFFFFF" opacity="0.75" />

      {/* hills */}
      <path d="M0 246c70-52 130-52 200-14s140 34 200-16 120-36 120-36v250H0Z" fill="#168E5A" />
      <path d="M0 300c80-40 150-36 230 0s170 30 290-20v150H0Z" fill="#0B5D45" />

      {/* field rows */}
      <path d="M0 352c90-26 180-30 270-10s170 20 250 4" stroke="#FFF8EC" strokeWidth="3" fill="none" opacity="0.35" />
      <path d="M0 382c90-24 180-26 270-8s170 18 250 4" stroke="#FFF8EC" strokeWidth="3" fill="none" opacity="0.25" />

      {/* rice stalks */}
      {[
        [70, 356, 1.15],
        [140, 366, 1.35],
        [214, 372, 1.15],
        [300, 368, 1.3],
        [372, 360, 1.15],
        [446, 352, 1.3],
        [106, 336, 0.95],
        [336, 342, 1],
      ].map(([x, y, s]) => stalk(x, y, s))}

      {/* farmer with conical hat holding a sapling */}
      <g transform="translate(238 246)">
        <path d="M-26 -46 0 -76l26 30Z" fill="#FFF5D9" />
        <path d="M-30 -46h60" stroke="#E8C24A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="0" cy="-30" r="13" fill="#1F2937" />
        <path d="M-15 -14h30a6 6 0 0 1 6 6v34h-42v-34a6 6 0 0 1 6-6Z" fill="#083D32" />
        <path d="M-9 26v26M9 26v26" stroke="#083D32" strokeWidth="10" strokeLinecap="round" />
        <path d="M15 -6c12 2 22 10 26 22" stroke="#083D32" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M-15 -6c-10 4-16 12-18 22" stroke="#083D32" strokeWidth="9" fill="none" strokeLinecap="round" />
        {/* sapling in hand */}
        <path d="M44 20c0-8 0-14 0-20" stroke="#0B5D45" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 8c-6 0-10-4-10-10 6 0 10 4 10 10Z" fill="#168E5A" />
        <path d="M44 4c0-5 4-9 10-9 0 5-4 9-10 9Z" fill="#D5F36A" />
        <path d="M36 22h16l-2 8H38Z" fill="#FF9F1C" />
      </g>

      {/* foreground soil mound */}
      <path d="M148 430c14-40 46-58 92-58s78 18 92 58Z" fill="#062F28" opacity="0.55" />
    </svg>
  )
}
