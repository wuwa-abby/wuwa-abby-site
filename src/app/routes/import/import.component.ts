import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

import { PreferencesService } from '@app/core/services/preferences.service';

import { ImportStepsAndroidComponent } from './sub-components/import-steps-android/import-steps-android.component';
import { ImportStepsWindowsComponent } from './sub-components/import-steps-windows/import-steps-windows.component';
import { ImportStepsAppleComponent } from './sub-components/import-steps-apple/import-steps-apple.component';
import { ImportService } from './import.service';

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

		ImportStepsAndroidComponent,
		ImportStepsWindowsComponent,
		ImportStepsAppleComponent,
	],
	templateUrl: './import.component.html',
	styleUrl: './import.component.scss',
})
export class ImportComponent {
	constructor(
		public prefService: PreferencesService,
		private service: ImportService
	) {}

	public readonly platformOptions = [
		{ label: 'Windows', icon: 'pi pi-microsoft', value: 'win' },
		{ label: 'Android', icon: 'pi pi-android', value: 'and' },
		{ label: 'iOS', icon: 'pi pi-apple', value: 'apple' },
	];

	public activeStep: number = 0;

	public get importForm(): FormGroup {
		return this.service.importForm;
	}
}
