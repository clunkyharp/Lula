export declare class SessionStartDto {
    plannedMinutes: number;
}
export declare class SessionTickDto {
    sessionId: string;
    minuteIndex: number;
    violated: boolean;
    reason?: string;
}
export declare class SessionEndDto {
    sessionId: string;
}
