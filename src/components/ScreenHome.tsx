import React from 'react';
import { ScreenId, ValveActuator } from '../types.ts';

interface ScreenHomeProps {
  onNavigate: (screen: ScreenId) => void;
  valves: ValveActuator[];
  onDeployPulse: () => void;
}

export function ScreenHome({ onNavigate, valves, onDeployPulse }: ScreenHomeProps) {
  return (
    <div className="px-4 py-4 max-w-md mx-auto pb-24 text-[#1a1c19]">
      {/* Top Welcome Title */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="font-data-mono text-[11px] text-[#45483e] font-semibold uppercase tracking-wider">
            STATION OVERVIEW · PUNAVLI SOUTH #04
          </span>
          <span className="text-[11px] font-data-mono text-[#4a7c59] font-semibold">
            All Systems Sovereign
          </span>
        </div>
        <h1 className="text-[24px] font-bold text-[#1a1c19] tracking-tight">
          Farm Operations Center
        </h1>
        <p className="text-[13px] text-[#45483e] mt-0.5 leading-snug">
          Real-time agro-ecological telemetry and automated actuator control.
        </p>
      </div>

      {/* Critical Alert Spotlight Banner */}
      <div className="bg-[#ffdad6]/40 border border-[#ffdad6] rounded-2xl p-4 shadow-xs mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">
              warning
            </span>
            <span className="font-bold text-[14px] text-[#93000a]">
              Action Required: Field C Stress
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-data-mono text-[10px] font-bold">
            HIGH PRIORITY
          </span>
        </div>
        <p className="text-[12px] text-[#45483e] mt-1.5 mb-3 leading-snug">
          Soil moisture dropped to 21% with elevated 35°C canopy heat. Early Blight spore risk flagged on Row 4.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('irrigation')}
            className="flex-1 py-2 px-3 bg-[#ba1a1a] text-white text-[12px] font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#93000a] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">water_drop</span>
            Resolve in Irrigation
          </button>
          <button
            onClick={() => onNavigate('scan')}
            className="flex-1 py-2 px-3 bg-white border border-[#e2e3de] text-[#1a1c19] text-[12px] font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#f4f4ef] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">crop_free</span>
            Inspect Leaf Scan
          </button>
        </div>
      </div>

      {/* Real-Time Microclimate Telemetry Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="p-3.5 rounded-2xl bg-white border border-[#e4e6d8] shadow-xs">
          <div className="flex items-center justify-between text-[#76786d] text-[11px] mb-1">
            <span>Canopy Temperature</span>
            <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
              thermostat
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
              29.2°C
            </span>
            <span className="text-[10px] font-data-mono text-[#92400e]">High Spore</span>
          </div>
          <span className="text-[10px] text-[#76786d] block mt-1 font-data-mono">
            Dew Point: 24.8°C
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#e4e6d8] shadow-xs">
          <div className="flex items-center justify-between text-[#76786d] text-[11px] mb-1">
            <span>Foliage Dew Risk</span>
            <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
              humidity_mid
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
              94%
            </span>
            <span className="text-[10px] font-data-mono text-[#ba1a1a]">Foliar Wet</span>
          </div>
          <span className="text-[10px] text-[#76786d] block mt-1 font-data-mono">
            Evaporation in ~2.5 hrs
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#e4e6d8] shadow-xs">
          <div className="flex items-center justify-between text-[#76786d] text-[11px] mb-1">
            <span>Solar Radiation</span>
            <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
              sunny
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
              780 W/m²
            </span>
          </div>
          <span className="text-[10px] text-[#4a7c59] block mt-1 font-data-mono">
            MPPT 4.8W Influx
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#e4e6d8] shadow-xs">
          <div className="flex items-center justify-between text-[#76786d] text-[11px] mb-1">
            <span>Water Conserved</span>
            <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
              water_lux
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
              3,420 L
            </span>
          </div>
          <span className="text-[10px] text-[#4a7c59] block mt-1 font-data-mono">
            +14.2% vs baseline
          </span>
        </div>
      </div>

      {/* Field Sectors Matrix */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[15px] text-[#1a1c19]">Farm Sector Status</h3>
          <span className="text-[11px] font-data-mono text-[#76786d]">3 Field Zones</span>
        </div>

        <div className="space-y-2">
          {/* Field A */}
          <div
            onClick={() => onNavigate('irrigation')}
            className="p-3 rounded-xl bg-[#f4f4ef] border border-[#e2e3de] flex items-center justify-between cursor-pointer hover:bg-[#eeeee9] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[13px] text-[#1a1c19]">Field A</span>
                <span className="text-[11px] text-[#45483e]">Tomato Plot (Micro-Sprinkler)</span>
              </div>
              <p className="text-[11px] text-[#5c6949] font-data-mono mt-0.5">
                VWC: 68% · Tension: 0.12 kPa
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#dae8c0] text-[#3f4b27] font-data-mono text-[10px] font-bold">
              OPTIMAL
            </span>
          </div>

          {/* Field B */}
          <div
            onClick={() => onNavigate('irrigation')}
            className="p-3 rounded-xl bg-[#f4f4ef] border border-[#e2e3de] flex items-center justify-between cursor-pointer hover:bg-[#eeeee9] transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[13px] text-[#1a1c19]">Field B</span>
                <span className="text-[11px] text-[#45483e]">Durum Wheat (Sub-Surface Drip)</span>
              </div>
              <p className="text-[11px] text-[#5c6949] font-data-mono mt-0.5">
                VWC: 64% · Tension: 0.16 kPa
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#dae8c0] text-[#3f4b27] font-data-mono text-[10px] font-bold">
              OPTIMAL
            </span>
          </div>

          {/* Field C */}
          <div
            onClick={() => onNavigate('irrigation')}
            className="p-3 rounded-xl bg-[#ffdad6]/20 border border-[#ffdad6] flex items-center justify-between cursor-pointer hover:bg-[#ffdad6]/30 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[13px] text-[#ba1a1a]">Field C</span>
                <span className="text-[11px] text-[#1a1c19]">Tomato Plot (Lateral Drip)</span>
              </div>
              <p className="text-[11px] text-[#ba1a1a] font-data-mono mt-0.5">
                VWC: 21% (Critical Low) · 38m drip active
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#ba1a1a] text-white font-data-mono text-[10px] font-bold animate-pulse">
              DEFICIT
            </span>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onNavigate('scan')}
          className="p-3.5 rounded-2xl bg-[#3f4b2e] hover:bg-[#4d5934] text-white flex flex-col items-start justify-between gap-3 text-left transition-colors cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[24px]">crop_free</span>
          <div>
            <p className="text-[13px] font-bold leading-tight">Launch Crop Scanner</p>
            <p className="text-[11px] text-[#dae8b8] mt-0.5">YOLOv8 &amp; MobileNetV4</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('edge')}
          className="p-3.5 rounded-2xl bg-white hover:bg-[#f4f4ef] border border-[#e2e3de] text-[#1a1c19] flex flex-col items-start justify-between gap-3 text-left transition-colors cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[24px] text-[#4d5934]">
            developer_board
          </span>
          <div>
            <p className="text-[13px] font-bold leading-tight">Edge Node Status</p>
            <p className="text-[11px] text-[#5c6949] mt-0.5">3 Mesh Nodes Online</p>
          </div>
        </button>
      </div>
    </div>
  );
}
