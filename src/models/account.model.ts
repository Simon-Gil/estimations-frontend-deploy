export interface Account {
  id: string;
  name: string;
  email: string;
  priceConfig?: {
    id: string;
    isDefault: boolean;
    profilePrices?: ProfilePrice[];
  };
  technicalManager?: Manager;

  commercialManager?: Manager;
  
  profilesPrices?: ProfilePrice[];
}

export interface ProfilePrice {
  priceH: number;
  profile: Profile;
}

export interface Profile {
  name: string;
  id: string;
}

export interface Manager {
  id: string;
  name: string;
  lastname: string;
  email: string;
}