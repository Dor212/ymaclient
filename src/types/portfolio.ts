export type PortfolioProject = {
    _id: string;
    clientName: string;
    projectType: string;
    shortDescription: string;
    images: string[];
    order: number;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
};