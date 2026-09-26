export type ScreenId = 'splash' | 'auth' | 'home' | 'scan' | 'irrigation' | 'alerts' | 'edge';

export type LanguageCode = 'en' | 'hi' | 'te' | 'ta';

export interface ValveActuator {
  id: string;
  name: string;
  field: string;
  crop: string;
  type: string;
  status: 'AUTO' | 'IDLE' | 'ACTIVE DRIP' | 'MANUAL';
  detail: string;
  timeRemainingMinutes?: number;
  isOpen: boolean;
}

export interface SubNode {
  id: string;
  name: string;
  field: string;
  description: string;
  status: 'Optimal' | 'Mesh Relay' | 'Degraded';
  rfSignal: string;
  battery: number;
  meshLatency: number;
}

export interface CropScanFinding {
  id: string;
  disease: string;
  scientificName: string;
  confidence: number;
  severity: 'Low' | 'Moderate Severity' | 'Critical';
  hostOrganism: string;
  markers: string[];
  foliageDew: string;
  foliageDewRisk: 'Low' | 'Moderate' | 'High Risk';
  canopyTemp: string;
  canopyTempCondition: string;
  actionPlan: {
    step1: string;
    step2: string;
    dosage: string;
    applicationTime: string;
    step3: string;
  };
  inferenceTime: string;
  modelName: string;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  location: string;
  timestamp: string;
  description: string;
  resolved: boolean;
  actionLabel?: string;
  actionTarget?: ScreenId;
}
