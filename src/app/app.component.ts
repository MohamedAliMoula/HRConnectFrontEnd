import { Component } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RHConnect';
  ngOnInit() {
    const cld = new Cloudinary({cloud: {cloudName: 'she-codes-africa'}});

    (function(d, m){
      var kommunicateSettings = {"appId":"23c56417a5cccf970fca21a4c6705d51d","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
  })(document, (window as any).kommunicate || {});
  }
}
