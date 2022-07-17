import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data/data.service';
import { IWordRepository } from '../data/models';

@Component({
  selector: 'sentenceGenerator-sentence-builder',
  templateUrl: './sentence-builder.component.html',
  styleUrls: ['./sentence-builder.component.css']
})
export class SentenceBuilderComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService) { }

  pageTitle: string = "Builder";

  wordLibraryPlaceholderValue: string = "Select a word for the selected type.";
  wordTypePlaceHolderValue: string = "Select a word type...";
  enableWordLibraryComponent = false;
  toggleWordTypeDropDown = false;
  constructedSentence: string = "";

  selectedWordType: string = ""
  selectedWordLibrary: string = "";

  postError: boolean = false;
  postErrorMessage: string = "";

  postSuccess: boolean = false;
  postSuccessMessage: string = "";

  currentWordLibrary: string[] = [];
  wordRepositoryFiletered: IWordRepository[] = [];
  wordRepositories: IWordRepository[] = [];
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.dataService.getWordRepository().subscribe({
      next: wordRepositories => this.wordRepositories = wordRepositories,
      error: error => this.onHttpError(error),
      complete: () => { this.toggleWordTypeDropDown = true }
    });

    //reset values
    this.constructedSentence = "";
    this.enableWordLibraryComponent = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onHttpError(errorResponse: any) {
    this.postError = true;
    if (errorResponse instanceof HttpErrorResponse) {
      console.log("HttpError: " + errorResponse.error);
      this.postErrorMessage = "Technical error occurred. Please contact administrator. Error Message: " + errorResponse.error
    }
    else {
      console.log("HttpError: " + errorResponse);
      this.postErrorMessage = errorResponse;
    }
  }

  onSave(sentence: string): void {
    console.log('Sentence to be saved: ' + sentence);

    if (this.constructedSentence.length > 0) {
      this.sub = this.dataService.postConstructedSentence(this.constructedSentence).subscribe({
        error: error => {
          this.onHttpError(error)
        },
        complete: () => {
          //prepare view for next input
          this.postSuccess = true;
          this.postSuccessMessage = "Data has been saved. You may continue and build the next sentence."
          this.constructedSentence = "";
        }
      })
    }
    else {
      //prepare view for next input
      this.postSuccess = true;
      this.postSuccessMessage = "There is no data to be save. Please make sure to build a sentence first before attempting to save."
    }

    this.selectedWordType = this.wordTypePlaceHolderValue;
    this.selectedWordLibrary = "";
    this.enableWordLibraryComponent = false;
    
    
    //prepare view for next input
    this.postSuccess = true;
    this.postSuccessMessage = "Data has been saved. You may continue and build the next sentence."
    this.constructedSentence = "";
  }

  onUndo() {
    const lastIndexOfSpace = this.constructedSentence.lastIndexOf(' ');
    if (lastIndexOfSpace === -1 && this.constructedSentence.length > 0) {
      this.enableWordLibraryComponent = false;
      this.constructedSentence = "";
      return;
    }
    this.constructedSentence = this.constructedSentence.substring(0, lastIndexOfSpace);
  }

  buildSentence(wordToBeAdded: string): void {
    if (wordToBeAdded != this.wordLibraryPlaceholderValue) {
      //check if first word so that we can make it a capital.
      let firstWord = this.constructedSentence.length == 0 ? true : false;

      //when the user adds punctionation, make sure that we don't add a space between the words.
      let wordJoinChar = this.selectedWordType == "Punctuation" ? "" : " ";
      this.constructedSentence = `${this.constructedSentence}${wordJoinChar}${wordToBeAdded}`;

      if(firstWord)
      {
        this.constructedSentence = this.capatalizeFirstLetter(wordToBeAdded);
      }
      
      console.log(this.constructedSentence);
    }
    this.postSuccess = false;
  }

  capatalizeFirstLetter(word: string) : string{
   // converting first letter to uppercase
   const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
   return capitalized.trimStart();
  }

  enableWordLibraryDropDown(word: string): void {
    if (word.length > 0) {
      this.enableWordLibraryComponent = true;
    }
    else {
      this.enableWordLibraryComponent = false;
    }
    this.postSuccess = false;
    this.currentWordLibrary = this.wordRepositories.filter(r => r.wordType == word).flatMap(r => r.wordLibrary);

    console.log(this.currentWordLibrary);
  }
}