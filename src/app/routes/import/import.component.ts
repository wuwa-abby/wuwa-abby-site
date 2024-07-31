import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { PreferencesService } from '@app/core/services/preferences.service';

import { ImportStepsAndroidComponent } from './sub-components/import-steps-android/import-steps-android.component';
import { ImportStepsWindowsComponent } from './sub-components/import-steps-windows/import-steps-windows.component';
import { ImportStepsAppleComponent } from './sub-components/import-steps-apple/import-steps-apple.component';
import { ImportHistoryComponent } from './sub-components/import-history/import-history.component';
import { ImportService } from './import.service';

@Component({
	selector: 'abby-import',
	standalone: true,
	imports: [
		CommonModule,
		NgOptimizedImage,
		ReactiveFormsModule,
		FormsModule,

		FieldsetModule,
		SelectButtonModule,
		StepperModule,
		ButtonModule,
		PanelModule,
		ToggleButtonModule,

		ImportStepsAndroidComponent,
		ImportStepsWindowsComponent,
		ImportStepsAppleComponent,
		ImportHistoryComponent,
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

	// note: the first step starts at index 0 and not 1.
	public activeStep: number = 2;
	public saveProfile: boolean = true;
	public shareHistory: boolean = true;

	public get importForm(): FormGroup {
		return this.service.importForm;
	}
}
