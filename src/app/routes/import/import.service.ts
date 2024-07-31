import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { firstValueFrom } from 'rxjs';

import {
	HistoryPayloadDTO,
	HistoryResponseDTO,
	ResourceHistoryDTO,
} from '@app/core/types/kuro-history.type';

@Injectable({
	providedIn: 'root',
})
export class ImportService {
	constructor(private http: HttpClient) {}

	public onHistoryReceived = new EventEmitter<ResourceHistoryDTO[]>();
	public onHistoryProgress = new EventEmitter<{ cur: number; total: number }>();

	public importForm = new FormGroup({
		platform: new FormControl<string>('and'),
		historyUrl: new FormControl<string | undefined>(undefined, [
			Validators.required,
			Validators.pattern(
				/https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html#\/record\?.*/
			),
		]),
		isHistoryImported: new FormControl<boolean>(false),
	});

	/**
	 * Get the CSS class for the URL
	 *
	 * @returns string
	 */
	public getInvalidUrlCSSClass() {
		const control = this.importForm.get('historyUrl');
		if (control?.pristine || control?.valid) {
			return undefined;
		}

		return 'ng-dirty ng-invalid';
	}

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
	 * Extract data from the URL. This method will not try to validate the URL.
	 *
	 * @param url History URL from the game.
	 * @returns Object with the data extracted from the URL.
	 */
	private getUrlData(url: string): HistoryPayloadDTO | undefined {
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
