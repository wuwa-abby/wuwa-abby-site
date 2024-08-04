import { UserProfileTable } from '../model/user-profile.table';

export interface UserProfileDTO extends UserProfileTable {
	historyUrl?: string;
}
