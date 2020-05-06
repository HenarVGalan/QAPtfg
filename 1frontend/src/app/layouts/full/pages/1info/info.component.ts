import { Component, OnInit } from '@angular/core';


export interface TablaLeyenda {
  concepto: string;
  definicion: string;
}
export interface TablaOrgInfo {
  contaminante: string;
  fase: string;
  limites: string;
  ventana: string;
  vecesPermitido: string;
  warning: string;
}

const Leyenda_DATA: TablaLeyenda[] = [

  { concepto: 'Fase', definicion: 'Definicion de la fase ' },
  { concepto: 'Límites', definicion: 'sdfdfd' },
  { concepto: 'Cada cuánto tiempo', definicion: 'dfsdaf' },
  { concepto: 'Veces permitido', definicion: 'dfasdf' },
  { concepto: 'Warning', definicion: 'adfasd' },

];


const EEA_DATA: TablaOrgInfo[] = [

  { contaminante: "PM10", fase: "Fase I", limites: "> 50 µg / m3", ventana: "Batch. Diario", vecesPermitido: "35 días/año", warning: "A los 20 días y un aviso conforme se incrementen las alertas." },
  { contaminante: "PM10", fase: "Fase I", limites: "> 40 µg / m3", ventana: "Batch. Anual", vecesPermitido: "-", warning: "  " },
  { contaminante: "PM2.5", fase: "Fase I", limites: "> 25 µg / m3", ventana: "Batch. Diario", vecesPermitido: "-", warning: "  " },
  { contaminante: "PM2.5", fase: "Fase I", limites: "> 25 µg / m3", ventana: "Batch. Anual", vecesPermitido: "-", warning: "  " },
  { contaminante: "NO2", fase: "Fase I", limites: "> 200 µg / m3", ventana: "Batch. Horaria", vecesPermitido: "18 horas/año", warning: "  " },
  { contaminante: "NO2", fase: "-", limites: "> 400 µg / m3", ventana: "Batch. Horaria", vecesPermitido: "3 horas consecutivas", warning: "  " },
  { contaminante: "NO2", fase: "Fase I", limites: "> 40 µg / m3", ventana: "Batch. Anual", vecesPermitido: "-", warning: "  " },
  { contaminante: "O3", fase: "Fase I", limites: "> 120 µg / m3", ventana: "Sliding. 8 horas", vecesPermitido: " De media en 3 años no haya saltado 25 días/año (Si salta un día varias veces solo se cuenta como 1)", warning: "Si a los 2 años da una media superior a 15 días/año" },
  { contaminante: "O3", fase: "Fase I", limites: "> 180 µg / m3 - Alerta  ---  > 240 µ / m3 - Alerta Alta", ventana: "Batch. Horaria", vecesPermitido: "-", warning: "-" },
  { contaminante: "CO", fase: "Fase I", limites: "> 10000 µg / m3  >10mg/m3", ventana: "Sliding. 8 horas", vecesPermitido: "-", warning: "-" },

]
const WHO_DATA: TablaOrgInfo[] = [

  { contaminante: "PM10", fase: "Fase I", limites: "> 50 µg / m3", ventana: "Batch. Diario", vecesPermitido: "35 días/año", warning: "A los 20 días y un aviso conforme se incrementen las alertas." },
  { contaminante: "PM10", fase: "Fase II", limites: "> 20 µg / m3", ventana: "Batch. Anual", vecesPermitido: "-", warning: "-" },
  { contaminante: "PM2.5", fase: "Fase I", limites: "> 25 µg / m3", ventana: "Batch. Diario", vecesPermitido: "-", warning: "10 días/año (imposición propia)" },
  { contaminante: "PM2.5", fase: "Fase II", limites: "> 10 µg / m3", ventana: "Batch. Anual", vecesPermitido: "-", warning: "-" },
  { contaminante: "NO2", fase: "Fase I", limites: "> 200 µg / m3", ventana: "Batch. Horaria", vecesPermitido: "18 horas/año", warning: "  " },
  { contaminante: "NO2", fase: "Fase I", limites: "> 40 µg / m3", ventana: "Batch. Anual", vecesPermitido: "-", warning: "  " },
  { contaminante: "O3", fase: "Fase II", limites: "> 100 µg / m3 -- ¡Una única alerta si en el día se ha encontrado una/varias!", ventana: "Sliding. 8 horas", vecesPermitido: "-", warning: "-" },
  { contaminante: "CO", fase: "Fase I", limites: "> 60000 µg / m3  --    > 60 mg / m3", ventana: "Batch. Horaria", vecesPermitido: "-", warning: "-" },

]



@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  displayedColumns_leyenda: string[] = ['concepto', 'definicion'];
  leyenda = Leyenda_DATA;


  displayedColumns_ORG: string[] = ['contaminante', 'fase', 'limites', 'ventana', 'vecesPermitido', 'warning'];
  EEAdata = EEA_DATA;
  WHOdata = WHO_DATA;
  
  

  constructor() { }

  ngOnInit(): void {
  }

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}

