import React, { useState } from 'react';
import { SubNode } from '../types.ts';
import { SolarMastArtwork } from './FieldImagery.tsx';

interface ScreenEdgeProps {
  subNodes: SubNode[];
}

export function ScreenEdge({ subNodes }: ScreenEdgeProps) {
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [showDiagModal, setShowDiagModal] = useState(false);
  const [queuedSyncCount, setQueuedSyncCount] = useState(14);
  const [syncingCloud, setSyncingCloud] = useState(false);

  const runSelfDiagnostic = () => {
    setShowDiagModal(true);
    setDiagnosticRunning(true);
    setDiagnosticLogs([
      'Initiating Hardware Self-Test (KVK-Edge-01)...',
      'Checking LiFePO4 Battery Cell Volts: 13.8V [OK]',
      'Testing Solar MPPT Charge Controller: 4.8W Influx [OK]',
      'Pinging LoRa Mesh Sub-nodes (A1, B2, C3)... [ALL ACKNOWLEDGED]',
      'Verifying Edge TPU NPU Engine (4 TOPS)... [ACCELERATION READY]',
      'Auditing SQLite Telemetry Database: Integrity OK (98.4 MB free)',
      'Self-Diagnostic Completed: All 6 subsystem cores operating at peak sovereign state.',
    ]);
    setTimeout(() => {
      setDiagnosticRunning(false);
    }, 1500);
  };

  const handleExportLogs = () => {
    const data = {
      station: 'FarmGuard Edge-01',
      hardwareId: '48:3F:DA:11:BC:09',
      uptime: '99.98%',
      timestamp: new Date().toISOString(),
      power: '94% LiFePO4',
      subNodes,
      sensorStatus: {
        soilProbe: 'Calibrated',
        pyranometer: 'Active',
        leafWetness: '94% high',
        ambientTemp: '29.2°C',
        rainGauge: '0.0 mm/hr',
      },
      queuedTelemetryPackets: queuedSyncCount,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmguard_edge_telemetry_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncCloud = () => {
    if (queuedSyncCount === 0) return;
    setSyncingCloud(true);
    setTimeout(() => {
      setQueuedSyncCount(0);
      setSyncingCloud(false);
    }, 1000);
  };

  return (
    <div className="px-4 py-4 max-w-md mx-auto pb-24 text-[#1a1c19]">
      {/* Subheader & Tag */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-data-mono text-[11px] text-[#45483e] font-semibold uppercase tracking-wider">
            DECENTRALIZED COMPUTE ENGINE
          </span>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dae8c0]/40 text-[#3f4b27] font-data-mono text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]"></span>
            <span>Mesh Active</span>
          </div>
        </div>
        <h1 className="text-[24px] font-bold text-[#1a1c19] tracking-tight">
          Edge Intelligence
        </h1>
        <p className="text-[13px] text-[#45483e] mt-0.5 leading-snug">
          Resilient zero-cloud local computing deployed directly in your fields. Full autonomous inference regardless of uplink status.
        </p>
      </div>

      {/* Hero Solar Edge Mast Artwork Card */}
      <div className="mb-3">
        <SolarMastArtwork className="w-full" />
      </div>

      {/* Power & Probes Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Power Card */}
        <div className="bg-white rounded-2xl border border-[#e4e6d8] p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#76786d] mb-1">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#4d5934]">
                solar_power
              </span>
              <span>Power</span>
            </div>
            <span className="font-data-mono font-medium text-[#4a7c59]">Active Harv.</span>
          </div>

          <div className="flex items-baseline gap-1 my-1">
            <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
              94%
            </span>
            <span className="text-[11px] font-data-mono text-[#76786d]">LiFePO4</span>
          </div>

          <div className="w-full bg-[#eeeee9] h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-[#4d5934] h-full rounded-full"
              style={{ width: '94%' }}
            ></div>
          </div>
        </div>

        {/* Probe Ring Card */}
        <div className="bg-white rounded-2xl border border-[#e4e6d8] p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#76786d] mb-1">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#4d5934]">
                sensors
              </span>
              <span>Probe Ring</span>
            </div>
            <span className="font-data-mono font-medium text-[#4a7c59]">5/5 Calibrated</span>
          </div>

          <div className="flex items-baseline gap-1 my-1">
            <span className="text-[22px] font-bold font-data-mono text-[#1a1c19]">
              5
            </span>
            <span className="text-[11px] font-data-mono text-[#76786d]">online</span>
          </div>

          <div className="w-full bg-[#eeeee9] h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-[#4d5934] h-full rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Connectivity & Telemetry Metadata Card */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="space-y-2 text-[12px] pb-3 border-b border-[#f4f4ef]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#76786d]">
              <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
                hub
              </span>
              <span>Connectivity Backhaul</span>
            </div>
            <span className="font-data-mono font-semibold text-[#1a1c19]">
              LoRa Mesh + 4G Fallback
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#76786d]">
              <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
                timer
              </span>
              <span>Last Inference</span>
            </div>
            <span className="font-data-mono text-[#1a1c19]">
              <span className="font-bold">12s ago</span>{' '}
              <span className="text-[#5c6949]">(AgriVision-V3)</span>
            </span>
          </div>
        </div>

        {/* Sensor Tag Pills Row */}
        <div className="pt-3 flex flex-wrap gap-1.5">
          {['Soil Probe', 'Pyranometer', 'Ambient Temp', 'Leaf Wetness', 'Rain Gauge'].map(
            (tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#f4f4ef] border border-[#e2e3de] font-data-mono text-[10px] text-[#45483e] font-medium"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Zero-Cloud Resilience Section */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eeeee9] flex items-center justify-center text-[#4d5934]">
              <span className="material-symbols-outlined text-[18px]">cloud_off</span>
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1a1c19]">
                Zero–Cloud Resilience
              </h3>
              <p className="text-[11px] text-[#5c6949]">Independent Field Sovereign</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-[#dae8c0]/50 text-[#3f4b27] font-data-mono text-[10px] font-bold">
            ACTIVE STATE
          </span>
        </div>

        <p className="text-[12px] text-[#45483e] leading-relaxed mb-3">
          Internet connection unavailable or intermittent?{' '}
          <span className="font-semibold text-[#1a1c19]">
            Zero operational disruption.
          </span>{' '}
          Hardware performs autonomous valve control, soil analysis, and microclimate forecasting locally.
        </p>

        {/* Feature List */}
        <div className="space-y-2 py-2 border-t border-[#f4f4ef] text-[12px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#1a1c19]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d5934]"></span>
              Sensor Processing
            </span>
            <span className="font-data-mono text-[11px] text-[#5c6949]">
              SQLite (98.4 MB free)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#1a1c19]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d5934]"></span>
              Local AI Diagnosis
            </span>
            <span className="font-data-mono text-[11px] text-[#4d5934] font-semibold">
              Edge TPU 4 TOPS
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#1a1c19]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d5934]"></span>
              Cloud Uplink Sync
            </span>
            <button
              onClick={handleSyncCloud}
              disabled={syncingCloud || queuedSyncCount === 0}
              className="px-2 py-0.5 rounded bg-[#f4f4ef] border border-[#e2e3de] font-data-mono text-[11px] font-bold text-[#1a1c19] hover:bg-[#eeeee9] transition-colors cursor-pointer"
            >
              {syncingCloud ? 'Syncing...' : `${queuedSyncCount} Queued`}
            </button>
          </div>
        </div>

        {/* Architecture Pipeline Diagram */}
        <div className="mt-3 pt-3 border-t border-[#f4f4ef] bg-[#f4f4ef]/70 rounded-xl p-2.5 text-center font-data-mono text-[11px] text-[#45483e] flex items-center justify-center gap-1.5">
          <span>((•)) Probes</span>
          <span>→</span>
          <span>⚙ Local TPU</span>
          <span>→</span>
          <span>🚰 Valves</span>
          <span className="text-[#ba1a1a] font-bold">✕</span>
          <span className="line-through text-[#76786d]">☁ Cloud</span>
        </div>
      </div>

      {/* Field Mesh Sub-Nodes */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[15px] text-[#1a1c19]">Field Mesh Sub-Nodes</h3>
          <span className="text-[11px] font-data-mono text-[#76786d]">
            3 Active Nodes
          </span>
        </div>

        <div className="space-y-2.5">
          {subNodes.map((node) => (
            <div
              key={node.id}
              className="p-3 rounded-xl bg-[#f4f4ef] border border-[#e2e3de]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#4d5934]">
                    cell_tower
                  </span>
                  <div>
                    <h4 className="font-bold text-[13px] text-[#1a1c19] leading-tight">
                      {node.name}
                    </h4>
                    <p className="text-[11px] text-[#76786d]">
                      {node.field} · {node.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold font-data-mono ${
                    node.status === 'Optimal'
                      ? 'bg-[#dae8c0] text-[#3f4b27]'
                      : 'bg-[#dce8bc] text-[#3f4b2e]'
                  }`}
                >
                  {node.status}
                </span>
              </div>

              {/* 3 Metrics in Sub-node */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-data-mono pt-1">
                <div className="bg-white p-1.5 rounded-lg border border-[#e2e3de]">
                  <span className="text-[9px] text-[#76786d] block">RF SIGNAL</span>
                  <span className="font-semibold text-[#1a1c19]">{node.rfSignal}</span>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-[#e2e3de]">
                  <span className="text-[9px] text-[#76786d] block">BATTERY</span>
                  <span className="font-semibold text-[#1a1c19]">{node.battery}%</span>
                </div>
                <div className="bg-white p-1.5 rounded-lg border border-[#e2e3de]">
                  <span className="text-[9px] text-[#76786d] block">MESH LATENCY</span>
                  <span className="font-semibold text-[#1a1c19]">{node.meshLatency} ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Interactive Tool Buttons */}
      <div className="space-y-2">
        <button
          onClick={runSelfDiagnostic}
          className="w-full py-3 px-4 bg-[#3f4b2e] hover:bg-[#4d5934] text-white rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px]">build</span>
          <span>Run Self-Diagnostic</span>
        </button>

        <button
          onClick={handleExportLogs}
          className="w-full py-2.5 px-4 bg-white hover:bg-[#f4f4ef] border border-[#e2e3de] text-[#1a1c19] rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px] text-[#4d5934]">
            download
          </span>
          <span>Export Edge Telemetry Log</span>
        </button>
      </div>

      {/* Self-Diagnostic Output Modal */}
      {showDiagModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e4e6d8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eeeee9]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#4d5934]">
                  verified
                </span>
                <h4 className="font-bold text-[15px] text-[#1a1c19]">
                  Edge Node Self-Test
                </h4>
              </div>
              <button
                onClick={() => setShowDiagModal(false)}
                className="text-[#76786d] hover:text-[#1a1c19]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="py-3">
              <div className="bg-[#1a1c19] text-[#dae8b8] p-3 rounded-xl font-data-mono text-[11px] space-y-1.5 max-h-56 overflow-y-auto">
                {diagnosticLogs.map((log, i) => (
                  <div key={i} className="leading-snug">
                    <span className="text-[#5c6949] mr-1">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowDiagModal(false)}
              className="w-full py-2 bg-[#3f4b2e] hover:bg-[#4d5934] text-white rounded-xl text-xs font-semibold"
            >
              Dismiss Diagnostic Viewer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
