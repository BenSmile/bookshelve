import {Component} from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyC9rH2wXBmb6dZsiFmlJm5lNVIS5a0pKLk',
      authDomain: 'bookshaves-b42b6.firebaseapp.com',
      projectId: 'bookshaves-b42b6',
      storageBucket: 'bookshaves-b42b6.appspot.com',
      storage: 'gs://bookshaves-b42b6.appspot.com',
      messagingSenderId: '647197605417',
      databaseURL: 'https://bookshaves-b42b6-default-rtdb.firebaseio.com/',
      appId: '1:647197605417:web:efac1a15161e7a32792638',
      measurementId: 'G-F9GZF0LRB6'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
  }
}
