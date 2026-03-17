import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
    imports: [AmplifyAuthenticatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthComponent {}
