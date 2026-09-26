import { AlertItem, CropScanFinding, SubNode, ValveActuator } from '../types.ts';

export const OFFICIAL_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WlAkmrwD-wnsZJ1_Cxw95Izajzi1dmHXKJ7O6OkPkGM3f5dl5wRN18UMMf_slInsQUSdWPztPnqqEjB68nPVbg_NsbhZ6tu9hO8PP_2nT5B5zouKWmC-8SdZvMU-KA-87WZVe-5zn20DsTxsSJddfNyOpdOy8KZ-R_RmzjruYLRnOoxGgkyzZrO8Et7ZzZV82DwV_lxk-9-tMzE6JRNprauaOL_OTwiUN7wGV5atf2B9Y1Soat2iBKlWv6';

export const INITIAL_VALVES: ValveActuator[] = [
  {
    id: 'v1',
    name: 'Valve #01',
    field: 'Field A',
    crop: 'Tomato Plot',
    type: 'Micro-Sprinkler',
    status: 'AUTO',
    detail: 'Sched 18:30',
    isOpen: false,
  },
  {
    id: 'v2',
    name: 'Valve #02',
    field: 'Field B',
    crop: 'Durum Wheat',
    type: 'Sub-Surface D...',
    status: 'IDLE',
    detail: 'Moisture 68%',
    isOpen: false,
  },
  {
    id: 'v3',
    name: 'Valve #03',
    field: 'Field C',
    crop: 'Tomato Plot',
    type: 'Lateral Drip Li...',
    status: 'ACTIVE DRIP',
    detail: '38m left',
    timeRemainingMinutes: 38,
    isOpen: true,
  },
];

export const INITIAL_SUB_NODES: SubNode[] = [
  {
    id: 'node-a1',
    name: 'Sub-node A1',
    field: 'Field A',
    description: 'Wheat Canopy West',
    status: 'Optimal',
    rfSignal: '-68 dBm',
    battery: 91,
    meshLatency: 14,
  },
  {
    id: 'node-b2',
    name: 'Sub-node B2',
    field: 'Field B',
    description: 'High Density Mustard',
    status: 'Optimal',
    rfSignal: '-74 dBm',
    battery: 88,
    meshLatency: 18,
  },
  {
    id: 'node-c3',
    name: 'Sub-node C3',
    field: 'Field C',
    description: 'South Boundary Siphon',
    status: 'Mesh Relay',
    rfSignal: '-82 dBm',
    battery: 79,
    meshLatency: 22,
  },
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    title: 'Water stress detected in Field C',
    severity: 'critical',
    location: 'Field C · Sub-Root Block 2',
    timestamp: '12m ago',
    description:
      'Hydraulic tensiometer threshold breached (21% VWC vs 30% baseline). Plant turgor loss imminent.',
    resolved: false,
    actionLabel: 'Deploy Irrigation Pulse',
    actionTarget: 'irrigation',
  },
  {
    id: 'alt-2',
    title: 'Pathology Flag: Early Blight (A. solani)',
    severity: 'warning',
    location: 'Field C · Row 4 West Sector',
    timestamp: '42m ago',
    description:
      'Concentric foliar lesions identified via CAM_01. High dew morning humidity accelerates spore multiplication.',
    resolved: false,
    actionLabel: 'View Diagnosis & Rx',
    actionTarget: 'scan',
  },
  {
    id: 'alt-3',
    title: 'Sub-node C3 switched to Mesh Relay',
    severity: 'info',
    location: 'Field C · South Boundary',
    timestamp: '2h ago',
    description:
      'Automatic multi-hop routing engaged through Sub-node B2 due to dense canopy expansion.',
    resolved: true,
    actionLabel: 'Inspect Mesh Status',
    actionTarget: 'edge',
  },
];

export const DEFAULT_FINDING: CropScanFinding = {
  id: 'finding-early-blight',
  disease: 'Early Blight',
  scientificName: 'Alternaria solani',
  confidence: 91,
  severity: 'Moderate Severity',
  hostOrganism: 'Solanum lycopersicum (Tomato)',
  markers: [
    'Concentric target-like dark rings observed on lower foliar canopy.',
    'Fungal conidia reproduction active during early vegetative stage.',
  ],
  foliageDew: '94% (High Risk)',
  foliageDewRisk: 'High Risk',
  canopyTemp: '29.2°C (Optimal Spore)',
  canopyTempCondition: 'Optimal Spore',
  actionPlan: {
    step1: 'Isolate perimeter • Row 4 West Sector',
    step2:
      'Inspect surrounding 12 plants in Row 4. Apply organic copper-based bio-fungicide or cold-pressed neem oil extract (5ml/L) within 24 hours.',
    dosage: '2.5g/L',
    applicationTime: 'Sunset (17:30)',
    step3:
      'Prolonged morning surface dew (94%) coupled with ambient 29°C canopy temperature dramatically accelerates germination of A. solani spores before midday evaporation.',
  },
  inferenceTime: '48ms',
  modelName: 'AgriVision-MobileNetV4',
};

export const ALTERNATIVE_FINDINGS: Record<string, CropScanFinding> = {
  'healthy-tomato': {
    id: 'finding-healthy',
    disease: 'Optimal Plant Vigour',
    scientificName: 'Solanum lycopersicum (Healthy)',
    confidence: 98,
    severity: 'Low',
    hostOrganism: 'Solanum lycopersicum (Tomato)',
    markers: [
      'Uniform chlorophyll index observed across primary foliar fan.',
      'Stomatal opening nominal, zero vascular discoloration.',
    ],
    foliageDew: '42% (Normal)',
    foliageDewRisk: 'Low',
    canopyTemp: '24.1°C (Nominal)',
    canopyTempCondition: 'Normal',
    actionPlan: {
      step1: 'Maintain standard micro-irrigation scheduling.',
      step2:
        'No fungicidal intervention needed. Continue regular organic biostimulant foliar spray next Tuesday.',
      dosage: 'Standard',
      applicationTime: 'Morning (07:00)',
      step3:
        'Canopy transpiration index and leaf wetness are in the protective equilibrium zone.',
    },
    inferenceTime: '36ms',
    modelName: 'AgriVision-MobileNetV4',
  },
  'late-blight': {
    id: 'finding-late-blight',
    disease: 'Late Blight Alert',
    scientificName: 'Phytophthora infestans',
    confidence: 94,
    severity: 'Critical',
    hostOrganism: 'Solanum lycopersicum (Tomato)',
    markers: [
      'Water-soaked dark lesions spreading rapidly across leaflet margins.',
      'Delicate white fungal mycelium visible under leaf underside.',
    ],
    foliageDew: '98% (Critical)',
    foliageDewRisk: 'High Risk',
    canopyTemp: '19.8°C (Incubation Zone)',
    canopyTempCondition: 'Critical Risk',
    actionPlan: {
      step1: 'IMMEDIATE QUARANTINE: Mark and bag infected plant tissues.',
      step2:
        'Apply systemic bio-agent or copper hydroxide spray across all contiguous beds immediately.',
      dosage: '3.0g/L',
      applicationTime: 'Immediate within 4h',
      step3:
        'Rapid spore dispersion occurs with relative humidity above 90%. Cease overhead sprinkler cycles immediately.',
    },
    inferenceTime: '42ms',
    modelName: 'AgriVision-MobileNetV4',
  },
};

export const TRANSLATIONS: Record<
  string,
  {
    welcomeTitle: string;
    tagline: string;
    subtagline: string;
    enterBtn: string;
    alreadyRegistered: string;
    signIn: string;
    farmTitle: string;
    heroSubtitle: string;
    farmerIdLabel: string;
    passcodeLabel: string;
    rememberVault: string;
    signInBtn: string;
    demoFarm: string;
    smsOtp: string;
  }
> = {
  en: {
    welcomeTitle: 'FarmGuard AI',
    tagline: 'Detect early. Decide locally. Farm smarter.',
    subtagline:
      'Sovereign, zero-latency plant pathology and microclimate intelligence right at the farm gate.',
    enterBtn: 'Enter FarmGuard',
    alreadyRegistered: 'Already registered on workstation?',
    signIn: 'Sign In',
    farmTitle: 'Intelligence for every acre.',
    heroSubtitle:
      'AI-powered crop intelligence that works where your farm does — even when connectivity is limited.',
    farmerIdLabel: 'Farmer ID, Email, or Phone',
    passcodeLabel: 'Passcode or Password',
    rememberVault: 'Remember my farm credentials',
    signInBtn: 'Sign In to Terminal',
    demoFarm: 'Continue as Demo Farm',
    smsOtp: 'Sign in with Farm Passcode / SMS OTP',
  },
  hi: {
    welcomeTitle: 'फार्मगार्ड एआई',
    tagline: 'जल्दी पहचानें। स्थानीय निर्णय लें। स्मार्ट खेती करें।',
    subtagline:
      'खेत के गेट पर ही बिना इंटरनेट के त्वरित पौध रोग निदान और सूक्ष्म जलवायु बुद्धिमत्ता।',
    enterBtn: 'फार्मगार्ड में प्रवेश करें',
    alreadyRegistered: 'क्या वर्कस्टेशन पर पंजीकृत हैं?',
    signIn: 'साइन इन करें',
    farmTitle: 'हर एकड़ के लिए बुद्धिमत्ता।',
    heroSubtitle:
      'एआई-सक्षम फसल तकनीक जो आपके खेत में काम करती है — सीमित नेटवर्क में भी।',
    farmerIdLabel: 'किसान आईडी, ईमेल या फ़ोन',
    passcodeLabel: 'पासकोड या पासवर्ड',
    rememberVault: 'मेरे क्रेडेंशियल्स याद रखें',
    signInBtn: 'टर्मिनल में साइन इन करें',
    demoFarm: 'डेमो फार्म के रूप में जारी रखें',
    smsOtp: 'फार्म पासकोड / ओटीपी से लॉगिन करें',
  },
  te: {
    welcomeTitle: 'ఫార్మ్‌గార్డ్ AI',
    tagline: 'ముందే గుర్తించండి. స్థానికంగా నిర్ణయించండి. స్మార్ట్ వ్యవసాయం చేయండి.',
    subtagline:
      'మీ వ్యవసాయ క్షేత్రం వద్దే ఇంటర్నెట్ లేకపోయినా వేగవంతమైన పంట రోగ నిర్ధారణ.',
    enterBtn: 'ఫార్మ్‌గార్డ్‌లోకి ప్రవేశించండి',
    alreadyRegistered: 'ఇప్పటికే వర్క్‌స్టేషన్‌లో రిజిస్టర్ అయ్యారా?',
    signIn: 'సైన్ ఇన్ చేయండి',
    farmTitle: 'ప్రతి ఎకరాకు మేధస్సు.',
    heroSubtitle:
      'నెట్‌వర్క్ లేని ప్రదేశాల్లో కూడా మీ పంట సంరక్షణ కోసం సమర్థవంతంగా పనిచేసే AI సాంకేతికత.',
    farmerIdLabel: 'రైతు ID, ఈమెయిల్ లేదా ఫోన్',
    passcodeLabel: 'పాస్‌కోడ్ లేదా పాస్‌వర్డ్',
    rememberVault: 'నా ఆధారాలను గుర్తుంచుకో',
    signInBtn: 'టెర్మినల్‌కు సైన్ ఇన్ చేయండి',
    demoFarm: 'డెమో ఫారమ్‌గా కొనసాగండి',
    smsOtp: 'ఫార్మ్ పాస్‌కోడ్ / SMS OTP తో లాగిన్',
  },
  ta: {
    welcomeTitle: 'ஃபார்ம்கார்ட் AI',
    tagline: 'முன்கூட்டியே கண்டறியவும். உள்ளூரிலேயே முடிவெடுக்கவும். ஸ்மார்ட்டாக விவசாயம் செய்யவும்.',
    subtagline:
      'இணைய இணைப்பு இல்லாவிட்டாலும் உங்கள் பண்ணையிலேயே அதிவேக தாவர நோய் கண்டறிதல்.',
    enterBtn: 'ஃபார்ம்கார்டில் நுழையவும்',
    alreadyRegistered: 'ஏற்கனவே பதிவு செய்துள்ளீர்களா?',
    signIn: 'உள்நுழையவும்',
    farmTitle: 'ஒவ்வொரு ஏக்கருக்கும் நுண்ணறிவு.',
    heroSubtitle:
      'குறைந்த இணைய வசதியிலும் உங்கள் பண்ணை நிலத்தில் நேரடியாக இயங்கும் பயிர் நுண்ணறிவு.',
    farmerIdLabel: 'விவசாயி ஐடி, மின்னஞ்சல் அல்லது தொலைபேசி',
    passcodeLabel: 'கடவுக்குறியீடு அல்லது கடவுச்சொல்',
    rememberVault: 'எனது நற்சான்றிதழ்களை நினைவில் கொள்ளவும்',
    signInBtn: 'முனையத்தில் உள்நுழையவும்',
    demoFarm: 'டெமோ பண்ணையாக தொடரவும்',
    smsOtp: 'பண்ணை கடவுக்குறியீடு / SMS OTP மூலம் உள்நுழைக',
  },
};
