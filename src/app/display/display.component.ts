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

  ngOnInit() {
    this.getWords();
  }

  getWords() {
    this.wordService.displayUserWords()
      .subscribe(data => this.userWords = data);
    this.wordService.displayAllWords()
      .subscribe(data => this.allWords = data);
  }

  showArray(value) {
    return this.wordService.changeDisplay(value);
  }

  showWord(wordObj) {
    return this.wordService.displayWord(wordObj)
  }

}
