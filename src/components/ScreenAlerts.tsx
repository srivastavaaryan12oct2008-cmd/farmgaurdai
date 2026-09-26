import React, { useState } from 'react';
import { AlertItem, ScreenId } from '../types.ts';

interface ScreenAlertsProps {
  alerts: AlertItem[];
  onNavigate: (screen: ScreenId) => void;
  onDismissAlert: (id: string) => void;
  onResolveAlert: (id: string) => void;
}

export function ScreenAlerts({
  alerts,
  onNavigate,
  onDismissAlert,
  onResolveAlert,
}: ScreenAlertsProps) {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'all') return true;
    return a.severity === filter;
  });

  return (
    <div className="px-4 py-4 max-w-md mx-auto pb-24 text-[#1a1c19]">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="font-data-mono text-[11px] text-[#45483e] font-semibold uppercase tracking-wider">
            REAL-TIME FIELD TELEMETRY
          </span>
          <span className="text-[11px] font-data-mono text-[#ba1a1a] font-semibold">
            {alerts.filter((a) => !a.resolved).length} Unresolved
          </span>
        </div>
        <h1 className="text-[24px] font-bold text-[#1a1c19] tracking-tight">
          Field Alerts &amp; Incidents
        </h1>
        <p className="text-[13px] text-[#45483e] mt-0.5 leading-snug">
          Decentralized telemetry warnings pushed from LoRa gateway and camera traps.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-3 bg-[#eeeee9] p-1 rounded-xl">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-white text-[#1a1c19] shadow-xs'
              : 'text-[#45483e] hover:text-[#1a1c19]'
          }`}
        >
          All ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('critical')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'critical'
              ? 'bg-white text-[#ba1a1a] shadow-xs'
              : 'text-[#45483e] hover:text-[#1a1c19]'
          }`}
        >
          Critical ({alerts.filter((a) => a.severity === 'critical').length})
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'warning'
              ? 'bg-white text-[#92400e] shadow-xs'
              : 'text-[#45483e] hover:text-[#1a1c19]'
          }`}
        >
          Warnings ({alerts.filter((a) => a.severity === 'warning').length})
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e4e6d8] p-8 text-center text-[#76786d]">
            <span className="material-symbols-outlined text-[36px] text-[#4a7c59] mb-2">
              check_circle
            </span>
            <p className="text-sm font-semibold text-[#1a1c19]">No Active Alerts</p>
            <p className="text-xs text-[#5c6949] mt-0.5">
              All field sensors and actuators are in nominal operating envelope.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl border p-4 shadow-xs transition-all ${
                alert.resolved
                  ? 'border-[#e2e3de] opacity-60'
                  : alert.severity === 'critical'
                  ? 'border-[#ffdad6]'
                  : 'border-[#fef3c7]'
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      alert.severity === 'critical'
                        ? 'text-[#ba1a1a]'
                        : alert.severity === 'warning'
                        ? 'text-[#92400e]'
                        : 'text-[#4d5934]'
                    }`}
                  >
                    {alert.severity === 'critical'
                      ? 'error'
                      : alert.severity === 'warning'
                      ? 'warning'
                      : 'info'}
                  </span>
                  <div>
                    <h3 className="font-bold text-[14px] text-[#1a1c19] leading-tight">
                      {alert.title}
                    </h3>
                    <p className="text-[11px] font-data-mono text-[#76786d]">
                      {alert.location} · {alert.timestamp}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onDismissAlert(alert.id)}
                  className="text-[#76786d] hover:text-[#1a1c19] text-xs p-1"
                  title="Dismiss alert"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <p className="text-[12px] text-[#45483e] leading-snug my-2">
                {alert.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#f4f4ef] mt-2">
                <button
                  onClick={() => onResolveAlert(alert.id)}
                  className="text-[11px] font-semibold text-[#4d5934] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {alert.resolved ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>{alert.resolved ? 'Marked Resolved' : 'Mark as Handled'}</span>
                </button>

                {alert.actionTarget && alert.actionLabel && (
                  <button
                    onClick={() => onNavigate(alert.actionTarget!)}
                    className="px-3 py-1.5 rounded-lg bg-[#3f4b2e] hover:bg-[#4d5934] text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>{alert.actionLabel}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_forward
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
