export interface HistoryPayloadDTO {
	cardPoolType: number;
	cardPoolId: string;
	languageCode: string;
	playerId: string;
	serverId: string;
	recordId: string;
}

export interface HistoryResponseDTO {
	code: number;
	message: string;
	data: ResourceHistoryDTO[];
}

export interface ResourceHistoryDTO {
	cardPoolType: string;
	resourceId: number;
	qualityLevel: number;
	resourceType: string;
	name: string;
	count: number;
	time: string;
	pity?: number;
}
