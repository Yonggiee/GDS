import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Mode } from "./show-types";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  urlForm = new FormGroup({
    url: new FormControl('', [Validators.required])
  });

  showType = Mode.SHORTEN;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {}

  switchShowType() {
    if (this.showType == Mode.SHORTEN) {
      this.showType = Mode.LENGTHEN;
    } else {
      this.showType = Mode.SHORTEN;
    }
  }
}
