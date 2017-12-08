import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'httpClient',
  templateUrl: './httpClass.html',
  styleUrls: ['./httpClass.css']
})

export class HttpClassComponent {
  searchForm: FormGroup;
  private loading = false;

  constructor(public itunes: AppService) {
    this.searchForm = new FormGroup({
      inputSearch: new FormControl()
    });
  }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then(() => {
      this.loading = false;
    });
  }

  doGET() {
    return this.itunes.getItems();
  }

  doPOST() {
    return this.itunes.postItems();
  }

  doPUT() {
    return this.itunes.putItems();
  }

  doDELETE() {
    return this.itunes.deleteItems();
  }

  doGETAsPromise() {
    return this.itunes.getAsPromise();
  }

  doGETAsPromiseError() {
    return this.itunes.promiseError();
  }

  doGETAsObservableError() {
    return this.itunes.obsError();
  }

  doGETWithHeaders() {
    return this.itunes.withHeaders();
  }

}
