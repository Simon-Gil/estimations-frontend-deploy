export interface SecurityConfig {
    maxLoginAttempts: number;
    blockDurationMinutes: number;
    expirationAuthTokenHours: number;
    expirationResetTokenHours: number;
}

export interface EmailConfig {
    sendUserFinishedEmail: boolean;
    sendDoneEstimationEmail: boolean;
    sendAssignedUserEmail: boolean;
}
