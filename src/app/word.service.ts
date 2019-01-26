import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Word } from './word'

@Injectable({
  providedIn: 'root'
})

export class WordService {

  wordArr: Word[]=[];
  userWordsArr: Word[]=[];
  allWordsArr: Word[]=[];

//take returned object from GET and create a Word class instance
  changeWordObj =(word)=> {
    this.wordArr.length = 0;
    let wordObj = new Word();
    wordObj.id = Date.now();
    wordObj.saved = false;
    wordObj.userDefinition = "";
    wordObj.word = word.word;
    wordObj.partOfSpeech = word.results[0].partOfSpeech;
    wordObj.pronunciation = word.pronunciation.all;
    wordObj.definition = [];
    word.results.map(word => {
      if(word.definition !== undefined && wordObj.definition.length < 4) {
            wordObj.definition.push(word.definition);
          }
        })
    wordObj.synonyms = [];
    word.results.map(word => {
      if(word.synonyms !== undefined) {
        word.synonyms.map(syn => {
          if (wordObj.synonyms.length < 4) {
            wordObj.synonyms.push(syn);
          }
        })
      }
    });
    wordObj.examples = [];
    word.results.map(word => {
      if(word.examples !== undefined ) {
        word.examples.map(exm => {
          if (wordObj.examples.length < 4) {
            wordObj.examples.push(exm);
          }
        })
      }
    });
    wordObj.antonyms = [];
    word.results.map(word => {
      if(word.antonyms !== undefined ) {
        word.antonyms.map(exm => {
          if (wordObj.antonyms.length < 4) {
            wordObj.antonyms.push(exm);
          }
        })
      }
    });
    wordObj.syllables = [];
    if (word.syllables) {
      word.syllables.list.map(syl => wordObj.syllables.push(syl));
    }
    this.allWordsArr.push(wordObj);
    this.wordArr.push(wordObj);
  }

  constructor(private http: HttpClient) { }

//fetch to api based on user inputs, and pass returned object to function
  getWord(word) {
    return  this.http.get(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {headers: { "X-RapidAPI-Key": "Wu0to3Q9JMmsh3Q0Z5eugBOHufVhp1jPrSmjsnlnKtzJSH6OGO"}})
      .subscribe(wordRes => {this.changeWordObj(wordRes), console.log(wordRes)});
  }

//subscribeable functions to inject component
  wordSearch(): Observable<any[]> {
        return of(this.wordArr);
  }

  displayUserWords(): Observable<any[]> {
    return of(this.userWordsArr);
  }

  displayAllWords(): Observable<any[]> {
    return of(this.allWordsArr);
  }

//find and change the saved status, 'soft delete'
  changeStatus(id) {
    let word = this.allWordsArr.find(word => word.id === id);
    word.userDefinition = "";
    word.saved = !word.saved;
    if (word.saved === true) {
      this.userWordsArr.push(word);
    } else if(word.saved === false) {
      let newArr = this.userWordsArr.filter(word => word.id !== id);
      this.userWordsArr.length = 0;
      newArr.map(word => this.userWordsArr.push(word));
    }
  }

//find and update user definition
  editDefinition(def, id) {
    let word = this.allWordsArr.find(word => word.id === id);
    word.userDefinition = def;
  }

  //functions to set model display value and trigger rerender of word component
  changeDisplay(value) {
    if (value === "user") {
      this.wordArr.length = 0;
      this.userWordsArr.map(word => this.wordArr.push(word));
    } else if (value === "all") {
      this.wordArr.length = 0;
      this.allWordsArr.map(word => this.wordArr.push(word));
    }
  }

  displayWord(word) {
    this.wordArr.length = 0;
    this.wordArr.push(word);
  }

}
