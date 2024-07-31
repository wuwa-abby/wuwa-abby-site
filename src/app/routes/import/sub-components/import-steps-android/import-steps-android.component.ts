import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { DeferModule } from 'primeng/defer';
import { Highlight } from 'ngx-highlightjs';

@Component({
	selector: 'abby-import-steps-android',
	standalone: true,
	imports: [
		NgOptimizedImage,

		PanelModule,
		ButtonModule,
		Highlight,
		InplaceModule,
		MessagesModule,
		DeferModule,
	],
	templateUrl: './import-steps-android.component.html',
	styleUrl: './import-steps-android.component.scss',
})
export class ImportStepsAndroidComponent {
	constructor(private toastService: MessageService) {}

	public readonly bashScript = `SCRIPT_URL="https://wuwaabby.moe/redirect/linux-android-sh"; LOCAL_SCRIPT_PATH="/tmp/history-linux-android.sh"; curl -L -o $LOCAL_SCRIPT_PATH $SCRIPT_URL; chmod +x $LOCAL_SCRIPT_PATH; bash $LOCAL_SCRIPT_PATH"; rm -f $LOCAL_SCRIPT_PATH`;
	public readonly warningMessage: Message[] = [
		{
			severity: 'warn',
			summary: '',
			detail:
				'This command will download and execute a script from the internet. Wubby strongly recommends you to review any command/scripts before running them.',
		},
	];

	public copyCommand() {
		navigator.clipboard.writeText(this.bashScript);
		this.toastService.add({
			severity: 'success',
			summary: 'Copied',
			detail: 'The command has been copied to your clipboard.',
		});
	}
}
