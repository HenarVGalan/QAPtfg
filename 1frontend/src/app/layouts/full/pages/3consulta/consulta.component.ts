import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

// *****
export interface DialogData {
  prueba: string;
  name: string;
}
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-resultados',
  templateUrl: 'dialog-resultados.html',
})
export class DialogResultados {

  constructor(
    public dialogRef: MatDialogRef<DialogResultados>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
	selector: 'app-consulta',
	templateUrl: './consulta.component.html',
	styleUrls: ['./consulta.component.scss'],
	providers: [{
	    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
	}]
})

export class ConsultaComponent implements OnInit {
	isLinear = false;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	isLinearvarient = false;
  	varientfirstFormGroup: FormGroup;
 	varientsecondFormGroup: FormGroup;

 	isLinearposition = false;
  	positionfirstFormGroup: FormGroup;
 	positionsecondFormGroup: FormGroup;


 	optionalfirstFormGroup: FormGroup;
	optionalsecondFormGroup: FormGroup;
	isOptional = false;

	editablefirstFormGroup: FormGroup;
	editablesecondFormGroup: FormGroup;
	isEditable = false;

	customizefirstFormGroup: FormGroup;
	customizesecondFormGroup: FormGroup;

	errorfirstFormGroup: FormGroup;
	errorsecondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  prueba: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogResultados, {
      width: '580px', 
      data: {prueba: this.prueba, name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required]
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required]
		});

		// varient
		this.varientfirstFormGroup = this._formBuilder.group({
		      varientfirstCtrl: ['', Validators.required]
		});
		this.varientsecondFormGroup = this._formBuilder.group({
		      varientsecondCtrl: ['', Validators.required]
		});

		// position
		this.positionfirstFormGroup = this._formBuilder.group({
		      positionfirstCtrl: ['', Validators.required]
		});
		this.positionsecondFormGroup = this._formBuilder.group({
		      positionsecondCtrl: ['', Validators.required]
		});

		// optional
		this.optionalfirstFormGroup = this._formBuilder.group({
		      optionalfirstCtrl: ['', Validators.required]
		});
		this.optionalsecondFormGroup = this._formBuilder.group({
		      optionalsecondCtrl: ['', Validators.required]
		});

		// editable
		this.editablefirstFormGroup = this._formBuilder.group({
		      editablefirstCtrl: ['', Validators.required]
		});
		this.editablesecondFormGroup = this._formBuilder.group({
		      editablesecondCtrl: ['', Validators.required]
		});

		// customize
		this.customizefirstFormGroup = this._formBuilder.group({
		      customizefirstCtrl: ['', Validators.required]
		});
		this.customizesecondFormGroup = this._formBuilder.group({
		      customizesecondCtrl: ['', Validators.required]
		});

		// error
		this.errorfirstFormGroup = this._formBuilder.group({
		      errorfirstCtrl: ['', Validators.required]
		});
		this.errorsecondFormGroup = this._formBuilder.group({
		      errorsecondCtrl: ['', Validators.required]
		});
	}
}
