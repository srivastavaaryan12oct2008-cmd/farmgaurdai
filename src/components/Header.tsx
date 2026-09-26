import React, { useState } from 'react';
import { OFFICIAL_LOGO_URL } from '../constants/mockData.ts';
import { ScreenId } from '../types.ts';

interface HeaderProps {
  currentScreen: ScreenId;
  subTitle?: string;
  unreadAlertsCount: number;
  onNavigate: (screen: ScreenId) => void;
  onToggleSearch?: () => void;
}

export function Header({
  currentScreen,
  subTitle,
  unreadAlertsCount,
  onNavigate,
  onToggleSearch,
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  // Derive contextual station title based on screen
  const getScreenContext = () => {
    switch (currentScreen) {
      case 'scan':
        return 'Crop Scanner';
      case 'irrigation':
        return 'Irrigation Control';
      case 'edge':
        return 'Edge Telemetry';
      case 'home':
        return 'Farm Station V2.4';
      case 'alerts':
        return 'Field Alerts';
      default:
        return subTitle || 'Crop Scanner';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fafaf5]/90 backdrop-blur-md border-b border-[#e2e3de] px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Brand Lockup */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-[#e2e3de] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="FarmGuard Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-[15px] text-[#1a1c19] leading-tight tracking-tight flex items-center gap-1">
              FarmGuard<span className="text-[#4d5934]">AI</span>
            </span>
            <span className="text-[11px] text-[#5c6949] font-medium leading-tight">
              {getScreenContext()}
            </span>
          </div>
        </div>

        {/* Center / Right Control Cluster */}
        <div className="flex items-center gap-2">
          {/* Edge Local Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dae8c0]/50 border border-[#becc9d]/40 text-[#3f4b27] font-data-mono text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4d5934] animate-pulse"></span>
            <span>EDGE LOCAL</span>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onToggleSearch}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#45483e] hover:bg-[#eeeee9] transition-colors"
            title="Search field records"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Alert Notifications Trigger */}
          <button
            onClick={() => onNavigate('alerts')}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#45483e] hover:bg-[#eeeee9] transition-colors"
            title="Active Field Alerts"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#fafaf5]"></span>
            )}
          </button>

          {/* User Profile Trigger */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full bg-[#4d5934] text-white flex items-center justify-center text-[13px] font-semibold hover:bg-[#3f4b27] transition-all shadow-xs"
              title="Station Profile"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e2e3de] p-3 z-50 text-left">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#eeeee9]">
                  <div className="w-8 h-8 rounded-full bg-[#dae8c0] text-[#3f4b27] flex items-center justify-center font-bold text-xs">
                    FG
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1a1c19]">Punavli South Farm</p>
                    <p className="text-[10px] text-[#5c6949] font-data-mono">ID: KVK-GJ-483</p>
                  </div>
                </div>
                <div className="py-2 space-y-1 text-xs">
                  <div className="flex justify-between text-[#45483e] py-1">
                    <span>Active Gateway:</span>
                    <span className="font-data-mono font-medium text-[#1a1c19]">Node #04</span>
                  </div>
                  <div className="flex justify-between text-[#45483e] py-1">
                    <span>Inference Core:</span>
                    <span className="font-data-mono text-[#4d5934] font-medium">TPU 4 TOPS</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#eeeee9] flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate('auth');
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Switch Terminal / Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
