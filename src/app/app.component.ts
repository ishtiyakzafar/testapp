import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private deeplinks: Deeplinks,
    private router: Router,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupDeeplinks();
    });
  }

  setupDeeplinks() {
    this.deeplinks.route({ '/:slug': 'posts' }).subscribe(
      match => {
        console.log('Successfully matched route', match);

        // Create our internal Router path by hand
        // const internalPath = `/${match.$route}/${match.$args['slug']}`;

        // Run the navigation in the Angular zone
        this.zone.run(() => {
          this.router.navigateByUrl('/login');
        });
      },
      nomatch => {
        // nomatch.$link - the full link data
        console.error("Got a deeplink that didn't match", nomatch);
      }
    );
  }
}
