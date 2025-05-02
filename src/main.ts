import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';  


const updatedAppConfig = {
  ...appConfig,  
  providers: [
    ...appConfig.providers || [],
    provideRouter(routes),
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
