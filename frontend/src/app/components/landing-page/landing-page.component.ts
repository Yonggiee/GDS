import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ClipboardService } from 'ngx-clipboard';
import { ShortenerService } from "src/app/services/shortener/shortener.service";
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
    private shortenerService: ShortenerService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let url = this.urlForm.controls["url"].value;
    if (this.mode == Mode.SHORTEN) {
      this.shortenerService.postShortenUrl(url).subscribe((res) => {
        this.results = res["url_to"];
      });
    } else {
      this.shortenerService.getDecodedUrl(url).subscribe((res) => {
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
