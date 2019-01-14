import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service'
import { Subscription } from 'rxjs'
import { Word } from '../word'

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})

export class WordComponent implements OnInit {

  public wordSearch: Word[]=[];

  constructor(private wordService: WordService) {}

//intialize subscription to listen to changes from service
  ngOnInit() {
    this.getWord();
  }

  getWord():void {
    this.wordService.wordSearch()
      .subscribe(data => this.wordSearch = data);
  }


//call to service to change the saved status of Word instance
  changeStatus(id) {
    this.wordService.changeStatus(id);
  }

//call to service to edit the user definition of Word instance
  editDefinition(e, id) {
    let def = e.target.children[0].value;
    this.wordService.editDefinition(def, id);
  }

}
