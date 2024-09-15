import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';

import { ErrorOr } from '@core/types/error-or.type';
import { ResonatorDetail } from '@core/types/item-detail.type';

import { DisplayResonator } from './resonators.component';

@Injectable({
	providedIn: 'root',
})
export class ResonatorsService {
	constructor(private http: HttpClient) {}

	public getResonators(): Observable<DisplayResonator[]> {
		return this.http.get<DisplayResonator[]>('raw/resonators/list.json');
	}

	public getResonator(
		resonatorName: string
	): Observable<ErrorOr<ResonatorDetail>> {
		return this.http
			.get<ResonatorDetail>(
				`raw/resonators/${resonatorName.toLowerCase()}.json`
			)
			.pipe(
				map((resonator) => {
					return ErrorOr.value<ResonatorDetail>(resonator);
				}),
				catchError((error) => {
					let errorDetails;
					if (error.status === 404) {
						errorDetails =
							'Wubby does not know this resonator! Please raise an issue on GitHub.';
					} else {
						errorDetails = error.message;
					}

					return of(ErrorOr.error<ResonatorDetail>(errorDetails, error.status));
				})
			);
	}
}
