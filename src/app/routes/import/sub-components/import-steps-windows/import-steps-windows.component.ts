import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Message, MessageService } from 'primeng/api';
import { Highlight } from 'ngx-highlightjs';

import { getInvalidClass } from '@app/core/helpers/primeng-func.helper';

import { ImportService } from '../../import.service';

@Component({
	selector: 'abby-import-steps-windows',
	standalone: true,
	imports: [
		NgOptimizedImage,
		RouterModule,
		FormsModule,
		CommonModule,
		ReactiveFormsModule,

		PanelModule,
		ButtonModule,
		Highlight,
		InplaceModule,
		MessagesModule,
		TagModule,
		DividerModule,
		IconFieldModule,
		InputIconModule,
		InputTextModule,
	],
	templateUrl: './import-steps-windows.component.html',
	styleUrl: './import-steps-windows.component.scss',
})
export class ImportStepsWindowsComponent {
	constructor(
		private service: ImportService,
		private toastService: MessageService
	) {}

	public readonly powershellScript: string =
		'$scriptUrl = "https://wuwaabby.moe/redirect/windows-android-ps1"; $localScriptPath = "$env:TEMP\\history-windows-android.ps1"; Invoke-WebRequest -Uri $scriptUrl -OutFile $localScriptPath -MaximumRedirection 3; powershell -ExecutionPolicy Bypass -File $localScriptPath; Remove-Item -Path $localScriptPath -Force';
	public readonly warningMessage: Message[] = [
		{
			severity: 'warn',
			summary: '',
			detail:
				'This command will download and execute a script from the internet. Wubby strongly recommends you to review any command/scripts before running them.',
		},
	];

	public collapsedPanel: { [id: string]: boolean } = {
		normal: false,
		customAdb: false,
	};

	public get importForm() {
		return this.service.importForm;
	}

	public get powershellAdbScript(): string {
		return `$scriptUrl = "https://wuwaabby.moe/redirect/windows-android-ps1"; $localScriptPath = "$env:TEMP\\history-windows-android.ps1"; Invoke-WebRequest -Uri $scriptUrl -OutFile $localScriptPath -MaximumRedirection 3; powershell -ExecutionPolicy Bypass -File $localScriptPath ${
			this.importForm.get('adbPath')?.value
				? `--adb-path="${this.importForm.get('adbPath')?.value}"`
				: ''
		} Remove-Item -Path $localScriptPath -Force`;
	}

	public getInvalidAdbPathClass() {
		return getInvalidClass(this.importForm.get('adbPath')!);
	}

	public togglePanel(panelId: string) {
		this.collapsedPanel[panelId] = !this.collapsedPanel[panelId];
	}

	public scrollTo(elemId: string, evt?: Event) {
		if (evt) {
			evt.preventDefault();
		}

		const elem = document.getElementById(elemId);
		if (elem) {
			elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	public copyCommand() {
		navigator.clipboard.writeText(this.powershellAdbScript);
		this.toastService.add({
			severity: 'success',
			summary: 'Copied',
			detail: 'The command has been copied to your clipboard.',
		});
	}
}
