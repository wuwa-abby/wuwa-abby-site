import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

import { PreferencesService } from '@app/core/services/preferences.service';

@Component({
	selector: 'abby-import',
	standalone: true,
	imports: [
		CommonModule,
		FieldsetModule,
		NgOptimizedImage,
		ReactiveFormsModule,
		SelectButtonModule,
		StepperModule,
		ButtonModule,
	],
	templateUrl: './import.component.html',
	styleUrl: './import.component.scss',
})
export class ImportComponent {
	constructor(public prefService: PreferencesService) {}

	public readonly platformOptions = [
		{ label: 'Android', value: 'and' },
		{ label: 'Windows', value: 'win' },
	];

	public importForm = new FormGroup({
		platform: new FormControl('and'),
	});
	public activeStep: number = 0;
}
