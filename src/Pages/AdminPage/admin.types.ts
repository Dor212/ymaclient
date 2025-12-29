export type ProjectType = "landing" | "business" | "shop" | "other";

export type RefClientForm = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  niche: string;
  note: string;
  active: boolean;
  projectType: ProjectType;
  maxLeadsPerWeek: string;
};

export type ProjectForm = {
  clientName: string;
  projectType: string;
  description: string;
  longDescription: string;
  url: string;
  images: string[];
  active: boolean;
};

export type RefClientItem = {
  _id: string;
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  niche?: string;
  note?: string;
  projectType: ProjectType;
  isActive: boolean;
  maxLeadsPerWeek?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectItem = {
  _id: string;
  clientName: string;
  projectType: string;
  description: string;
  longDescription: string;
  url: string;
  liveUrl: string;
  images: string[];
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
