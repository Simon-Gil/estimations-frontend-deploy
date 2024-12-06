import { Estimation } from "./estimation.model";

export interface Opportunity {
    id: string;
    name: string;
    requirements: string[];
    typology: Typology;
    commercialManager?: string;
    technicalManager?: string; 
    accountId: string; 
    createdAt: string;
    status: string;
    updatedAt: string;
    proposals: Proposal[];
}

export interface Proposal {
    techProposal: string,
    goalAndContext: string,
    id: string,
    estimatedMonths: number | null,
    total: number
    status: string;
    estimation: Estimation | null;
}


export interface Typology {
    id: string;
    name: string;
}

export type DataCreateOpportunity = Pick<Opportunity, 'name' | 'requirements' | 'typology' | 'commercialManager' | 'technicalManager' | 'accountId'>;