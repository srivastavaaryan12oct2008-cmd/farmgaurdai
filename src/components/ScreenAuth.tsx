import React, { useState } from 'react';
import { OFFICIAL_LOGO_URL, TRANSLATIONS } from '../constants/mockData.ts';
import { LanguageCode, ScreenId } from '../types.ts';

interface ScreenAuthProps {
  onNavigate: (screen: ScreenId) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export function ScreenAuth({ onNavigate, language, onLanguageChange }: ScreenAuthProps) {
  const [farmerId, setFarmerId] = useState('farmer@krishi.in');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberCredentials, setRememberCredentials] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('home');
    }, 400);
  };

  const handleDemoLogin = () => {
    setFarmerId('demo.krishi@punavli.farm');
    setPassword('••••••••');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('home');
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf5] text-[#1a1c19] px-4 py-6 flex flex-col justify-between max-w-md mx-auto selection:bg-[#dae8c0]">
      {/* Top Station Bar */}
      <div>
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-[#e2e3de] flex items-center justify-center shrink-0">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#1a1c19] leading-tight">
                FarmGuard <span className="text-[#4d5934]">AI</span>
              </div>
              <div className="text-[10px] text-[#5c6949] font-data-mono font-medium tracking-wide">
                EDGE STATION V2.4
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dae8c0]/40 border border-[#becc9d]/40 text-[#3f4b27] font-data-mono text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#4d5934] animate-pulse"></span>
            <span>Offline Capable</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="mt-2 mb-6">
          <div className="flex items-center gap-1.5 text-[#4d5934] font-data-mono text-[11px] font-bold tracking-wider uppercase mb-1">
            <span className="material-symbols-outlined text-[14px]">sensors</span>
            <span>EMPOWERING RURAL AGRICULTURE</span>
          </div>
          <h1 className="text-[26px] font-bold text-[#1a1c19] tracking-tight leading-snug">
            {t.farmTitle}
          </h1>
          <p className="text-[13px] text-[#45483e] mt-1.5 leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-white rounded-2xl border border-[#e4e6d8] p-5 shadow-xs mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Farmer ID Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#1a1c19]">
                  {t.farmerIdLabel}
                </label>
                <span className="text-[10px] font-data-mono text-[#5c6949] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59]"></span>
                  Synced to Edge Node
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#76786d]">
                  badge
                </span>
                <input
                  type="text"
                  value={farmerId}
                  onChange={(e) => setFarmerId(e.target.value)}
                  placeholder="farmer@krishi.in or +91 98765 43210"
                  className="w-full bg-[#f4f4ef] border border-[#e2e3de] rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-[#1a1c19] placeholder:text-[#76786d] focus:outline-none focus:border-[#4d5934] focus:ring-1 focus:ring-[#4d5934] transition-all font-data-mono"
                  required
                />
              </div>
            </div>

            {/* Passcode Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-[#1a1c19]">
                  {t.passcodeLabel}
                </label>
                <button
                  type="button"
                  onClick={() => alert('Offline Terminal Recovery: Please use physical hardware key or request SMS OTP via local Mesh gateway.')}
                  className="text-[11px] text-[#4d5934] hover:underline font-medium cursor-pointer"
                >
                  Forgot passcode?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#76786d]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f4f4ef] border border-[#e2e3de] rounded-xl pl-9 pr-10 py-2.5 text-[13px] text-[#1a1c19] focus:outline-none focus:border-[#4d5934] focus:ring-1 focus:ring-[#4d5934] transition-all font-data-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#76786d] hover:text-[#1a1c19] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[12px] text-[#1a1c19]">
                <input
                  type="checkbox"
                  checked={rememberCredentials}
                  onChange={(e) => setRememberCredentials(e.target.checked)}
                  className="w-4 h-4 rounded border-[#c6c8bb] text-[#3f4b2e] focus:ring-[#4d5934]"
                />
                <span>{t.rememberVault}</span>
              </label>
              <span className="text-[10px] text-[#5c6949] font-data-mono flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-[#4a7c59]">check_circle</span>
                Local vault
              </span>
            </div>

            {/* Primary Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#3f4b2e] hover:bg-[#4d5934] text-white rounded-xl text-[14px] font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75"
            >
              <span>{isSubmitting ? 'Authenticating Local Node...' : t.signInBtn}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#eeeee9]"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-data-mono text-[#76786d] uppercase tracking-wider bg-white px-2">
              OR CONTINUE WITH
            </div>
          </div>

          {/* Quick Demo Farm Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-[#f4f4ef] hover:bg-[#eeeee9] border border-[#e2e3de] flex items-center justify-between text-[#1a1c19] text-[13px] font-medium transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#dae8c0] flex items-center justify-center text-[#3f4b27]">
                  <span className="material-symbols-outlined text-[16px]">agriculture</span>
                </div>
                <span>{t.demoFarm}</span>
              </div>
              <span className="text-[10px] font-data-mono px-2 py-0.5 rounded-full bg-[#dae8c0]/60 text-[#3f4b27] font-bold">
                INSTANT
              </span>
            </button>

            {/* SMS OTP fallback button */}
            <button
              type="button"
              onClick={() => {
                alert('Mesh OTP triggered: Verification token dispatched via LoRa SMS to +91 98765 43210');
                onNavigate('home');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#f4f4ef] border border-[#e2e3de] flex items-center justify-center gap-2 text-[#45483e] hover:text-[#1a1c19] text-[12px] font-medium transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#76786d]">sms</span>
              <span>{t.smsOtp}</span>
            </button>
          </div>
        </div>

        {/* Active Mesh Node Signal Box */}
        <div className="bg-[#f4f4ef] border border-[#e2e3de] rounded-xl p-3 mb-3 text-[12px]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 font-medium text-[#1a1c19]">
              <span className="material-symbols-outlined text-[16px] text-[#4d5934]">cell_tower</span>
              <span>Active Mesh Node: Punavli-South #04</span>
            </div>
            <span className="font-data-mono font-bold text-[#4d5934]">98.4% SNR</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#5c6949] font-data-mono">
            <span>⚙ YOLOv8 Edge Vision Ready</span>
            <span>•</span>
            <span>🔋 Solar 100%</span>
          </div>
        </div>

        {/* On-Device Sovereign Privacy Banner */}
        <div className="bg-[#dae8c0]/35 border border-[#becc9d]/40 rounded-xl p-3 mb-4 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-[#4d5934] shrink-0 mt-0.5">
            verified_user
          </span>
          <p className="text-[12px] text-[#3f4b27] leading-relaxed">
            <span className="font-semibold text-[#141f06]">On-Device Encryption:</span> Zero-cloud field inference keeps your telemetry, crop images, and harvest yield records entirely sovereign and private.
          </p>
        </div>
      </div>

      {/* Language Selector & Certified Footer */}
      <div className="pt-2">
        <div className="text-center mb-2">
          <span className="text-[10px] font-data-mono uppercase tracking-wider text-[#76786d]">
            SELECT FARM INTERFACE LANGUAGE
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {(
            [
              { code: 'en', label: 'English (EN)' },
              { code: 'hi', label: 'हिन्दी (HI)' },
              { code: 'te', label: 'తెలుగు (TE)' },
              { code: 'ta', label: 'தமிழ் (TA)' },
            ] as const
          ).map((item) => (
            <button
              key={item.code}
              onClick={() => onLanguageChange(item.code)}
              className={`py-1.5 px-1 rounded-lg text-[11px] font-medium transition-all text-center ${
                language === item.code
                  ? 'bg-[#3f4b2e] text-white shadow-xs'
                  : 'bg-white border border-[#e2e3de] text-[#45483e] hover:bg-[#eeeee9]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="text-center text-[11px] font-data-mono text-[#76786d] pb-2">
          Hardware ID: 48:3F:DA:11:BC:09 · Krishi Vigyan Kendra Certified
        </div>
      </div>
    </div>
  );
}
