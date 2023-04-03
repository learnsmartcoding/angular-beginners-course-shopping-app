import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';


// import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
// import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

//import { msalConfig, loginRequest, protectedResources } from './auth-config';

/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication(msalConfig);
// }

/**
 * MSAL Angular will automatically retrieve tokens for resources 
 * added to protectedResourceMap. For more info, visit: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();

//   protectedResourceMap.set(protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap
//   };
// }

// /**
//  * Set your default interaction type for MSALGuard here. If you have any
//  * additional scopes you want the user to consent upon login, add them here as well.
//  */
// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return { 
//     interactionType: InteractionType.Redirect,
//     authRequest: loginRequest
//   };
// }


@NgModule({
  declarations: [
    AppComponent,
    routedComponents   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    UserModule
    
    //MsalModule
  ],
  providers: [ 
],
  bootstrap: [AppComponent
    //,MsalRedirectComponent
  ]
})
export class AppModule { }
