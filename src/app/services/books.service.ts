import {Injectable} from '@angular/core';
import {Book} from '../models/book.model';
import {Subject} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  urlFile: string;


  bookSubject = new Subject<Book[]>();

  constructor() {
  }


  public emitBooks(): void {
    this.bookSubject.next(this.books.slice());
  }

  public saveBooks(): void {
    firebase.database().ref('/books').set(this.books);
  }

  public getBooks(): void {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  public getOnaBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value')
          .then((data) => {
              resolve(data.val());
            }, (error) => {
              reject(error);
            }
          );
      }
    );
  }

  public creeateNewBook(book: Book): void {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  public deleteBook(book: Book): void {

    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo deleted');
        }
      ).catch(
        (error) => {
          console.log('File not found : ', error);
        }
      );
    }
    const bookIndiceToRemove =
      this.books.findIndex((bookEl) => {
        if (bookEl === book) {
          return true;
        }
      });
    this.books.splice(bookIndiceToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  public uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const idFile = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('image/' + idFile + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement ...');
          },
          (error) => {
            console.log('Erreur de chargement : ', error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
            });
            // resolve(this.urlFile);
          }
        );
      }
    );
  }

}
