import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ImportService } from '../../import.service';

@Component({
	selector: 'abby-import-steps-android',
	standalone: true,
	imports: [
		FieldsetModule,
		NgOptimizedImage,
		PanelModule,
		InputTextareaModule,
		ReactiveFormsModule,
	],
	templateUrl: './import-steps-android.component.html',
	styleUrl: './import-steps-android.component.scss',
})
export class ImportStepsAndroidComponent {
	constructor(private service: ImportService) {}

	public get form() {
		return this.service.importForm;
	}
}
