export interface Conge {
    id?: number;
    iduser: number;
    dateDebut: string;
    dateFin: string;
    numberOfDays: number;
    reason: string;
    status?: string; // e.g., "Pending", "Approved", "Rejected"
    halfDay:string
  }
  