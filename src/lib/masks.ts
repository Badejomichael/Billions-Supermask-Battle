// src/lib/masks.ts
export type MaskItem = {
  id: string;
  name: string;
  src: string;
};

export const MASKS: MaskItem[] = [
  { id: "mask1", name: "Supermask One", src: "/mask1.png" },
  { id: "mask2", name: "Supermask Two", src: "/mask2.png" },
  { id: "mask3", name: "Supermask Three", src: "/mask3.png" },
  { id: "mask4", name: "Supermask Four", src: "/mask4.png" },
];
