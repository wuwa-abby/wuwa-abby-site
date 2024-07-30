import {
	Component,
	Inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitterModule } from 'primeng/splitter';
import { Message } from 'primeng/api';

import { ResourceHistoryDTO } from '@app/core/types/kuro-history.type';

import { ImportService } from '../../import.service';

import { data } from './summary-text-templates.json';

@Component({
	selector: 'abby-import-history',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PanelModule,
		InputTextareaModule,
		MessagesModule,
		ButtonModule,
		ProgressBarModule,
		SplitterModule,
	],
	templateUrl: './import-history.component.html',
	styleUrl: './import-history.component.scss',
})
export class ImportHistoryComponent implements OnInit, OnDestroy {
	constructor(
		private service: ImportService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	public showLoading: boolean = false;
	public message: Message[] = [];
	public progress: { cur: number; total: number } = { cur: 0, total: 0 };
	public historySummary?: {
		5: { total: number };
		4: { total: number };
		3: { total: number };
		total: number;
		template: string;
	};

	private changeTimeout?: any;
	private historyProgressSub?: any;
	private historyDataSub?: any;

	public get importForm() {
		return this.service.importForm;
	}

	public get progressPercent() {
		return Math.floor((this.progress.cur / this.progress.total) * 100);
	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.historyProgressSub = this.service.onHistoryProgress.subscribe(
				(progressState) => {
					// if total is 0, ignore
					if (!progressState || !progressState.total) return;

					this.progress = progressState;
				}
			);
			this.historyDataSub = this.service.onHistoryReceived.subscribe(
				(history) => {
					// ignore if history is empty
					if (!history || !history.length) return;

					this.calculateSummary(history);
				}
			);
		}
	}

	ngOnDestroy(): void {
		if (this.historyProgressSub) this.historyProgressSub.unsubscribe();
		if (this.historyDataSub) this.historyDataSub.unsubscribe();
	}

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
			}
		}, 250);
	}

	public onFormSubmit() {
		this.showLoading = true;
		this.service.importHistory();
	}

	private calculateSummary(history: ResourceHistoryDTO[]) {
		this.historySummary = {
			5: { total: 0 },
			4: { total: 0 },
			3: { total: 0 },
			total: history.length,
			template: '',
		};
		history.forEach((record) => {
			if (record.qualityLevel === 5) {
				this.historySummary![5].total++;
			} else if (record.qualityLevel === 4) {
				this.historySummary![4].total++;
			} else if (record.qualityLevel === 3) {
				this.historySummary![3].total++;
			}
		});

		// score = (history.length * 5-total * (4-total / 2)) / 100
		const score =
			(history.length *
				this.historySummary![5].total *
				(this.historySummary![4].total / 2)) /
			100;

		const scoreTemplates = data.find(
			(t) => t.range.min <= score && t.range.max >= score
		);
		const randomTemplateForScore =
			scoreTemplates!.templates[
				Math.floor(Math.random() * scoreTemplates!.templates.length)
			];

		this.historySummary.template = randomTemplateForScore
			.replace(
				'{{total}}',
				`<span class="text-orange-400">${this.historySummary.total}</span>`
			)
			.replace(
				'{{5-count}}',
				`<span class="text-yellow-500">${this.historySummary[5].total}</span>`
			)
			.replace(
				'{{4-count}}',
				`<span class="text-indigo-300">${this.historySummary[4].total}</span>`
			);

		setTimeout(() => {
			const elem = document.getElementById('summary-title');
			if (elem) {
				elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}, 500);
	}
}
