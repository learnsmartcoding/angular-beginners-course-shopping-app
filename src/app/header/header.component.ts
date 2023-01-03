import { Component, OnInit,Inject } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest, PopupRequest, InteractionType, AuthenticationResult } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
//import { b2cPolicies } from 'src/app/auth-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    // @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    // private authService: MsalService,
    // private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    // this.msalBroadcastService.inProgress$
    // .pipe(
    //   filter((status: InteractionStatus) => status === InteractionStatus.None),
    //   takeUntil(this._destroying$)
    // )
    // .subscribe(() => {
    //   this.setLoginDisplay();
    // });
  }

  // setLoginDisplay() {
  //   this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  // }

  // login(userFlowRequest?: RedirectRequest | PopupRequest) {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     } else {
  //       this.authService.loginPopup(userFlowRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     }
  //   } else {
  //     if (this.msalGuardConfig.authRequest){
  //       this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
  //     } else {
  //       this.authService.loginRedirect(userFlowRequest);
  //     }
  //   }
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // editProfile() {
  //   let editProfileFlowRequest = {
  //     scopes: ["openid"],
  //     authority: b2cPolicies.authorities.editProfile.authority,
  //   };

  //   this.login(editProfileFlowRequest);
  // }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
