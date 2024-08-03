import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { Message, MessageService } from 'primeng/api';
import { Highlight } from 'ngx-highlightjs';

@Component({
	selector: 'abby-import-steps-windows',
	standalone: true,
	imports: [
		NgOptimizedImage,

		PanelModule,
		ButtonModule,
		Highlight,
		InplaceModule,
		MessagesModule,
		TagModule,
	],
	templateUrl: './import-steps-windows.component.html',
	styleUrl: './import-steps-windows.component.scss',
})
export class ImportStepsWindowsComponent {
	constructor(private toastService: MessageService) {}

	public customAdbPath?: string;

	public get powershellScript(): string {
		return `$scriptUrl = "https://wuwaabby.moe/redirect/windows-android-ps1"; $localScriptPath = "$env:TEMP\\history-windows-android.ps1"; $adbPath = "${
			this.customAdbPath ??
			'C:\\Program Files (x86)\\Tiny ADB and Fastboot\\adb.exe'
		}"; Invoke-WebRequest -Uri $scriptUrl -OutFile $localScriptPath -MaximumRedirection 5; powershell -ExecutionPolicy Bypass -File $localScriptPath --adb-path=$adbPath; Remove-Item -Path $localScriptPath -Force`;
	}

	public readonly warningMessage: Message[] = [
		{
			severity: 'warn',
			summary: '',
			detail:
				'This command will download and execute a script from the internet. Wubby strongly recommends you to review any command/scripts before running them.',
		},
	];

	public copyCommand() {
		navigator.clipboard.writeText(this.powershellScript);
		this.toastService.add({
			severity: 'success',
			summary: 'Copied',
			detail: 'The command has been copied to your clipboard.',
		});
	}
}
