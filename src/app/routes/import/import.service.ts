import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ImportService {
	constructor() {}

	public importForm = new FormGroup({
		platform: new FormControl<string>('and'),
		historyUrl: new FormControl<string | undefined>(undefined),
	});
}
