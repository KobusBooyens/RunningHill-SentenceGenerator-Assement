import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './data/app-config.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SentenceBuilderComponent } from './sentence-builder/sentence-builder.component';
import { SentenceViewerComponent } from './sentence-viewer/sentence-viewer.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SentenceBuilderComponent,
    SentenceViewerComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent },
      { path: "builder", component: SentenceBuilderComponent },
      { path: "viewer", component: SentenceViewerComponent },
      { path: "", redirectTo: "welcome", pathMatch:"full" },
      { path: "**", redirectTo: "welcome", pathMatch:"full" }
    ])
  ],
  providers: [    
    {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppConfigService],
    useFactory: (appConfigService: AppConfigService) => {
      return () => {
        return appConfigService.getAppConfig();
      };
    }
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
