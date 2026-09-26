import React from 'react';
import { ScreenId } from '../types.ts';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unreadAlertsCount: number;
}

export function BottomNav({
  currentScreen,
  onNavigate,
  unreadAlertsCount,
}: BottomNavProps) {
  const tabs: { id: ScreenId; label: string; icon: string; filledIcon: string }[] = [
    { id: 'home', label: 'Home', icon: 'grid_view', filledIcon: 'grid_view' },
    { id: 'scan', label: 'Scan', icon: 'crop_free', filledIcon: 'crop_free' },
    { id: 'irrigation', label: 'Irrigation', icon: 'water_drop', filledIcon: 'water_drop' },
    { id: 'alerts', label: 'Alerts', icon: 'notifications', filledIcon: 'notifications' },
    { id: 'edge', label: 'Edge', icon: 'memory', filledIcon: 'memory' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fafaf5]/95 backdrop-blur-md border-t border-[#e2e3de] pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 shadow-lg">
      <div className="max-w-md mx-auto px-3 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#4d5934]'
                  : 'text-[#76786d] hover:text-[#1a1c19]'
              }`}
            >
              {/* Highlight Circle for Active Tab */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 rounded-full bg-[#4d5934] transition-all"></span>
              )}

              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[24px] transition-transform ${
                    isActive ? 'scale-110 material-symbols-filled' : ''
                  }`}
                >
                  {tab.icon}
                </span>

                {/* Unread Alert Indicator */}
                {tab.id === 'alerts' && unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-[#fafaf5]"></span>
                )}
              </div>

              <span
                className={`text-[11px] mt-0.5 tracking-tight font-medium ${
                  isActive ? 'font-bold text-[#4d5934]' : 'text-[#76786d]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
