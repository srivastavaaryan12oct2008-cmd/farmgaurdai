import React, { useState } from 'react';
import { ALTERNATIVE_FINDINGS, DEFAULT_FINDING } from '../constants/mockData.ts';
import { CropScanFinding, ScreenId } from '../types.ts';
import { TomatoPlantArtwork } from './FieldImagery.tsx';

interface ScreenScannerProps {
  onNavigate: (screen: ScreenId) => void;
  onLogSaved?: (message: string) => void;
}

export function ScreenScanner({ onNavigate, onLogSaved }: ScreenScannerProps) {
  const [finding, setFinding] = useState<CropScanFinding>(DEFAULT_FINDING);
  const [isScanning, setIsScanning] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleRetake = () => {
    setIsScanning(true);
    setUserImage(null);
    setTimeout(() => {
      setIsScanning(false);
      setFinding(DEFAULT_FINDING);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        setIsScanning(true);
        setTimeout(() => {
          setIsScanning(false);
          // Toggle or keep finding
          setFinding(DEFAULT_FINDING);
        }, 700);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (key: string) => {
    if (key === 'default') {
      setFinding(DEFAULT_FINDING);
    } else if (ALTERNATIVE_FINDINGS[key]) {
      setFinding(ALTERNATIVE_FINDINGS[key]);
    }
  };

  const handleSaveLog = () => {
    setSaveSuccess(true);
    if (onLogSaved) {
      onLogSaved(`Saved "${finding.disease}" diagnosis to Field C Agronomic Log.`);
    }
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="px-4 py-4 max-w-md mx-auto pb-24 text-[#1a1c19]">
      {/* Subheader & Tag */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-data-mono text-[11px] text-[#45483e] font-semibold uppercase tracking-wider">
            EDGE INFERENCE ENGINE
          </span>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dae8c0]/40 text-[#3f4b27] font-data-mono text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]"></span>
            <span>TFLite v2.14 · Local</span>
          </div>
        </div>
        <h1 className="text-[24px] font-bold text-[#1a1c19] tracking-tight">
          AI Crop Scanner
        </h1>
        <p className="text-[13px] text-[#45483e] mt-0.5 leading-snug">
          Identify crop health issues directly from the field with on-device edge neural models.
        </p>
      </div>

      {/* Preset pathology quick-selector for testing */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 mb-3 scrollbar-none">
        <span className="text-[10px] font-data-mono text-[#76786d] uppercase whitespace-nowrap">
          Sample:
        </span>
        <button
          onClick={() => handleSelectPreset('default')}
          className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
            finding.disease === 'Early Blight'
              ? 'bg-[#3f4b2e] text-white font-medium'
              : 'bg-white border border-[#e2e3de] text-[#45483e]'
          }`}
        >
          Early Blight (Tomato)
        </button>
        <button
          onClick={() => handleSelectPreset('healthy-tomato')}
          className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
            finding.disease === 'Optimal Plant Vigour'
              ? 'bg-[#3f4b2e] text-white font-medium'
              : 'bg-white border border-[#e2e3de] text-[#45483e]'
          }`}
        >
          Healthy Canopy
        </button>
        <button
          onClick={() => handleSelectPreset('late-blight')}
          className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
            finding.disease === 'Late Blight Alert'
              ? 'bg-[#ba1a1a] text-white font-medium'
              : 'bg-white border border-[#e2e3de] text-[#45483e]'
          }`}
        >
          Late Blight
        </button>
      </div>

      {/* Interactive Camera Viewfinder Frame */}
      <div className="relative mb-3">
        <TomatoPlantArtwork
          userImage={userImage}
          scanBox={!isScanning}
          className="w-full"
        />

        {isScanning && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white">
            <div className="w-10 h-10 border-3 border-[#becc9d] border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="font-data-mono text-[12px] text-[#e8f6c5] tracking-wide">
              RUNNING AGRI-VISION NPU INFERENCE...
            </p>
          </div>
        )}

        {/* Viewfinder Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={handleRetake}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f4f4ef] border border-[#e2e3de] text-[#1a1c19] text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-[#4d5934]">
              autorenew
            </span>
            <span>Retake Photo</span>
          </button>

          <label className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#f4f4ef] border border-[#e2e3de] text-[#1a1c19] text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[17px] text-[#4d5934]">
              upload_file
            </span>
            <span>Upload New</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Diagnostic Flow Completed Section */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-3.5 shadow-xs mb-3">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f4f4ef]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#4a7c59] material-symbols-filled">
              check_circle
            </span>
            <span className="font-data-mono text-[11px] font-bold tracking-wider text-[#1a1c19] uppercase">
              DIAGNOSTIC FLOW COMPLETED
            </span>
          </div>
          <span className="font-data-mono text-[11px] font-semibold text-[#4a7c59]">
            100% Verified
          </span>
        </div>

        {/* 2x2 Diagnostic Badges */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-xl bg-[#f4f4ef] border border-[#e2e3de] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#4a7c59] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#1a1c19] truncate">
                Analyzing visual pa...
              </p>
              <p className="text-[10px] text-[#5c6949] font-data-mono">Passed • 12ms</p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#f4f4ef] border border-[#e2e3de] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#4a7c59] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#1a1c19] truncate">
                Crop: Tomato
              </p>
              <p className="text-[10px] text-[#5c6949] font-data-mono">Solanum lyc. • 99%</p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#f4f4ef] border border-[#e2e3de] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#4a7c59] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#1a1c19] truncate">
                Pathogen indexing
              </p>
              <p className="text-[10px] text-[#5c6949] font-data-mono">Fungal identified</p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#f4f4ef] border border-[#e2e3de] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#4a7c59] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#1a1c19] truncate">
                Rx Generated
              </p>
              <p className="text-[10px] text-[#5c6949] font-data-mono">Field C Protocol #4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pathological Finding Card */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-[10px] font-data-mono font-bold tracking-wider text-[#76786d] uppercase">
              PATHOLOGICAL FINDING
            </span>
            <h2 className="text-[20px] font-bold text-[#1a1c19] leading-tight">
              {finding.disease}
            </h2>
            <p className="text-[12px] italic text-[#5c6949] font-serif">
              {finding.scientificName}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="px-2 py-0.5 rounded-md bg-[#dae8c0]/60 text-[#3f4b27] font-data-mono text-[11px] font-bold">
              {finding.confidence}% confidence
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                finding.severity === 'Critical'
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : finding.severity === 'Moderate Severity'
                  ? 'bg-[#fef3c7] text-[#92400e]'
                  : 'bg-[#dae8c0] text-[#3f4b27]'
              }`}
            >
              {finding.severity}
            </span>
          </div>
        </div>

        {/* Detailed Markers Box */}
        <div className="bg-[#f4f4ef] rounded-xl p-3 border border-[#e2e3de] mb-3 text-[12px]">
          <p className="text-[#1a1c19] mb-2 font-medium">
            <span className="text-[#76786d]">Host Organism</span>{' '}
            <span className="font-semibold">{finding.hostOrganism}</span>
          </p>

          <p className="text-[11px] font-semibold text-[#45483e] mb-1">
            Key Manifestation Markers:
          </p>
          <ul className="space-y-1.5 text-[12px] text-[#1a1c19]">
            {finding.markers.map((marker, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[14px] text-[#4d5934] shrink-0 mt-0.5">
                  radio_button_checked
                </span>
                <span className="leading-snug">{marker}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Foliage Dew & Canopy Temp Sub-Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-[#f4f4ef] border border-[#e2e3de]">
            <div className="flex items-center gap-1 text-[#4d5934] mb-0.5">
              <span className="material-symbols-outlined text-[16px]">water_drop</span>
              <span className="text-[11px] font-medium text-[#45483e]">Foliage Dew</span>
            </div>
            <p className="font-data-mono text-[13px] font-bold text-[#1a1c19]">
              {finding.foliageDew}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f4f4ef] border border-[#e2e3de]">
            <div className="flex items-center gap-1 text-[#4d5934] mb-0.5">
              <span className="material-symbols-outlined text-[16px]">thermostat</span>
              <span className="text-[11px] font-medium text-[#45483e]">Canopy Temp</span>
            </div>
            <p className="font-data-mono text-[13px] font-bold text-[#1a1c19]">
              {finding.canopyTemp}
            </p>
          </div>
        </div>
      </div>

      {/* Agronomic Action Plan */}
      <div className="bg-white rounded-2xl border border-[#e4e6d8] p-4 shadow-xs mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#dae8c0]/50 flex items-center justify-center text-[#4d5934]">
            <span className="material-symbols-outlined text-[18px]">medical_services</span>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#1a1c19]">Agronomic Action Plan</h3>
            <p className="text-[11px] text-[#5c6949]">Immediate field intervention prescribed</p>
          </div>
        </div>

        {/* Numbered Steps */}
        <div className="space-y-3 text-[12px]">
          {/* Step 1 */}
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#dae8c0] text-[#3f4b27] font-data-mono font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
              1
            </span>
            <div>
              <p className="font-data-mono text-[10px] uppercase font-bold text-[#76786d]">
                IMMEDIATE CONTAINMENT STATUS
              </p>
              <p className="text-[#1a1c19] leading-snug">{finding.actionPlan.step1}</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#3f4b2e] text-white font-data-mono font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
              2
            </span>
            <div>
              <p className="font-data-mono text-[10px] uppercase font-bold text-[#76786d]">
                MANDATORY FIELD TREATMENT
              </p>
              <p className="text-[#1a1c19] leading-snug mb-1.5">{finding.actionPlan.step2}</p>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#f4f4ef] border border-[#e2e3de] font-data-mono text-[10px] text-[#45483e]">
                  Dosage: {finding.actionPlan.dosage}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#f4f4ef] border border-[#e2e3de] font-data-mono text-[10px] text-[#45483e]">
                  Application: {finding.actionPlan.applicationTime}
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#dae8c0] text-[#3f4b27] font-data-mono font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
              3
            </span>
            <div>
              <p className="font-data-mono text-[10px] uppercase font-bold text-[#76786d]">
                EPIDEMIOLOGICAL CAUSE
              </p>
              <p className="text-[#45483e] leading-snug">{finding.actionPlan.step3}</p>
            </div>
          </div>
        </div>

        {/* Engine Footer */}
        <div className="mt-4 pt-3 border-t border-[#f4f4ef] flex items-center justify-between text-[10px] font-data-mono text-[#76786d]">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#4d5934]">memory</span>
            <span>{finding.modelName}</span>
          </div>
          <span>Edge Inference: {finding.inferenceTime} (Offline)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleSaveLog}
          className={`w-full py-3 px-4 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            saveSuccess
              ? 'bg-[#4a7c59] text-white'
              : 'bg-[#3f4b2e] hover:bg-[#4d5934] text-white active:scale-[0.99]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {saveSuccess ? 'check' : 'bookmark_add'}
          </span>
          <span>{saveSuccess ? 'Saved to Field C Log ✓' : 'Save to Field C Log'}</span>
        </button>

        <button
          onClick={() => setShareModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#f4f4ef] border border-[#e2e3de] text-[#1a1c19] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px] text-[#4d5934]">
            share
          </span>
          <span>Share with Agronomist</span>
        </button>
      </div>

      {/* Agronomist Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e4e6d8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#eeeee9]">
              <h4 className="font-bold text-[16px] text-[#1a1c19]">Share Crop Diagnosis</h4>
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-[#76786d] hover:text-[#1a1c19]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-xs text-[#45483e]">
                Transmit sovereign diagnostic packet for Field C directly to certified Krishi Vigyan Kendra agronomist:
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    alert('Diagnostic packet generated and copied to clipboard.');
                    setShareModalOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#f4f4ef] hover:bg-[#eeeee9] text-left text-xs font-medium text-[#1a1c19] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#4d5934]">chat</span>
                    Dispatch via WhatsApp / SMS
                  </span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
                <button
                  onClick={() => {
                    alert('Exporting PDF Diagnostic Protocol...');
                    setShareModalOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#f4f4ef] hover:bg-[#eeeee9] text-left text-xs font-medium text-[#1a1c19] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#4d5934]">description</span>
                    Download Field Rx PDF
                  </span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => setShareModalOpen(false)}
              className="w-full py-2 bg-[#eeeee9] hover:bg-[#e2e3de] rounded-xl text-xs font-semibold text-[#1a1c19]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
