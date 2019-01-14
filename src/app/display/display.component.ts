import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';
import { Word } from '../word';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public userWords: Word[]=[];
  public allWords: Word[]=[];

  constructor(private wordService: WordService) { }

//lifecycle hook that on component initializing calls function
  ngOnInit() {
    this.getWords();
  }

//function called from ngOnInit that sets up subscriptions, allowing component to listen service
  getWords() {
    this.wordService.displayUserWords()
      .subscribe(data => this.userWords = data);
    this.wordService.displayAllWords()
      .subscribe(data => this.allWords = data);
  }

//functions to change data on observable stream that renders in the word component
  showArray(value) {
    return this.wordService.changeDisplay(value);
  }

  showWord(wordObj) {
    return this.wordService.displayWord(wordObj)
  }

}
