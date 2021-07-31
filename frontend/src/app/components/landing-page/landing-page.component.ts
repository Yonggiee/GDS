import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  urlForm = new FormGroup({
    url: new FormControl('', [Validators.required])
  });

  showType = "Shorten";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {}

  switchShowType() {
    if (this.showType == "Shorten") {
      this.showType = "Lengthen";
    } else {
      this.showType = "Shorten";
    }
  }
}
