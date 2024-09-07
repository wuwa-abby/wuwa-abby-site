import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, of } from 'rxjs';

import { ErrorOr } from '@core/types/error-or.type';

import { DisplayResonator } from './resonators.component';

@Injectable({
	providedIn: 'root',
})
export class ResonatorsService {
	constructor(private http: HttpClient) {}

	public getResonators(): Observable<DisplayResonator[]> {
		return this.http.get<DisplayResonator[]>('raw/resonators/list.json');
	}

	public getResonator(key: string): Observable<ErrorOr<DisplayResonator>> {
		return this.http.get<DisplayResonator>(`raw/resonators/${key}.json`).pipe(
			map((resonator) => {
				return ErrorOr.value(resonator);
			}),
			catchError((error) => {
				const message = 'Failed to load resonator details';
				const errorDetails = error.message ? error.message : '';

				return of(
					ErrorOr.error<DisplayResonator>(`${message}: ${errorDetails}`)
				);
			})
		);
	}
}
