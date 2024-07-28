import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
	selector: 'abby-import-steps-android',
	standalone: true,
	imports: [
		FieldsetModule,
		NgOptimizedImage,
		PanelModule,
		InputTextareaModule,
		FormsModule,
	],
	templateUrl: './import-steps-android.component.html',
	styleUrl: './import-steps-android.component.scss',
})
export class ImportStepsAndroidComponent {
	constructor() {}

	public url: string = '';
}
