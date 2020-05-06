import { Component, OnInit } from '@angular/core';


/******* BLOQUES *******/
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  id: string;
}

/** FIN BLOQUES  */

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']

})

export class PanelComponent implements OnInit{

  public onCardClick(evt: MouseEvent, el: HTMLElement) {

    el.scrollIntoView({ block: "start", behavior: "smooth" });

  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: "end", behavior: "smooth" });;
  }

  /* BLOQUES */

  tiles: Tile[] = [
 /*    $light-danger: #f9e7eb;
$light-success: #e8fdf8;
$light-warning: #fff8ec;
$light-primary: #f1effd;
$light-info: #e3f3fd;
$light-inverse: #f6f6f6;
$light-megna: #e0f2f4; */
    { text: 'PM 10', cols: 1, rows: 1, color: '#e8fdf8', id: 'pm10' },
    { text: 'PM 2,5', cols: 1, rows: 1, color: '#fff8ec', id: 'pm2_5' },
    { text: 'NO2', cols: 1, rows: 1, color: '#f1effd', id: 'no2' },
    { text: 'O3', cols: 1, rows: 1, color: '#e3f3fd', id: 'o3' },
    { text: 'CO', cols: 1, rows: 1, color: '#f6f6f6', id: 'co' },
  ];

  /** */

  constructor() { }

  ngOnInit() { }
 

}


