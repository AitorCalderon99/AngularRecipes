import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  @Output() navbarEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  navbarClicked(clicked: string) {
    this.navbarEmitter.emit(clicked);
  }
}
