import { ProfilePrice } from "./account.model";

export interface PriceConfig {
    profilePrices: ProfilePrice[],
}

export interface PriceConfigToSend {
    profilePrices: ProfilePriceToSend[];
}

export interface ProfilePriceToSend {
    priceH: number;
    profile: string;
}