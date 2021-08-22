import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { ShortenService } from 'src/app/services/shorten/shorten.service';
import { tsParticles } from 'tsparticles';
import { Mode } from './show-types';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  urlForm: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required])
  });

  mode: Mode = Mode.SHORTEN;
  resultMode: string = '';
  results: string = '';

  isCopied: boolean = false;

  constructor(private clipboardService: ClipboardService,
    private shortenService: ShortenService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let url = this.urlForm.controls['url'].value;
    this.urlForm.reset();
    this.isCopied = false;
    if (this.mode == Mode.SHORTEN) {
      this.shortenService.postShortenUrl(url).subscribe((res) => {
        this.results = res['shorten_url'];
      }, (err) => {
        if (err.error) {
          this.results = err.error['err'];
        }
      });
    } else {
      this.shortenService.getDecodedUrl(url).subscribe((res) => {
        this.results = res['original_url'];
      }, (err) => {
        if (err.error) {
          this.results = err.error['err'];
        }
      });
    }
    this.resultMode = this.mode;
  }

  copyResults(): void {
    this.clipboardService.copyFromContent(this.results);
    this.isCopied = true;
  }

  switchShowType(): void {
    if (this.mode == Mode.SHORTEN) {
      this.mode = Mode.DECODE;
    } else {
      this.mode = Mode.SHORTEN;
    }
  }
}
