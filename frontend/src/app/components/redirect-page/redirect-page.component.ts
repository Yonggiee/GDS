import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortenService } from 'src/app/services/shorten/shorten.service';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {
  constructor(private shortenService: ShortenService,
    private router: Router) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect(): void {
    const url = 'localhost:4200' + this.router.url;
    this.shortenService.getDecodedUrl(url).subscribe((res) => {
      let originalUrl = res['original_url'];
      if (!originalUrl.match('^http(s){0,1}:\/\/')) {
        originalUrl = 'http://' + originalUrl;
      }
      window.location.href = originalUrl;
    }, _ => {
      this.router.navigateByUrl('');
    });
  }
}
