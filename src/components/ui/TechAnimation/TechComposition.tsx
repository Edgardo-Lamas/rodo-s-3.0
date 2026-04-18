import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const CODE_LINES = [
  { text: "const repair = async (pc) => {", color: "#60a5fa" },
  { text: "  await diagnose(system);",       color: "#c4b5fd" },
  { text: "  await clean(virus, cache);",    color: "#c4b5fd" },
  { text: '  return { ok: true };',           color: "#34d399" },
  { text: "};",                              color: "#60a5fa" },
];

export const TechComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Breathing glow (continuous) */
  const pulse = Math.sin((frame / 45) * Math.PI * 2) * 0.5 + 0.5;

  /* Circuit trace draw-in: frames 5 → 50 */
  const traceOffset = (dashLen: number) =>
    interpolate(frame, [5, 50], [dashLen, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  /* Card spring entrances (staggered) */
  const hw = spring({ frame: frame - 5,  fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 30 });
  const cd = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 30 });
  const wb = spring({ frame: frame - 38, fps, config: { damping: 14, stiffness: 120 }, durationInFrames: 30 });

  /* Code line typing — staggered opacity */
  const lineOp = (i: number) =>
    interpolate(frame, [65 + i * 15, 77 + i * 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  /* Cursor blink every 18 frames */
  const cursor = Math.floor(frame / 18) % 2;

  /* LED pulse per pin — different phase per index */
  const led = (phase: number) =>
    interpolate(Math.sin((frame / 30 + phase) * Math.PI), [-1, 1], [0.25, 1]);

  return (
    <AbsoluteFill>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 560 640"
        style={{
          background:
            "linear-gradient(150deg, #050c1a 0%, #0a1533 50%, #040910 100%)",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="gb" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="go" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.04)" />
          </pattern>
        </defs>

        {/* Dot grid */}
        <rect width="560" height="640" fill="url(#grid)" />

        {/* Ambient glow orbs */}
        <circle cx="430" cy="80"  r={80 + pulse * 22} fill="#4a9eff" opacity={0.05 + pulse * 0.04} />
        <circle cx="85"  cy="520" r={100 + pulse * 28} fill="#e8820a" opacity={0.06 + pulse * 0.04} />
        <circle cx="290" cy="315" r={55 + pulse * 14}  fill="#4a9eff" opacity={0.03} />

        {/* ── Circuit traces ── */}
        {/* HW → Terminal */}
        <path
          d="M 252 118 C 278 118 283 168 308 168"
          fill="none" stroke="#4a9eff" strokeWidth="1.5" opacity="0.5"
          strokeDasharray="125" strokeDashoffset={traceOffset(125)}
        />
        {/* Terminal → Web */}
        <path
          d="M 418 300 C 418 338 348 348 302 378"
          fill="none" stroke="#4a9eff" strokeWidth="1.5" opacity="0.4"
          strokeDasharray="135" strokeDashoffset={traceOffset(135)}
        />
        {/* HW → Web */}
        <path
          d="M 142 222 C 142 305 168 348 188 378"
          fill="none" stroke="#e8820a" strokeWidth="1.5" opacity="0.35"
          strokeDasharray="168" strokeDashoffset={traceOffset(168)}
        />

        {/* Circuit nodes */}
        <circle cx="252" cy="118" r={3 + pulse * 1.5} fill="#4a9eff" filter="url(#gb)" opacity={0.65 + pulse * 0.35} />
        <circle cx="418" cy="300" r={3 + pulse * 1.5} fill="#4a9eff" filter="url(#gb)" opacity={0.55 + pulse * 0.3}  />
        <circle cx="142" cy="222" r={3 + pulse * 1.5} fill="#e8820a" filter="url(#go)" opacity={0.65 + pulse * 0.35} />

        {/* ═══════════════════════════════════
            CARD 1 — Hardware / CPU
        ═══════════════════════════════════ */}
        <g transform={`translate(28, ${28 + (1 - hw) * 30})`} opacity={hw}>
          {/* Card */}
          <rect width="228" height="198" rx="14" fill="#0c1b33" stroke="#4a9eff" strokeWidth="1" strokeOpacity="0.3" />
          {/* Header */}
          <rect width="228" height="38" rx="14" fill="#091526" />
          <rect y="24" width="228" height="14" fill="#091526" />
          <circle cx="20" cy="19" r="5" fill="#e8820a" />
          <text x="34" y="24" fill="#e5e7eb" fontSize="10.5" fontFamily="monospace" fontWeight="600" opacity="0.9">
            Hardware · PC Repair
          </text>

          {/* CPU die */}
          <rect x="79" y="57" width="70" height="70" rx="6" fill="#050d1c" stroke="#4a9eff" strokeWidth="1.5" strokeOpacity="0.7" />
          <rect x="89" y="67" width="50" height="50" rx="3" fill="#0a1930" stroke="#4a9eff" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="114" y="96"  fill="#4a9eff" fontSize="9"   fontFamily="monospace" textAnchor="middle" opacity="0.85">CPU</text>
          <text x="114" y="109" fill="#e8820a" fontSize="7.5" fontFamily="monospace" textAnchor="middle" opacity="0.7">RODO.v3</text>

          {/* Pins — top & bottom */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`pin-tb-${i}`}>
              <rect x={89 + i * 13} y="49"  width="7" height="9" rx="1" fill="#4a9eff" opacity={led(i * 0.4)} />
              <rect x={89 + i * 13} y="126" width="7" height="9" rx="1" fill="#4a9eff" opacity={led(i * 0.4 + 1.2)} />
            </g>
          ))}
          {/* Pins — left & right */}
          {[0, 1, 2].map((i) => (
            <g key={`pin-lr-${i}`}>
              <rect x="64"  y={72 + i * 14} width="9" height="6" rx="1" fill="#e8820a" opacity={led(i * 0.6)} />
              <rect x="155" y={72 + i * 14} width="9" height="6" rx="1" fill="#e8820a" opacity={led(i * 0.6 + 1.8)} />
            </g>
          ))}

          {/* Status LEDs */}
          {[
            { cx: 190, fill: "#34d399", phase: 0,   label: "PWR" },
            { cx: 174, fill: "#e8820a", phase: 1,   label: "ERR" },
            { cx: 158, fill: "#4a9eff", phase: 2,   label: "NET" },
          ].map((l) => (
            <g key={l.label}>
              <circle cx={l.cx} cy="158" r="5" fill={l.fill} filter="url(#gb)" opacity={led(l.phase)} />
              <text x={l.cx} y="172" fill="#4b5563" fontSize="6" fontFamily="monospace" textAnchor="middle">{l.label}</text>
            </g>
          ))}

          {/* Inner CPU glow */}
          <rect x="79" y="57" width="70" height="70" rx="6" fill="#e8820a" opacity={0.02 + pulse * 0.07} />
        </g>

        {/* ═══════════════════════════════════
            CARD 2 — Terminal / Software
        ═══════════════════════════════════ */}
        <g transform={`translate(300, ${76 + (1 - cd) * 30})`} opacity={cd}>
          {/* Card */}
          <rect width="232" height="228" rx="14" fill="#080e1e" stroke="#4a9eff" strokeWidth="1" strokeOpacity="0.22" />
          {/* Header */}
          <rect width="232" height="38" rx="14" fill="#0b1525" />
          <rect y="24" width="232" height="14" fill="#0b1525" />
          {/* Traffic lights */}
          <circle cx="20" cy="19" r="4.5" fill="#ff5f57" opacity="0.9" />
          <circle cx="35" cy="19" r="4.5" fill="#febc2e" opacity="0.9" />
          <circle cx="50" cy="19" r="4.5" fill="#28c840" opacity="0.9" />
          <text x="141" y="24" fill="#4a9eff" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.6">
            bash — rodos-3
          </text>

          {/* Code lines */}
          {CODE_LINES.map((line, i) => (
            <text
              key={i}
              x="12" y={56 + i * 27}
              fill={line.color}
              fontSize="10"
              fontFamily="'Courier New', monospace"
              opacity={lineOp(i)}
            >
              {line.text}
            </text>
          ))}

          {/* Prompt + blinking cursor */}
          <text
            x="12" y={56 + CODE_LINES.length * 27}
            fill="#34d399" fontSize="10" fontFamily="monospace"
            opacity={lineOp(CODE_LINES.length - 1)}
          >
            $
          </text>
          <rect
            x="24" y={44 + CODE_LINES.length * 27}
            width="7" height="12" fill="#4a9eff"
            opacity={cursor * lineOp(CODE_LINES.length - 1)}
          />
        </g>

        {/* ═══════════════════════════════════
            CARD 3 — Browser / Web
        ═══════════════════════════════════ */}
        <g transform={`translate(62, ${358 + (1 - wb) * 30})`} opacity={wb}>
          {/* Card */}
          <rect width="436" height="228" rx="14" fill="#080e1e" stroke="#4a9eff" strokeWidth="1" strokeOpacity="0.18" />
          {/* Browser chrome */}
          <rect width="436" height="38" rx="14" fill="#0c1423" />
          <rect y="24" width="436" height="14" fill="#0c1423" />
          <circle cx="20" cy="19" r="4.5" fill="#ff5f57" opacity="0.8" />
          <circle cx="35" cy="19" r="4.5" fill="#febc2e" opacity="0.8" />
          <circle cx="50" cy="19" r="4.5" fill="#28c840" opacity="0.8" />
          {/* URL bar */}
          <rect x="70" y="9" width="295" height="20" rx="5" fill="#050c1a" stroke="#4a9eff" strokeWidth="0.5" strokeOpacity="0.5" />
          <text x="88"  y="23" fill="#34d399" fontSize="9" fontFamily="monospace" opacity="0.9">https://</text>
          <text x="136" y="23" fill="#e5e7eb" fontSize="9" fontFamily="monospace">rodos3.com.ar</text>

          {/* Navbar */}
          <rect x="12" y="48" width="412" height="24" rx="4" fill="#0f1f3a" opacity="0.7" />
          <text x="22" y="64" fill="#e8820a" fontSize="10" fontFamily="monospace" fontWeight="bold">Rodo&apos;s</text>
          <text x="62" y="64" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">3.0</text>
          {["Servicios", "Proceso", "FAQs"].map((lbl, i) => (
            <text key={lbl} x={120 + i * 82} y="64" fill="#9ca3af" fontSize="8.5" fontFamily="monospace">{lbl}</text>
          ))}
          <rect x="342" y="52" width="78" height="16" rx="8" fill="#e8820a" opacity="0.9" />
          <text x="381" y="64" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">WhatsApp</text>

          {/* Hero text block */}
          <rect x="12" y="82"  width="195" height="10" rx="3" fill="#ffffff" opacity="0.45" />
          <rect x="12" y="98"  width="220" height="7"  rx="3" fill="#9ca3af" opacity="0.3"  />
          <rect x="12" y="111" width="175" height="7"  rx="3" fill="#9ca3af" opacity="0.22" />
          <rect x="12" y="126" width="88"  height="18" rx="9" fill="#e8820a" opacity="0.88" />
          <text x="56" y="139" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Consultar</text>

          {/* Service micro-cards */}
          {[
            { label: "Hardware", color: "#e8820a", x: 225 },
            { label: "Antivirus", color: "#4a9eff", x: 298 },
            { label: "Web",      color: "#34d399", x: 371 },
          ].map((c) => (
            <g key={c.label} transform={`translate(${c.x}, 80)`}>
              <rect width="62" height="72" rx="6" fill="#0f1f3a" opacity="0.8" />
              <circle cx="31" cy="30" r="14" fill={c.color} opacity="0.15" />
              <circle cx="31" cy="30" r="7"  fill={c.color} opacity={0.5 + pulse * 0.3} filter="url(#gb)" />
              <text x="31" y="60" fill="#9ca3af" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{c.label}</text>
            </g>
          ))}

          {/* Footer */}
          <rect x="12" y="162" width="412" height="1"  fill="#4a9eff" opacity="0.1" />
          <rect x="12" y="172" width="412" height="44" rx="6" fill="#050c1a" opacity="0.5" />
          <text x="218" y="198" fill="#4b5563" fontSize="8" fontFamily="monospace" textAnchor="middle">
            © 2026 Rodo&apos;s 3.0 · La Plata · A domicilio y remoto
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
