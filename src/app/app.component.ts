import { Component } from '@angular/core';

import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private location: Location) {}

	pageRefresh() {
		console.log("call")
	   location.reload();
	}
}
