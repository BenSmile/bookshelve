import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Book} from '../../models/book.model';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsuploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BooksService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.inifForm();
  }

  inifForm() {
    this.bookForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required]
    });
  }

  onSaveBook() {
    const title = this.bookForm.value.titre;
    const auteur = this.bookForm.value.auteur;
    const book = new Book(title, auteur);
    if (this.fileUrl && this.fileUrl !== '') {
      book.photo = this.fileUrl;
    }
    this.bookService.creeateNewBook(book);
    this.router.navigate(['/books']);
  }

  onFileUpload(file: File) {
    this.fileIsuploading = true;
    this.bookService.uploadFile(file)
      .then((url: string) => {
        this.fileUrl = url;
        this.fileIsuploading = false;
        this.fileUploaded = true;
      });
  }

  detectFile(event): void {
    this.onFileUpload(event.target.files[0]);
  }
}
