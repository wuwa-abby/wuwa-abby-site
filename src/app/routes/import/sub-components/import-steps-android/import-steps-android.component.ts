import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

import { ImportService } from '../../import.service';

@Component({
	selector: 'abby-import-steps-android',
	standalone: true,
	imports: [
		NgOptimizedImage,
		PanelModule,
		InputTextareaModule,
		ReactiveFormsModule,
		MessagesModule,
	],
	templateUrl: './import-steps-android.component.html',
	styleUrl: './import-steps-android.component.scss',
})
export class ImportStepsAndroidComponent {
	constructor(private service: ImportService) {}

	public message: Message[] = [];

	private changeTimeout?: any;

	public get form() {
		return this.service.importForm;
	}

	public getInvalidClass = this.service.getInvalidUrlCSSClass.bind(
		this.service
	);

	public onChange() {
		if (this.changeTimeout) clearTimeout(this.changeTimeout);

		this.changeTimeout = setTimeout(() => {
			const control = this.form.get('historyUrl');

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
