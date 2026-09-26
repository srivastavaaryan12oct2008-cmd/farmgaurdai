import React from 'react';
import { OFFICIAL_LOGO_URL } from '../constants/mockData.ts';
import { ScreenId } from '../types.ts';

interface ScreenSplashProps {
  onNavigate: (screen: ScreenId) => void;
}

export function ScreenSplash({ onNavigate }: ScreenSplashProps) {
  return (
    <div className="relative min-h-screen bg-[#fafaf5] text-[#1a1c19] overflow-hidden flex flex-col justify-between selection:bg-[#dae8c0]">
      {/* Ambient Botanical Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft diffuse sunlit olive gradients */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#dae8c0]/40 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#dae8b8]/30 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#dce8bc]/35 blur-3xl"></div>

        {/* Organic Leaf Vein Watermark SVG */}
        <svg
          className="absolute inset-0 w-full h-full text-[#65724a]/8"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          stroke="currentColor"
          viewBox="0 0 400 800"
        >
          <path
            d="M 200,50 Q 240,250 180,450 T 210,750"
            opacity="0.4"
            strokeDasharray="4 6"
            strokeWidth="2.5"
          />
          <path d="M 200,180 Q 280,140 340,110" opacity="0.3" strokeWidth="1.5" />
          <path d="M 205,240 Q 110,210 60,180" opacity="0.3" strokeWidth="1.5" />
          <path d="M 195,330 Q 300,310 360,280" opacity="0.3" strokeWidth="1.5" />
          <path d="M 190,410 Q 90,390 40,360" opacity="0.3" strokeWidth="1.5" />
          <path d="M 185,500 Q 290,480 350,450" opacity="0.3" strokeWidth="1.5" />
          <path d="M 195,590 Q 100,580 50,550" opacity="0.3" strokeWidth="1.5" />
          <circle cx="200" cy="50" fill="currentColor" opacity="0.5" r="4" />
          <circle cx="210" cy="750" fill="currentColor" opacity="0.5" r="4" />
        </svg>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-md mx-auto w-full px-5 py-6 flex flex-col justify-between flex-1">
        {/* Header Edge Connectivity Chip */}
        <div className="flex items-center justify-between pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f4ef] border border-[#e2e3de] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#4d5934] animate-pulse"></span>
            <span className="font-data-mono text-[11px] text-[#45483e] tracking-wider uppercase font-medium">
              Field Gateway 04
            </span>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eeeee9] text-[#45483e] font-data-mono text-[11px]">
            <span className="material-symbols-outlined text-[14px] text-[#4d5934]">wifi_off</span>
            <span>Offline Active</span>
          </div>
        </div>

        {/* Center Hero Identity Section */}
        <div className="flex flex-col items-center text-center mt-5 mb-5">
          {/* Emblem with Ambient Radial Halo Ring */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="absolute w-36 h-36 rounded-full bg-[#dae8c0]/40 animate-ping opacity-25"></div>
            <div className="absolute w-44 h-44 rounded-full bg-[#dae8b8]/35 blur-md"></div>
            <div className="relative p-2.5 rounded-2xl bg-white shadow-md border border-[#e2e3de] flex items-center justify-center">
              <img
                alt="FarmGuard AI Official Emblem"
                className="w-24 h-24 rounded-xl object-contain shadow-xs"
                src={OFFICIAL_LOGO_URL}
              />
            </div>
          </div>

          {/* Brand Title & Classification */}
          <h1 className="text-[28px] font-bold text-[#1a1c19] tracking-tight mb-1">
            FarmGuard <span className="text-[#4d5934] font-extrabold">AI</span>
          </h1>
          <p className="font-data-mono text-[11px] text-[#45483e] uppercase tracking-widest mb-3 font-semibold">
            Edge-AI Agricultural Operating System
          </p>

          {/* Official Tagline Pill */}
          <div className="px-4 py-1.5 rounded-full bg-[#f4f4ef] border border-[#e2e3de] shadow-xs mb-3">
            <span className="text-[13px] text-[#1a1c19] font-medium">
              Detect early. Decide locally. Farm smarter.
            </span>
          </div>

          <p className="text-[13px] text-[#45483e] max-w-xs leading-relaxed">
            Sovereign, zero-latency plant pathology and microclimate intelligence right at the farm gate.
          </p>
        </div>

        {/* Edge Capabilities Feature Mosaic */}
        <div className="flex flex-col gap-2.5 mb-5">
          <div className="p-3 rounded-xl bg-white border border-[#e4e6d8] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#eeeee9] flex items-center justify-center shrink-0 text-[#4d5934]">
              <span className="material-symbols-outlined text-[20px] material-symbols-filled">eco</span>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h3 className="text-[14px] font-semibold text-[#1a1c19] truncate">
                Autonomous Foliar Diagnosis
              </h3>
              <p className="text-[11px] text-[#45483e] truncate">
                Sub-millimeter pest, pathogen & rust detection
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e4e6d8] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#dae8c0]/40 flex items-center justify-center shrink-0 text-[#4d5934]">
              <span className="material-symbols-outlined text-[20px] material-symbols-filled">offline_bolt</span>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h3 className="text-[14px] font-semibold text-[#1a1c19] truncate">
                Zero-Cloud Offline Inference
              </h3>
              <p className="text-[11px] text-[#45483e] truncate">
                Local NPU compute under harsh canopy sunlight
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#e4e6d8] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#dce8bc]/30 flex items-center justify-center shrink-0 text-[#4d5934]">
              <span className="material-symbols-outlined text-[20px] material-symbols-filled">water_drop</span>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <h3 className="text-[14px] font-semibold text-[#1a1c19] truncate">
                Precision Micro-Irrigation
              </h3>
              <p className="text-[11px] text-[#45483e] truncate">
                Predictive evapotranspiration & soil VWC pacing
              </p>
            </div>
          </div>
        </div>

        {/* Diagnostic Sensor Barcode Snapshot */}
        <div className="bg-[#f4f4ef] border border-[#e2e3de] p-3.5 rounded-xl mb-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4d5934]"></span>
              <span className="font-data-mono text-[11px] text-[#1a1c19] font-medium">
                Edge Neural Engine v2.4
              </span>
            </div>
            <span className="font-data-mono text-[11px] text-[#4d5934] font-bold">
              INITIALIZED
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="bg-white py-1.5 px-2 rounded-lg border border-[#e2e3de]">
              <span className="block font-data-mono text-[10px] text-[#45483e]">LATENCY</span>
              <span className="font-data-mono text-[13px] font-semibold text-[#1a1c19]">18ms</span>
            </div>
            <div className="bg-white py-1.5 px-2 rounded-lg border border-[#e2e3de]">
              <span className="block font-data-mono text-[10px] text-[#45483e]">MODELS</span>
              <span className="font-data-mono text-[13px] font-semibold text-[#1a1c19]">6 Core</span>
            </div>
            <div className="bg-white py-1.5 px-2 rounded-lg border border-[#e2e3de]">
              <span className="block font-data-mono text-[10px] text-[#45483e]">SYNC</span>
              <span className="font-data-mono text-[13px] font-semibold text-[#1a1c19]">Hot Standby</span>
            </div>
          </div>
        </div>

        {/* CTAs and Release Footnote */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => onNavigate('scan')}
            className="w-full h-12 bg-[#3f4b2e] hover:bg-[#4d5934] text-white rounded-xl text-[15px] font-semibold shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Enter FarmGuard</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          <button
            onClick={() => onNavigate('auth')}
            className="w-full py-2 text-center text-[13px] text-[#45483e] hover:text-[#4d5934] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Already registered on workstation?</span>
            <span className="font-semibold text-[#4d5934] underline underline-offset-4">
              Sign In
            </span>
          </button>

          <div className="flex items-center justify-between pt-1">
            <span className="font-data-mono text-[11px] text-[#76786d]">Build 14.0.28-Edge</span>
            <span className="font-data-mono text-[11px] text-[#76786d]">v1.4.0 · Offline Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
