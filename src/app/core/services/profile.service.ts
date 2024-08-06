import { Injectable } from '@angular/core';

import { Table } from 'dexie';
import { Buffer } from 'buffer';

import { StorageService } from './storage.service';
import { UserProfileTable } from '../model/user-profile.table';
import { getServerString } from '../helpers/server.helper';
import { UserProfileDTO } from '../types/user-profile.type';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	constructor(private storageService: StorageService) {}

	public get table(): Table<UserProfileTable, number> {
		return this.storageService.getUserProfileTable();
	}

	//#region Db Operations
	public async getAllProfiles() {
		return await this.storageService.getUserProfileTable().toArray();
	}

	public async getProfile(id: number) {
		const profile: UserProfileDTO | undefined = await this.storageService
			.getUserProfileTable()
			.get(id);
		if (!profile) return undefined;

		profile.historyUrl = this.parseHistoryUrl(profile.historyUrlBase64);

		return profile;
	}

	public async addProfile(historyUrl: string, profile: UserProfileTable) {
		if (historyUrl)
			profile.historyUrlBase64 = Buffer.from(historyUrl).toString('base64');
		else throw new Error('Profile history URL is required');

		return await this.storageService.getUserProfileTable().add(profile);
	}

	public async updateProfile(
		id: number,
		historyUrl: string,
		profile: UserProfileTable
	) {
		if (historyUrl)
			profile.historyUrlBase64 = Buffer.from(historyUrl).toString('base64');
		else throw new Error('Profile history URL is required');

		return await this.storageService.getUserProfileTable().update(id, profile);
	}

	public async deleteProfile(id: number) {
		return await this.storageService.getUserProfileTable().delete(id);
	}
	//#endregion

	public async createProfile(
		playerId: number,
		historyUrl: string,
		name?: string,
		setActive: boolean = false
	) {
		const existingProfile = await this.table
			.where('inGameID')
			.equals(playerId)
			.first();

		if (existingProfile) return existingProfile;

		const newProfile: UserProfileTable = {
			inGameID: playerId,
			profileName: name ?? `Rover`,
			isActive: false,
			server: getServerString(playerId),
			historyUrlBase64: '',
		};

		const id = await this.addProfile(historyUrl, newProfile);
		newProfile.profileId = id;

		if (setActive) await this.setActiveProfile(id);

		return newProfile;
	}

	public async getActiveProfile(): Promise<UserProfileDTO | undefined> {
		const profiles = await this.getAllProfiles();

		const profile: UserProfileDTO | undefined = profiles.find(
			(profile) => profile.isActive
		);
		if (!profile) return undefined;

		profile.historyUrl = Buffer.from(
			profile.historyUrlBase64,
			'base64'
		).toString();

		return profile;
	}

	public async setActiveProfile(id: number) {
		const profiles = await this.getAllProfiles();

		for (const profile of profiles) {
			profile.isActive = profile.profileId === id;
		}

		await this.storageService.getUserProfileTable().bulkPut(profiles);
	}

	public parseHistoryUrl(base64Url: string): string {
		if (!base64Url) return '';

		return Buffer.from(base64Url, 'base64').toString();
	}
}
