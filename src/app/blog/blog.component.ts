import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
