/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav.tsx';
import { Header } from './components/Header.tsx';
import { ScreenAlerts } from './components/ScreenAlerts.tsx';
import { ScreenAuth } from './components/ScreenAuth.tsx';
import { ScreenEdge } from './components/ScreenEdge.tsx';
import { ScreenHome } from './components/ScreenHome.tsx';
import { ScreenIrrigation } from './components/ScreenIrrigation.tsx';
import { ScreenScanner } from './components/ScreenScanner.tsx';
import { ScreenSplash } from './components/ScreenSplash.tsx';
import { INITIAL_ALERTS, INITIAL_SUB_NODES, INITIAL_VALVES } from './constants/mockData.ts';
import { AlertItem, LanguageCode, ScreenId, SubNode, ValveActuator } from './types.ts';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [valves, setValves] = useState<ValveActuator[]>(INITIAL_VALVES);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [subNodes] = useState<SubNode[]>(INITIAL_SUB_NODES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleValve = (id: string) => {
    setValves((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextState = !v.isOpen;
          return {
            ...v,
            isOpen: nextState,
            status: nextState ? 'ACTIVE DRIP' : 'IDLE',
            detail: nextState ? '45m target pulse' : 'Moisture 68%',
          };
        }
        return v;
      })
    );
    showToast(`Valve ${id} state updated via local mesh gateway.`);
  };

  const handleDeployPulse = () => {
    setValves((prev) =>
      prev.map((v) =>
        v.id === 'v3'
          ? {
              ...v,
              isOpen: true,
              status: 'ACTIVE DRIP',
              detail: '45m left',
              timeRemainingMinutes: 45,
            }
          : v
      )
    );
    // Mark alert 1 as addressed
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === 'alt-1'
          ? { ...a, description: 'Target 45m drip pulse currently irrigating Sub-Root Block 2.' }
          : a
      )
    );
    showToast('Hydro-pulse active: Solenoid #03 engaged for 45-min capillary cycle.');
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast('Alert dismissed from local buffer.');
  };

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a))
    );
  };

  const unreadAlertsCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1c19] flex flex-col font-sans">
      {/* Quick Screen Switcher Bar (Direct access to all 5 screens shown in the user's reference images) */}
      <div className="bg-[#1a1c19] text-white text-[11px] font-data-mono px-3 py-1.5 flex items-center justify-between border-b border-[#2f312e] overflow-x-auto z-50 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0 pr-3">
          <span className="w-2 h-2 rounded-full bg-[#dae8b8] animate-pulse"></span>
          <span className="text-[#dae8b8] font-bold">SCREENS:</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setCurrentScreen('splash')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              currentScreen === 'splash'
                ? 'bg-[#4d5934] text-white font-bold'
                : 'text-[#c6c8bb] hover:text-white'
            }`}
          >
            1. Splash
          </button>
          <button
            onClick={() => setCurrentScreen('auth')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              currentScreen === 'auth'
                ? 'bg-[#4d5934] text-white font-bold'
                : 'text-[#c6c8bb] hover:text-white'
            }`}
          >
            2. Sign-In
          </button>
          <button
            onClick={() => setCurrentScreen('scan')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              currentScreen === 'scan'
                ? 'bg-[#4d5934] text-white font-bold'
                : 'text-[#c6c8bb] hover:text-white'
            }`}
          >
            3. AI Scanner
          </button>
          <button
            onClick={() => setCurrentScreen('irrigation')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              currentScreen === 'irrigation'
                ? 'bg-[#4d5934] text-white font-bold'
                : 'text-[#c6c8bb] hover:text-white'
            }`}
          >
            4. Irrigation
          </button>
          <button
            onClick={() => setCurrentScreen('edge')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              currentScreen === 'edge'
                ? 'bg-[#4d5934] text-white font-bold'
                : 'text-[#c6c8bb] hover:text-white'
            }`}
          >
            5. Edge Telemetry
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-[#4d5934] text-white font-bold'
                : 'text-[#c6c8bb] hover:text-white'
            }`}
          >
            Overview
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {currentScreen === 'splash' ? (
        <ScreenSplash onNavigate={setCurrentScreen} />
      ) : currentScreen === 'auth' ? (
        <ScreenAuth
          onNavigate={setCurrentScreen}
          language={language}
          onLanguageChange={setLanguage}
        />
      ) : (
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <Header
            currentScreen={currentScreen}
            unreadAlertsCount={unreadAlertsCount}
            onNavigate={setCurrentScreen}
            onToggleSearch={() =>
              showToast('Edge Search: Indexed 184 foliar observations & soil tensiometer readings.')
            }
          />

          {/* Screen Body */}
          <main className="flex-1">
            {currentScreen === 'home' && (
              <ScreenHome
                onNavigate={setCurrentScreen}
                valves={valves}
                onDeployPulse={handleDeployPulse}
              />
            )}
            {currentScreen === 'scan' && (
              <ScreenScanner
                onNavigate={setCurrentScreen}
                onLogSaved={showToast}
              />
            )}
            {currentScreen === 'irrigation' && (
              <ScreenIrrigation
                onNavigate={setCurrentScreen}
                valves={valves}
                onToggleValve={handleToggleValve}
                onDeployPulse={handleDeployPulse}
              />
            )}
            {currentScreen === 'alerts' && (
              <ScreenAlerts
                alerts={alerts}
                onNavigate={setCurrentScreen}
                onDismissAlert={handleDismissAlert}
                onResolveAlert={handleResolveAlert}
              />
            )}
            {currentScreen === 'edge' && <ScreenEdge subNodes={subNodes} />}
          </main>

          {/* Bottom Persistent Navigation */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            unreadAlertsCount={unreadAlertsCount}
          />
        </div>
      )}

      {/* Global Agro-Ecological Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-[#1a1c19] text-[#e8f6c5] px-4 py-2.5 rounded-xl shadow-2xl border border-[#4d5934] font-data-mono text-xs flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#dae8b8]">
            info
          </span>
          <span className="flex-1 leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#76786d] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
