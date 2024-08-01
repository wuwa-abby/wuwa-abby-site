import { Injectable } from '@angular/core';

import Dexie, { Table } from 'dexie';

import { GachaMemoryTable } from '../model/gacha-history.table';
import { GeneralMemoryTable } from '../model/general-data.table';

@Injectable({
	providedIn: 'root',
})
export class StorageService extends Dexie {
	constructor() {
		super('wubby-memory');
		this.version(1).stores({
			gacha:
				'++id,cardPoolType,cardPoolId,qualityLevel,resourceType,name,count,time,pity',
			memory: 'key,value',
		});

		this.open()
			.then(() => {
				console.debug('Database opened successfully');
			})
			.catch(() => {
				console.error('Error opening database');
			});
	}

	public generalMemoryTable!: Table<GeneralMemoryTable, string>;
	public gachaMemoryStore!: Table<GachaMemoryTable, number>;

	public get db(): Dexie {
		return this;
	}

	public getGeneralMemoryTable(): Table<GeneralMemoryTable, string> {
		return this.table('memory');
	}

	public getGachaMemoryStore(): Table<GachaMemoryTable, number> {
		return this.table('gacha');
	}
}
