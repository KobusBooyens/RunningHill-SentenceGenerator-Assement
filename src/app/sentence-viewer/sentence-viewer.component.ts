import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data/data.service';
import { IConstructedSentences } from '../data/models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'sentenceGenerator-sentence-viewer',
  templateUrl: './sentence-viewer.component.html',
  styleUrls: ['./sentence-viewer.component.css']
})

export class SentenceViewerComponent implements OnInit, OnDestroy {

  constructor(private dataService:DataService) { }

  pageTitle: string = "Viewer";
  lowValue: number = 0;
  highValue: number = 20;

  errorMessage: string = "";
  sub!: Subscription;
  constructedSentence: IConstructedSentences[] = [];

  ngOnInit():void {
    this.sub = this.dataService.getConstructedSentences().subscribe({
      next: sentence => this.constructedSentence = sentence,
      error: error => this.errorMessage = error
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}