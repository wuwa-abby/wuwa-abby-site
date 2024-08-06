export interface UserProfileTable {
	id?: number;
	profileName: string;
	profileImage?: string;
	inGameID: number;
	server: string;
	lastUpdateDate?: Date;
	isActive: boolean;
	historyUrlBase64: string;
}
