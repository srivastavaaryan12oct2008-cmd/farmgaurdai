import React, { useState } from 'react';
import { ScreenId, ValveActuator } from '../types.ts';
import { IrrigationPlotArtwork } from './FieldImagery.tsx';

interface ScreenIrrigationProps {
  onNavigate: (screen: ScreenId) => void;
  valves: ValveActuator[];
  onToggleValve: (id: string) => void;
  onDeployPulse: () => void;
}

export function ScreenIrrigation({
  onNavigate,
  valves,
  onToggleValve,
  onDeployPulse,
}: ScreenIrrigationProps) {
  const [activeTab, setActiveTab] = useState<'zone-c' | 'zone-ab'>('zone-c');
  const [pulseDeployed, setPulseDeployed] = useState(false);
  const [activeDripMinutes, setActiveDripMinutes] = useState(38);
  const [paused, setPaused] = useState(false);
  const [showActuatorModal, setShowActuatorModal] = useState(false);

  const handlePulse = () => {
    setPulseDeployed(true);
    onDeployPulse();
    setTimeout(() => setPulseDeployed(false), 3000);
  };

  return (
    <div className="px-4 py-4 max-w-md mx-auto pb-24 text-[#1a1c19]">
      {/* Subheader & Telemetry Tag */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-data-mono text-[11px] text-[#45483e] font-semibold uppercase tracking-wider">
            TELEMETRY NODE #04 · LORAWAN
          </span>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dae8c0]/40 text-[#3f4b27] font-data-mono text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]"></span>
            <span>Sensors Synced 2m ago</span>
          </div>
        </div>
        <h1 className="text-[24px] font-bold text-[#1a1c19] tracking-tight">
          Smart Irrigation
        </h1>
        <p className="text-[13px] text-[#45483e] mt-0.5 leading-snug">
          Automated precision watering based on real-time soil tensiometers and evapotranspiration data.
        </p>
      </div>

      {/* Tension Anomalies Card */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        {/* Header & Tabs */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f4f4ef]">
          <div className="flex items-center gap-1.5 font-bold text-[15px] text-[#1a1c19]">
            <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">
              warning
            </span>
            <span>Tension Anomalies</span>
          </div>

          <div className="flex items-center gap-1 bg-[#f4f4ef] p-0.5 rounded-lg border border-[#e2e3de]">
            <button
              onClick={() => setActiveTab('zone-c')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'zone-c'
                  ? 'bg-white text-[#1a1c19] shadow-xs font-semibold'
                  : 'text-[#5c6949]'
              }`}
            >
              Zone C (Alert)
            </button>
            <button
              onClick={() => setActiveTab('zone-ab')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'zone-ab'
                  ? 'bg-white text-[#1a1c19] shadow-xs font-semibold'
                  : 'text-[#5c6949]'
              }`}
            >
              Zone A/B (Normal)
            </button>
          </div>
        </div>

        {activeTab === 'zone-c' ? (
          <div>
            {/* Acute Water Deficit Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#ba1a1a] text-white font-data-mono text-[10px] font-bold tracking-wide flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">humidity_low</span>
                Acute Water Deficit
              </span>
              <span className="text-[11px] font-data-mono text-[#76786d]">
                Field C · Sub-Root Block 2
              </span>
            </div>

            <h2 className="text-[18px] font-bold text-[#1a1c19] leading-tight mb-1">
              Water stress detected in Field C
            </h2>
            <p className="text-[12px] text-[#45483e] leading-snug mb-3">
              Hydraulic tensiometer threshold breached. Plant turgor loss imminent without intervention.
            </p>

            {/* Metrics Dual Box */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-3 rounded-xl bg-[#f4f4ef] border border-[#e2e3de]">
                <span className="text-[11px] text-[#76786d] font-medium block">
                  Soil Moisture
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[22px] font-bold font-data-mono text-[#ba1a1a]">
                    21%
                  </span>
                  <span className="text-[11px] font-data-mono text-[#ba1a1a] font-semibold">
                    Crit Low (&lt;30%)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f4f4ef] border border-[#e2e3de]">
                <span className="text-[11px] text-[#76786d] font-medium block">
                  Ambient Canopy Temp
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
                    35°C
                  </span>
                  <span className="text-[11px] font-data-mono text-[#92400e] font-semibold">
                    +3.2°C vs Avg
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation note */}
            <div className="flex items-start gap-2 mb-3 text-[12px] text-[#3f4b27]">
              <span className="material-symbols-outlined text-[16px] text-[#4d5934] shrink-0 mt-0.5">
                lightbulb
              </span>
              <p className="leading-snug">
                <span className="font-semibold">Recommendation:</span> Trigger drip irrigation cycle for Zone C (45 mins recommended to re-saturate capillary layer).
              </p>
            </div>

            {/* Deploy Action Button */}
            <button
              onClick={handlePulse}
              className={`w-full py-3 px-4 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                pulseDeployed
                  ? 'bg-[#4a7c59] text-white'
                  : 'bg-[#3f4b2e] hover:bg-[#4d5934] text-white active:scale-[0.99]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {pulseDeployed ? 'check_circle' : 'water_drop'}
              </span>
              <span>
                {pulseDeployed
                  ? 'Active Pulse Dispatched (45m Target) ✓'
                  : 'Deploy 45–Min Target Pulse'}
              </span>
            </button>
          </div>
        ) : (
          <div className="py-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1a1c19]">Field A (Tomato Plot)</span>
              <span className="text-[#4a7c59] font-data-mono font-medium">Nominal (68% VWC)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1a1c19]">Field B (Durum Wheat)</span>
              <span className="text-[#4a7c59] font-data-mono font-medium">Nominal (64% VWC)</span>
            </div>
            <p className="text-[11px] text-[#76786d] pt-1">
              Capillary matrix tension balanced. No anomaly alerts flagged in zones A & B.
            </p>
          </div>
        )}
      </div>

      {/* Field Telemetry Aggregator */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-data-mono uppercase font-bold tracking-wider text-[#76786d]">
              FIELD TELEMETRY AGGREGATOR
            </span>
            <h3 className="text-[17px] font-bold text-[#1a1c19]">
              Zones A & B Saturation
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#dae8c0]/50 text-[#3f4b27] font-medium text-[11px]">
            Optimal Hydration
          </span>
        </div>

        {/* Circular Gauge & Stat Cluster */}
        <div className="flex items-center gap-4 py-2">
          {/* Circular SVG Gauge */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#eeeee9"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#4d5934"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.67)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[18px] font-bold font-data-mono text-[#1a1c19] leading-none">
                67%
              </span>
              <span className="text-[9px] font-data-mono text-[#5c6949] font-semibold mt-0.5">
                OPTIMAL
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 space-y-1.5 text-[12px]">
            <div>
              <span className="text-[#76786d] text-[11px] block">Water Stress Index</span>
              <span className="font-semibold text-[#1a1c19]">Low (0.14 kPa)</span>
            </div>
            <div>
              <span className="text-[#76786d] text-[11px] block">Evapotranspiration</span>
              <span className="font-semibold text-[#1a1c19]">3.8 mm/day</span>
            </div>
            <div>
              <span className="text-[#76786d] text-[11px] block">Next Automated Cycle</span>
              <span className="font-semibold text-[#1a1c19]">Tomorrow at 06:00 AM</span>
            </div>
          </div>
        </div>

        {/* VPD Atmospheric Bar */}
        <div className="mt-2 pt-2.5 border-t border-[#f4f4ef] flex items-center justify-between text-[11px] font-data-mono text-[#45483e]">
          <span>Atmospheric Vapor Deficit (VPD)</span>
          <span className="font-bold text-[#1a1c19]">1.12 kPa · Normal</span>
        </div>
      </div>

      {/* Valve & Pump Controller */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 font-bold text-[15px] text-[#1a1c19]">
            <span className="material-symbols-outlined text-[18px] text-[#4d5934]">
              tune
            </span>
            <span>Valve & Pump Controller</span>
          </div>
          <span className="text-[11px] font-data-mono text-[#76786d]">
            3 Active Actuators
          </span>
        </div>

        {/* Actuators List */}
        <div className="space-y-2 mb-3">
          {valves.map((v) => {
            const isActive = v.id === 'v3' && v.isOpen;
            return (
              <div
                key={v.id}
                onClick={() => onToggleValve(v.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#f4f4ef] border-[#4d5934]/30'
                    : 'bg-[#f4f4ef]/60 border-[#e2e3de] hover:bg-[#f4f4ef]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive
                        ? 'bg-[#ba1a1a]/10 text-[#ba1a1a]'
                        : 'bg-[#eeeee9] text-[#4d5934]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {v.id === 'v1'
                        ? 'sprinkler'
                        : v.id === 'v2'
                        ? 'grass'
                        : 'water_drop'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[13px] text-[#1a1c19]">{v.name}</span>
                      <span className="text-[10px] font-data-mono px-1.5 py-0.2 rounded bg-white border border-[#e2e3de] text-[#45483e]">
                        {v.field}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#76786d] truncate">
                      {v.crop} · {v.type}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 font-data-mono text-[11px]">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? 'bg-[#ba1a1a] animate-pulse'
                          : v.status === 'AUTO'
                          ? 'bg-[#4a7c59]'
                          : 'bg-[#76786d]'
                      }`}
                    ></span>
                    <span
                      className={`font-semibold ${
                        isActive
                          ? 'text-[#ba1a1a]'
                          : v.status === 'AUTO'
                          ? 'text-[#4a7c59]'
                          : 'text-[#76786d]'
                      }`}
                    >
                      {isActive ? 'ACTIVE DRIP' : v.status}
                    </span>
                  </div>
                  <span className="text-[10px] font-data-mono text-[#76786d] block">
                    {isActive ? `${activeDripMinutes}m left` : v.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className={`flex-1 py-2 px-3 rounded-xl border text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              paused
                ? 'bg-[#3f4b2e] text-white border-[#3f4b2e]'
                : 'bg-[#3f4b2e] text-white border-[#3f4b2e] hover:bg-[#4d5934]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {paused ? 'play_arrow' : 'pause'}
            </span>
            <span>{paused ? 'RESUME VALVE' : 'PAUSE OVERRIDE'}</span>
          </button>

          <button
            onClick={() => setShowActuatorModal(true)}
            className="w-10 h-9 rounded-xl bg-white border border-[#e2e3de] flex items-center justify-center text-[#45483e] hover:bg-[#f4f4ef] transition-colors cursor-pointer"
            title="Actuator Calibration"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      {/* Historical Multi-Depth 7-Day Dynamic Trendline */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-data-mono uppercase font-bold tracking-wider text-[#76786d]">
              HISTORICAL MULTI-DEPTH
            </span>
            <h3 className="text-[16px] font-bold text-[#1a1c19]">
              7–Day Dynamic Trendline
            </h3>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-data-mono">
            <span className="flex items-center gap-1 text-[#45483e]">
              <span className="w-2.5 h-0.5 bg-[#4d5934]"></span>
              Zones A/B
            </span>
            <span className="flex items-center gap-1 text-[#ba1a1a]">
              <span className="w-2.5 h-0.5 bg-[#ba1a1a]"></span>
              Field C Dip
            </span>
          </div>
        </div>

        {/* SVG Dynamic Trendline Graph */}
        <div className="relative w-full h-36 my-2">
          <svg className="w-full h-full" viewBox="0 0 360 120">
            {/* Target Envelope Range (60-75%) */}
            <rect x="0" y="24" width="360" height="30" fill="#dae8c0" opacity="0.35" />
            <line x1="0" y1="24" x2="360" y2="24" stroke="#4d5934" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <line x1="0" y1="54" x2="360" y2="54" stroke="#4d5934" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <text x="350" y="32" textAnchor="end" fill="#5c6949" fontSize="8" fontFamily="Geist">
              TARGET ENVELOPE (60–75%)
            </text>

            {/* Zones A/B Nominal Curve (Dark Olive) */}
            <path
              d="M 10,38 Q 65,36 120,40 T 230,37 T 345,39"
              fill="none"
              stroke="#3f4b2e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Field C Dip Curve (Red) */}
            <path
              d="M 10,40 Q 60,42 120,52 T 180,68 T 240,94 T 300,75 T 345,46"
              fill="none"
              stroke="#ba1a1a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Critical Low Dip Dot */}
            <circle cx="240" cy="94" r="4.5" fill="#ba1a1a" />
            <circle cx="240" cy="94" r="2" fill="#ffffff" />

            {/* Day Axis Markers */}
            <g fontSize="9" fontFamily="Geist" fill="#76786d" textAnchor="middle">
              <text x="15" y="115">Thu</text>
              <text x="70" y="115">Fri</text>
              <text x="125" y="115">Sat</text>
              <text x="180" y="115">Sun</text>
              <text x="240" y="115" fill="#ba1a1a" fontWeight="600">Tue</text>
              <text x="295" y="115">Wed</text>
              <text x="345" y="115" fill="#4d5934" fontWeight="600">Today</text>
            </g>
          </svg>
        </div>

        {/* Temperature Stat footer */}
        <div className="pt-2 border-t border-[#f4f4ef] flex items-center justify-between text-[11px] font-data-mono text-[#45483e]">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#4d5934]">
              thermostat
            </span>
            <span>Mean Soil Root Depth Temp:</span>
          </div>
          <span className="font-bold text-[#1a1c19]">23.6°C (Sub-Surface 15cm)</span>
        </div>
      </div>

      {/* Hydraulic Efficiency Card */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 font-bold text-[14px] text-[#1a1c19]">
            <span className="material-symbols-outlined text-[18px] text-[#4a7c59]">
              eco
            </span>
            <span>HYDRAULIC EFFICIENCY</span>
          </div>
          <span className="text-[11px] font-data-mono font-bold text-[#4a7c59]">
            +14.2% vs Flood Baseline
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] font-bold font-data-mono text-[#1a1c19]">
              3,420 Liters
            </span>
            <span className="text-[12px] text-[#76786d]">conserved this week</span>
          </div>
          <p className="text-[12px] text-[#45483e] leading-snug mt-1">
            Achieved via localized micro-irrigation algorithms adapting to nocturnal soil suction rates and solar radiation models.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-[#eeeee9] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#4d5934] h-full rounded-full transition-all duration-500"
              style={{ width: '85.5%' }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-data-mono text-[#76786d] mt-1.5">
            <span>Weekly Target: 4,000 L</span>
            <span className="font-semibold text-[#1a1c19]">85.5% achieved</span>
          </div>
        </div>
      </div>

      {/* Plot C Drip Lateral Photo Card */}
      <div className="mb-2">
        <IrrigationPlotArtwork className="w-full" />
      </div>

      {/* Actuator Calibration Modal */}
      {showActuatorModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e4e6d8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eeeee9]">
              <h4 className="font-bold text-[16px] text-[#1a1c19]">Actuator Manual Tuning</h4>
              <button
                onClick={() => setShowActuatorModal(false)}
                className="text-[#76786d] hover:text-[#1a1c19]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs">
              <p className="text-[#45483e]">
                Direct hardware bypass for Field Gateway 04 solenoid actuators:
              </p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-[#f4f4ef] flex items-center justify-between">
                  <span>Pulse Duration Override:</span>
                  <select
                    value={activeDripMinutes}
                    onChange={(e) => setActiveDripMinutes(Number(e.target.value))}
                    className="bg-white border border-[#e2e3de] rounded-lg px-2 py-1 font-data-mono"
                  >
                    <option value={15}>15 mins</option>
                    <option value={30}>30 mins</option>
                    <option value={38}>38 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                  </select>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f4f4ef] flex items-center justify-between">
                  <span>Pressure Regulator:</span>
                  <span className="font-data-mono font-semibold text-[#4a7c59]">1.8 Bar Nominal</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowActuatorModal(false)}
              className="w-full py-2.5 bg-[#3f4b2e] hover:bg-[#4d5934] text-white rounded-xl text-xs font-semibold"
            >
              Apply Calibration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
