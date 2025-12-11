import { Product, ShowroomZone } from "@/types/showroom";

export const products: Product[] = [
  {
    id: "mesh-panel",
    name: "X-Guard Machine Guard Panel",
    category: "Machine Guarding",
    description: "High-strength welded mesh panels for industrial machine protection. Modular design allows flexible configurations around any machinery.",
    features: [
      "50x50mm mesh opening standard",
      "4mm wire diameter steel construction",
      "Powder-coated finish (RAL colors)",
      "Quick-connect post mounting system",
      "Meets ISO 14120 & EN ISO 13857"
    ],
    specs: {
      "Panel Width": "200-1400mm",
      "Panel Height": "1400-2200mm",
      "Wire Diameter": "4mm / 5mm",
      "Load Capacity": "250N point load"
    },
    position: [-5, 0, -3],
    color: "#FFB800"
  },
  {
    id: "safety-door",
    name: "Interlocked Safety Door",
    category: "Access Control",
    description: "Industrial safety door with integrated interlock system. Ensures machine stops before personnel can access hazardous areas.",
    features: [
      "Integrated safety interlock (Category 4)",
      "Handle with emergency release",
      "Adjustable hinges & self-closing",
      "Visual status indicators",
      "Compatible with all major PLCs"
    ],
    specs: {
      "Door Width": "600-1200mm",
      "Door Height": "2000-2200mm",
      "Interlock Rating": "PLe / SIL3",
      "Cycles": "1M+ operations"
    },
    position: [0, 0, -3],
    color: "#FF4444"
  },
  {
    id: "light-curtain",
    name: "SafeBeam Light Curtain",
    category: "Optical Safety",
    description: "Photoelectric safety light curtains for machine access point protection. Invisible barrier triggers immediate machine stop on intrusion.",
    features: [
      "14mm finger detection resolution",
      "Response time <15ms",
      "Self-monitoring diagnostics",
      "Muting & blanking functions",
      "IP65 rated housing"
    ],
    specs: {
      "Detection Height": "300-1800mm",
      "Resolution": "14/20/30mm",
      "Range": "Up to 20m",
      "Safety Level": "Type 4 / PLe"
    },
    position: [5, 0, -3],
    color: "#00D4FF"
  },
  {
    id: "safety-lock",
    name: "TrapLock Safety Interlock",
    category: "Safety Interlocks",
    description: "Electromagnetic door locking device with guard locking. Prevents access until machine has reached safe state.",
    features: [
      "2500N holding force",
      "Solenoid guard locking",
      "RFID coded actuator",
      "Escape release inside",
      "Daisy-chain capable"
    ],
    specs: {
      "Holding Force": "2500N",
      "Voltage": "24VDC",
      "IP Rating": "IP67",
      "Coding": "RFID high-coded"
    },
    position: [-5, 0, 2],
    color: "#8B5CF6"
  },
  {
    id: "safety-scanner",
    name: "AreaGuard Safety Scanner",
    category: "Area Protection",
    description: "Laser safety scanner for area monitoring and mobile robot protection. Configurable protective and warning fields.",
    features: [
      "275° scanning angle",
      "Up to 5.5m protective field",
      "16 field set configurations",
      "Integrated I/O for AGV control",
      "Built-in encoder interface"
    ],
    specs: {
      "Scan Angle": "275°",
      "Protective Range": "5.5m",
      "Warning Range": "20m",
      "Response": "62ms"
    },
    position: [0, 0, 2],
    color: "#22C55E"
  },
  {
    id: "partition-wall",
    name: "Industrial Partition Wall",
    category: "Area Separation",
    description: "Floor-to-ceiling industrial partition systems for separating work zones, pedestrian walkways, and hazardous areas.",
    features: [
      "Solid or mesh panel options",
      "Sliding door configurations",
      "Integrated signage options",
      "Fire-rated variants available",
      "Acoustic dampening option"
    ],
    specs: {
      "Max Height": "4000mm",
      "Panel Types": "Mesh/Solid/Glass",
      "Post Spacing": "1000-1400mm",
      "Finish": "Powder coat RAL"
    },
    position: [5, 0, 2],
    color: "#F97316"
  }
];

export const showroomZones: ShowroomZone[] = [
  {
    id: "entrance",
    name: "Entrance",
    position: [0, 2, 10],
    cameraTarget: [0, 0, 0]
  },
  {
    id: "machine-guarding",
    name: "Machine Guarding",
    position: [-6, 2, -3],
    cameraTarget: [-5, 1, -3]
  },
  {
    id: "access-control",
    name: "Access Control",
    position: [0, 2, -5],
    cameraTarget: [0, 1, -3]
  },
  {
    id: "optical-safety",
    name: "Optical Safety",
    position: [6, 2, -3],
    cameraTarget: [5, 1, -3]
  },
  {
    id: "area-protection",
    name: "Area Protection",
    position: [0, 2, 4],
    cameraTarget: [0, 1, 2]
  }
];
