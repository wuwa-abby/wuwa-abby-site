import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

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
		PanelModule,
		InputTextareaModule,
		MessagesModule,

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

	public message: Message[] = [];

	private changeTimeout?: any;

	public getInvalidClass = this.service.getInvalidUrlCSSClass.bind(
		this.service
	);

	public onChange() {
		if (this.changeTimeout) clearTimeout(this.changeTimeout);

		this.changeTimeout = setTimeout(() => {
			const control = this.importForm.get('historyUrl');

			this.message = [];
			if (control?.errors?.['required']) {
				this.message.push({
					severity: 'error',
					summary: 'Eh?',
					detail: "Wubby can't help you if you don't give me a URL!",
					closable: false,
				});
			} else if (control?.errors?.['pattern']) {
				this.message.push({
					severity: 'error',
					summary: 'Huh?',
					detail: "Wubby can't understand that URL. Try again?",
					closable: false,
				});
			} else if (control?.valid) {
				this.message.push({
					severity: 'success',
					summary: 'Nice!',
					detail:
						"Let's see what we can do with that URL! Click on the 'Next' button to continue.",
					closable: true,
				});
			}
		}, 250);
	}
}
