import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor () {}

  ngOnInit(): void {

    console.log('URL:' + window.location.href);
    console.log('Path:' + window.location.pathname);
    console.log('Host:' + window.location.host);
    console.log('Hostname:' + window.location.hostname);
    console.log('Origin:' + window.location.origin);
    console.log('Port:' + window.location.port);
    console.log('Search String:' + window.location.search);
  }

}
