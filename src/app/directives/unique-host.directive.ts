import { ApiuserService } from 'src/app/services/apiuser.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appUniqueHost]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueHostDirective, multi: true}]
})
export class UniqueHostDirective implements AsyncValidator {

  constructor(private apiuserService:ApiuserService ) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.apiuserService.searchHost(control.value).pipe(
      map(apiuser => {
        return apiuser ? { 'hostExist' : true} : null;
      })

    )
  }

}