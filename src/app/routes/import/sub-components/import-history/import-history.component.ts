import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

import { ImportService } from '../../import.service';

@Component({
	selector: 'abby-import-history',
	standalone: true,
	imports: [
		PanelModule,
		InputTextareaModule,
		MessagesModule,
		ReactiveFormsModule,
	],
	templateUrl: './import-history.component.html',
	styleUrl: './import-history.component.scss',
})
export class ImportHistoryComponent {
	constructor(private service: ImportService) {}

	public get importForm() {
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
