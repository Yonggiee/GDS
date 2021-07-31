import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ClipboardService } from 'ngx-clipboard';
import { ShortenService } from "src/app/services/shorten/shorten.service";
import { Mode } from "./show-types";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  urlForm: FormGroup = new FormGroup({
    url: new FormControl("", [Validators.required])
  });

  mode: Mode = Mode.SHORTEN;
  resultMode: string = "";
  results: string = "";

  constructor(private clipboardService: ClipboardService,
    private shortenService: ShortenService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let url = this.urlForm.controls["url"].value;
    this.urlForm.reset();
    if (this.mode == Mode.SHORTEN) {
      this.shortenService.postShortenUrl(url).subscribe((res) => {
        this.results = res["url_to"];
      });
    } else {
      this.shortenService.getDecodedUrl(url).subscribe((res) => {
        this.results = res["url_from"];
        },  (err) => {
          this.results = "No URL found!";
        }
      );
    }
    this.resultMode = this.mode;
  }

  copyResults(): void {
    this.clipboardService.copyFromContent(this.results);
  }

  switchShowType(): void {
    if (this.mode == Mode.SHORTEN) {
      this.mode = Mode.DECODE;
    } else {
      this.mode = Mode.SHORTEN;
    }
  }
}
