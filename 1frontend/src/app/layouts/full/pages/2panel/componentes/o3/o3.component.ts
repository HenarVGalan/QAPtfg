import { Component, OnInit } from '@angular/core';
import { O3Service } from '../../servicios/o3.service';

@Component({
  selector: 'app-o3',
  templateUrl: './o3.component.html',
  styleUrls: ['./o3.component.css'],
  providers: [O3Service]
})
export class O3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
