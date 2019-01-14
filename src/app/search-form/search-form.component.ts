import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  //model is two way bound to input field
  Model = {
    wordSearch: ""
  }
  constructor(private wordService: WordService) { }

  ngOnInit() {
  }

//function to take user submited input and pass it to get in service
  onSubmit() {
    if (this.Model.wordSearch !== "") {this.wordService.getWord(this.Model.wordSearch)};
    this.Model.wordSearch = "";
  }
}
