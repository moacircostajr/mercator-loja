import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {isCpf} from 'validator-brazil';



export class ValidadorCpf {
    static isValid(control: AbstractControl): ValidationErrors | null {
        if (isCpf(control.value)) {
            return null;
        } else {
            return {isValid: false};
        }
    }
}
