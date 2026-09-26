import React from 'react';

export function TomatoPlantArtwork({
  className = '',
  scanBox = true,
  userImage = null,
}: {
  className?: string;
  scanBox?: boolean;
  userImage?: string | null;
}) {
  return (
    <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-[#2c3d1e] ${className}`}>
      {userImage ? (
        <img
          src={userImage}
          alt="Field Crop Scan"
          className="w-full h-full object-cover"
        />
      ) : (
        /* Organic Rich Leaf Canopy Illustration mimicking the photographic tomato field closeup */
        <svg
          viewBox="0 0 600 450"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="soilBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c271e" />
              <stop offset="50%" stopColor="#3d3725" />
              <stop offset="100%" stopColor="#1e1c14" />
            </linearGradient>
            <linearGradient id="leafGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#688439" />
              <stop offset="40%" stopColor="#4f6c26" />
              <stop offset="100%" stopColor="#293c12" />
            </linearGradient>
            <linearGradient id="leafGradLight" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#8da94e" />
              <stop offset="60%" stopColor="#5d7b2d" />
              <stop offset="100%" stopColor="#364e16" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="70%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#fff8db" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#4f6c26" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="blightSpot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b291a" />
              <stop offset="45%" stopColor="#5c3f25" />
              <stop offset="70%" stopColor="#8c6a38" />
              <stop offset="100%" stopColor="#4f6c26" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Farm Soil Background & Sunlight */}
          <rect width="600" height="450" fill="url(#soilBg)" />
          <circle cx="480" cy="80" r="280" fill="url(#sunGlow)" />

          {/* Deep Foliage Layer */}
          <g opacity="0.6">
            <path d="M-50,220 C40,160 160,200 220,320 C140,360 30,340 -50,220 Z" fill="#2d3f15" />
            <path d="M420,380 C500,280 620,310 650,420 C560,450 480,440 420,380 Z" fill="#243410" />
            <path d="M260,-40 C320,80 440,110 520,20 C460,-40 360,-60 260,-40 Z" fill="#384f1a" />
          </g>

          {/* Main Tomato Branch Stems */}
          <path
            d="M310,460 C305,340 280,260 240,180 C210,120 180,90 120,40"
            stroke="#6b863d"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M265,230 C330,210 410,230 490,260"
            stroke="#5d7732"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M230,165 C170,140 120,130 60,110"
            stroke="#5d7732"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Secondary Serrated Tomato Leaflets */}
          {/* Top Left Leaf */}
          <path
            d="M190,140 C150,110 110,80 70,105 C60,125 90,145 110,150 C70,160 60,180 80,195 C110,190 145,175 180,155 Z"
            fill="url(#leafGradLight)"
          />
          {/* Main Center Serrated Tomato Leaf */}
          <path
            d="M245,210 C180,180 130,220 90,260 C110,270 140,265 160,285 C120,300 100,330 130,350 C170,335 200,310 230,285 C220,310 215,350 250,360 C270,330 270,270 255,215 Z"
            fill="url(#leafGradMain)"
          />

          {/* Large Right Canopy Leaf (Targeted by Scanner) */}
          <path
            d="M275,225 C340,170 420,180 490,195 C480,215 450,220 470,245 C510,240 550,265 520,295 C480,300 440,280 405,295 C430,320 440,350 400,370 C360,350 330,310 310,280 C300,310 280,340 250,330 C255,290 270,250 275,225 Z"
            fill="url(#leafGradLight)"
          />

          {/* Fine Vein Network */}
          <path d="M280,230 Q380,240 470,260" stroke="#a4c466" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M330,235 Q360,215 410,205" stroke="#9bb859" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M370,242 Q400,270 450,285" stroke="#9bb859" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M410,250 Q440,235 480,235" stroke="#9bb859" strokeWidth="1.5" fill="none" opacity="0.7" />

          {/* Target Early Blight Concentric Rings Pathology on Leaf */}
          <g transform="translate(370, 240)">
            <ellipse cx="0" cy="0" rx="36" ry="26" fill="url(#blightSpot)" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="28" ry="20" fill="none" stroke="#2a1d12" strokeWidth="1.8" opacity="0.85" />
            <ellipse cx="0" cy="0" rx="18" ry="13" fill="none" stroke="#3b291a" strokeWidth="1.5" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#1b120a" opacity="0.95" />
            {/* Secondary smaller spore lesion */}
            <circle cx="28" cy="18" r="8" fill="#3b291a" opacity="0.8" />
            <circle cx="28" cy="18" r="4" fill="#1b120a" />
          </g>

          {/* Morning Dew droplets sparkling */}
          <circle cx="340" cy="205" r="3" fill="#ffffff" opacity="0.7" />
          <circle cx="341" cy="204" r="1" fill="#ffffff" />
          <circle cx="430" cy="275" r="3.5" fill="#ffffff" opacity="0.75" />
          <circle cx="431" cy="274" r="1.2" fill="#ffffff" />
          <circle cx="280" cy="280" r="2.5" fill="#ffffff" opacity="0.65" />
        </svg>
      )}

      {/* Camera HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-data-mono text-[11px] border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-white/90">photo_camera</span>
            <span>CAM_01 • 12.2MP</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[#becc9d] font-data-mono text-[11px] border border-white/10 font-semibold shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-yellow-300">bolt</span>
            <span>48ms</span>
          </div>
        </div>

        {/* AI Bounding Box with Corner Brackets & Detection Tag */}
        {scanBox && (
          <div className="relative mx-auto w-3/4 h-3/5 my-auto pointer-events-none">
            {/* Bounding Box Border */}
            <div className="absolute inset-0 border border-dashed border-[#becc9d]/80 rounded-lg bg-[#becc9d]/5">
              {/* Corner Accent Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#dae8b8]"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#dae8b8]"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#dae8b8]"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#dae8b8]"></div>

              {/* Laser scanline animation */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#e8f6c5] to-transparent animate-pulse absolute top-1/2 -translate-y-1/2 opacity-75"></div>
            </div>

            {/* Area & Confidence Label */}
            <div className="absolute -top-3.5 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[#e8f6c5] font-data-mono text-[10px] tracking-wide border border-white/10 flex items-center gap-1">
              <span className="material-symbols-outlined text-[11px] text-[#becc9d]">crop_free</span>
              <span>Leaf Tissue #01 [Area: 84% conf]</span>
            </div>

            {/* Grid Ref Tag at bottom left of box */}
            <div className="absolute -bottom-3 left-4 px-2 py-0.5 rounded bg-black/85 backdrop-blur text-white/90 font-data-mono text-[9px] tracking-wider border border-white/10 uppercase">
              GRID_REF: 4A-12
            </div>
          </div>
        )}

        {/* Bottom subtle gradient container for action buttons */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}

export function SolarMastArtwork({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md bg-[#2b351d] ${className}`}>
      <svg
        viewBox="0 0 800 450"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#415d43" />
            <stop offset="45%" stopColor="#979b63" />
            <stop offset="85%" stopColor="#e3cf97" />
            <stop offset="100%" stopColor="#c8ad66" />
          </linearGradient>
          <linearGradient id="fieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#55662a" />
            <stop offset="40%" stopColor="#3d4e1d" />
            <stop offset="100%" stopColor="#25310f" />
          </linearGradient>
          <linearGradient id="solarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#12253d" />
            <stop offset="100%" stopColor="#081423" />
          </linearGradient>
          <linearGradient id="enclosureSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a6058" />
            <stop offset="50%" stopColor="#7a8277" />
            <stop offset="100%" stopColor="#484e46" />
          </linearGradient>
        </defs>

        {/* Golden Hour Sunset Sky & Far Hills */}
        <rect width="800" height="300" fill="url(#skyGrad)" />
        <path d="M0,230 Q200,180 400,210 T800,200 L800,320 L0,320 Z" fill="#697746" opacity="0.7" />
        <path d="M0,250 Q260,210 520,240 T800,225 L800,350 L0,350 Z" fill="#4d5c2c" opacity="0.8" />

        {/* Agricultural Crops Field Surface */}
        <rect y="270" width="800" height="180" fill="url(#fieldGrad)" />

        {/* Farmland Crop Furrow Rows */}
        <g stroke="#324115" strokeWidth="2.5" opacity="0.6">
          <line x1="0" y1="360" x2="360" y2="275" />
          <line x1="0" y1="420" x2="380" y2="275" />
          <line x1="200" y1="450" x2="400" y2="275" />
          <line x1="450" y1="450" x2="420" y2="275" />
          <line x1="680" y1="450" x2="440" y2="275" />
          <line x1="800" y1="410" x2="460" y2="275" />
        </g>

        {/* The Solar Gateway Mast Structure (Field Station) */}
        {/* Steel Pole Base */}
        <rect x="428" y="110" width="14" height="260" fill="url(#enclosureSteel)" rx="2" />

        {/* Solar Panel Assembly at Top, tilted toward sun */}
        <g transform="translate(435, 120) rotate(-24)">
          {/* Mounting Bracket */}
          <rect x="-10" y="-8" width="120" height="10" fill="#30352e" rx="2" />
          {/* Photovoltaic Panel Frame */}
          <rect x="-8" y="-45" width="115" height="42" fill="#202422" rx="3" stroke="#60665f" strokeWidth="2" />
          {/* Solar Silicon Cells */}
          <rect x="-4" y="-42" width="107" height="36" fill="url(#solarGlass)" />
          {/* Grid lines on solar cell */}
          <g stroke="#6086b5" strokeWidth="1" opacity="0.5">
            <line x1="18" y1="-42" x2="18" y2="-6" />
            <line x1="40" y1="-42" x2="40" y2="-6" />
            <line x1="62" y1="-42" x2="62" y2="-6" />
            <line x1="84" y1="-42" x2="84" y2="-6" />
            <line x1="-4" y1="-24" x2="103" y2="-24" />
          </g>
          {/* Glint on solar glass */}
          <line x1="-4" y1="-38" x2="60" y2="-6" stroke="#ffffff" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
        </g>

        {/* Weatherproofing NEMA Telemetry Enclosure Box */}
        <rect x="408" y="170" width="54" height="74" fill="url(#enclosureSteel)" rx="4" stroke="#333731" strokeWidth="2" />
        {/* Enclosure latch & branding */}
        <rect x="414" y="180" width="42" height="54" fill="#697066" rx="2" />
        <rect x="424" y="195" width="22" height="12" fill="#394235" rx="1" />
        <circle cx="448" cy="201" r="2.5" fill="#52ff78" /> {/* Edge Status LED */}
        <circle cx="448" cy="220" r="2" fill="#ffb443" /> {/* LoRa Activity LED */}

        {/* Omni-directional LoRa Antenna Rod */}
        <line x1="412" y1="170" x2="412" y2="70" stroke="#222521" strokeWidth="4" strokeLinecap="round" />
        <circle cx="412" cy="68" r="3" fill="#3b423a" />

        {/* Ambient Pyranometer / Temp sensor cup */}
        <path d="M458,190 L480,185" stroke="#333" strokeWidth="3" />
        <circle cx="482" cy="184" r="5" fill="#f4f4ef" stroke="#444" strokeWidth="1.5" />
      </svg>

      {/* Overlay Vignette & Badges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-data-mono text-label-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>99.98% UPTIME</span>
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#fbf1a9] font-data-mono text-label-sm border border-white/10">
            <span className="material-symbols-outlined text-[14px] text-yellow-300">wb_sunny</span>
            <span>4.8W Influx</span>
          </div>
        </div>

        {/* Bottom Hero Identification Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white tracking-tight">FarmGuard Edge-01</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#dae8c0]/25 text-[#dae8b8] font-data-mono text-[10px] tracking-wider uppercase border border-[#dae8c0]/30 font-semibold">
              TPU ENABLED
            </span>
          </div>
          <p className="font-data-mono text-[12px] text-white/80">
            LoRaWAN + NPU High-Capacity Gateway
          </p>
        </div>
      </div>
    </div>
  );
}

export function IrrigationPlotArtwork({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm bg-[#222917] ${className}`}>
      <svg
        viewBox="0 0 600 340"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wetSoil" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a2f1c" />
            <stop offset="60%" stopColor="#251d11" />
            <stop offset="100%" stopColor="#151009" />
          </linearGradient>
          <radialGradient id="wetPuddle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a140b" />
            <stop offset="70%" stopColor="#2c2214" />
            <stop offset="100%" stopColor="#3a2f1c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dark Rich Farm Soil Bed */}
        <rect width="600" height="340" fill="url(#wetSoil)" />

        {/* Lush Tomato Crop Foliage in Foreground */}
        <g opacity="0.95">
          {/* Main Stem */}
          <path d="M380,340 C370,220 340,140 310,40" stroke="#5d7732" strokeWidth="12" strokeLinecap="round" fill="none" />
          {/* Leaves */}
          <path d="M340,180 C260,140 180,180 120,210 C160,230 220,220 250,230 C220,260 210,290 260,290 C290,260 320,220 340,180 Z" fill="#4d6924" />
          <path d="M330,130 C390,90 460,110 520,130 C480,150 440,145 420,165 C450,180 460,210 410,215 C390,190 360,160 330,130 Z" fill="#678a30" />
          {/* Green Unripe Tomato Fruit on Vine */}
          <circle cx="280" cy="140" r="22" fill="#759c38" stroke="#537223" strokeWidth="2" />
          <circle cx="295" cy="165" r="18" fill="#84ad3f" stroke="#537223" strokeWidth="2" />
          <circle cx="285" cy="135" r="5" fill="#a0c957" opacity="0.6" />
        </g>

        {/* Black Drip Irrigation Lateral Pipe Line */}
        <path d="M0,270 Q300,260 600,275" stroke="#161817" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M0,268 Q300,258 600,273" stroke="#363b38" strokeWidth="2" fill="none" opacity="0.6" />

        {/* Emitter Nozzle and Water Moisture Ring */}
        <ellipse cx="290" cy="272" rx="60" ry="24" fill="url(#wetPuddle)" />
        <rect x="282" y="260" width="16" height="18" fill="#1b4d3e" rx="3" stroke="#256b57" strokeWidth="1.5" />

        {/* Animated Active Water Pulse Droplets */}
        <circle cx="290" cy="270" r="4" fill="#a4d8ff" />
        <circle cx="298" cy="276" r="3" fill="#79c2ff" />
        <circle cx="282" cy="275" r="2.5" fill="#79c2ff" />
        <ellipse cx="290" cy="280" rx="35" ry="12" fill="none" stroke="#60b5ff" strokeWidth="1.5" opacity="0.75" />
      </svg>

      {/* Floating Pill on image */}
      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur text-white font-data-mono text-[11px] flex items-center gap-1.5 border border-white/10 shadow-sm">
        <span className="material-symbols-outlined text-[13px] text-cyan-400">water_drop</span>
        <span>Plot C Drip Lateral • Active Pulse</span>
      </div>
    </div>
  );
}
