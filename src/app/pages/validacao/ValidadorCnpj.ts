/*
    import { FormGroup } from '@angular/forms';

export function ValidadorMustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
*/
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {isCnpj} from 'validator-brazil';

export class ValidadorCnpj {
    static isValid(control: AbstractControl): ValidationErrors | null {
        if (isCnpj(control.value)) {
            return null;
        } else {
            return {isValid: false};
        }
    }
}
