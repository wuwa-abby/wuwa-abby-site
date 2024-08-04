import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { firstValueFrom } from 'rxjs';

import {
	HistoryPayloadDTO,
	HistoryResponseDTO,
	ResourceHistoryDTO,
} from '@app/core/types/kuro-history.type';
import { StorageService } from '@app/core/services/storage.service';
import { getInvalidClass } from '@app/core/helpers/primeng-func.helper';

@Injectable({
	providedIn: 'root',
})
export class ImportService {
	constructor(
		private http: HttpClient,
		private storageService: StorageService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	public onHistoryReceived = new EventEmitter<ResourceHistoryDTO[]>();
	public onHistoryProgress = new EventEmitter<{ cur: number; total: number }>();

	public importForm = new FormGroup({
		platform: new FormControl<string>('win'),
		historyUrl: new FormControl<string | undefined>(undefined, [
			Validators.required,
			Validators.pattern(
				/https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html#\/record\?.*/
			),
		]),
		adbPath: new FormControl<string | undefined>(undefined, [
			Validators.pattern(
				/^[a-zA-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$/
			),
		]),
		isHistoryImported: new FormControl<boolean>(false),
	});

	/**
	 * Get History data from Kuro server API.
	 *
	 * @see onHistoryReceived to get the complete history data. Emits an array of HistoryResponse when all pools are fetched.
	 * @see onHistoryProgress to get the current pool being fetched. Emits the pool ID.
	 *
	 * @returns void
	 */
	public async importHistory() {
		const url = this.importForm.get('historyUrl')?.value;
		if (!url) {
			throw new Error('ImportService.importHistory: No history URL provided.');
		}

		const history: ResourceHistoryDTO[] = [];
		const reqBody = this.getUrlData(url);
		if (!reqBody) {
			throw new Error('ImportService.importHistory: Received invalid URL.', {
				cause: url,
			});
		}

		reqBody.languageCode = 'en';

		const progress = { cur: 0, total: 7 };
		this.onHistoryReceived.emit();
		this.onHistoryProgress.emit();
		for (let poolId = 1; poolId <= progress.total; poolId++) {
			try {
				reqBody.cardPoolType = poolId;
				progress.cur = poolId;

				const response = await firstValueFrom(
					this.http.post<HistoryResponseDTO>(
						'https://gmserver-api.aki-game2.net/gacha/record/query',
						reqBody
					)
				);
				this.onHistoryProgress.emit(progress);

				history.push(...response.data);
			} catch (e) {
				console.error(e);
				continue;
			}
		}

		this.onHistoryReceived.emit(history);
	}

	/**
	 * Save the history data to the local storage. This method will not save the data if the platform is not a browser.
	 *
	 * @param history The history data to be saved.
	 * @returns void
	 */
	public async saveHistory(history: ResourceHistoryDTO[]) {
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		const gachaMemoryStore = this.storageService.getGachaMemoryTable();

		const lastRecord = await gachaMemoryStore.orderBy('time').reverse().first();

		if (lastRecord) {
			const lastRecordTime = new Date(lastRecord.time);

			history = history.filter((r) => new Date(r.time) > lastRecordTime);
		}

		await gachaMemoryStore.bulkAdd(history);
	}

	/**
	 * Extract data from the URL. This method will not try to validate the URL.
	 *
	 * @param url History URL from the game.
	 * @returns Object with the data extracted from the URL.
	 */
	public getUrlData(url: string): HistoryPayloadDTO | undefined {
		if (!url) return undefined;

		return {
			playerId: url.match(/player_id=(\d+)/)?.[1]!,
			cardPoolId: url.match(/resources_id=([a-f0-9]+)/)?.[1]!,
			cardPoolType: parseInt(url.match(/gacha_type=(\d+)/)?.[1] || '0'),
			serverId: url.match(/svr_id=([a-f0-9]+)/)?.[1]!,
			languageCode: url.match(/lang=([a-z]+)/)?.[1]!,
			recordId: url.match(/record_id=([a-f0-9]+)/)?.[1]!,
		};
	}
}
