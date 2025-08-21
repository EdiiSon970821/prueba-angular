import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: any[] = [
    {
      name: 'Dasboard',
      path: '/'
    },
    {
      name: 'Proyectos',
      path: '/proyectos'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
