import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  Model = {
    wordSearch: ""
  }
  constructor(private wordService: WordService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.Model.wordSearch !== "") {this.wordService.getWord(this.Model.wordSearch)};
    this.Model.wordSearch = "";
  }
}
