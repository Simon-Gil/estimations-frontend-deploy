import { LoadUserEstimations } from "./user.model";
import { Opportunity } from "./opportunity.models";

export interface Estimation {
    createdAt: string,
    expDate: string,
    id: string,
    name:string,
    status:string,
    updatedAt:string,
    tasks: Tasks,
    users: LoadUserEstimations[]
    maxCost: number;
    minCost: number;
    hMin: number;
    hMax: number;
    total: number;
    opportunity?: Opportunity; 
}

export interface Tasks {
    tasks: Task[]; 
}

export interface Task {
    id: string;
    maxCost: number;
    minCost: number;
    status: string;
    hrsTaskProfiles: HrsTaskProfiles[];
    description: string;
}

export interface HrsTaskProfiles{
    hMax: number;
    hMin: number;
    maxCost: number;
    minCost: number;
    status: string;
    profile: Profile;
}

export type UpdateHrsProfile = Pick<HrsTaskProfiles, 'hMax' | 'hMin' >;

export interface Profile {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
    secondLevelCategories: SecondLevelCategory[];
}

export interface TaskWithSLC {
    slc: string;
    task: Task;
}

export interface SecondLevelCategory {
    id: string;
    name: string;
    tasks: Task[];
}