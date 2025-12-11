export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  position: [number, number, number];
  color: string;
}

export interface ShowroomZone {
  id: string;
  name: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
}

export interface HotspotData {
  productId: string;
  position: [number, number, number];
  label: string;
}
