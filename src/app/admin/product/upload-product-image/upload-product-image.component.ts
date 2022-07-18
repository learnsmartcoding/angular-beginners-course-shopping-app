import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { modelStateFormMapper } from 'src/app/service/modelStateFormMapper';
import { ProductService } from 'src/app/service/product.service';
import { validateAllFormFields } from 'src/app/service/validateAllFormFields';

@Component({
  selector: 'app-upload-product-image',
  templateUrl: './upload-product-image.component.html',
  styleUrls: ['./upload-product-image.component.css'],
})
export class UploadProductImageComponent implements OnInit {
  // now we have to implement upload part
  showSpinner = false;
  @Input() productId!: number;
  @ViewChild('myInput') myInputVariable!: ElementRef; //to access template variable from our UI
  @Output()
  public imageUploadCompleted = new EventEmitter<boolean>(); //this is after upload we will intimate parent component
  public form!: FormGroup;
  public errors: string[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  public control(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  public ngOnInit() {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      productImage: new FormControl('', [Validators.required]),
    });
  }
  public Submit(files: File[]): void {
    //we will pass File from UI using file upload type
    this.handleFileInput(files);
  }

  //Lets allow only certain type of files to upload. this method is to check that
  validateFileExtension(file: string | undefined) {
    if (file === 'jpg' || file === 'png' || file === 'jpeg') return true;
    else return false;
  }

  public handleFileInput(data: any): void {
    const files = data.files as File[];
    this.errors = []; //reset error variable
    validateAllFormFields(this.form);
    if (
      this.form.valid &&
      this.validateFileExtension(files[0].name.split('.').pop())
    ) {
      //pass extension of file to see if that is valid
      this.showSpinner = true;
      this.toastr.info('Image being uploaded', 'In Progress');
      const formData = new FormData(); // need to use this for file upload
      Array.from(files).forEach((f) => formData.append('file', f)); //key value form
      this.productService
        .UploadProductImage(formData, this.productId)
        .subscribe({
          complete: () => {
            this.onComplete();
          }, // completeHandler
          error: (errorRes: HttpErrorResponse) => {
            this.onError(errorRes);
          }, // errorHandler
          next: () => {
            this.onSaveComplete();
          }, // nextHandler
        });
    } else {
      this.errors.push('Only file type .png, .jpg, .jpeg are allowed');
    }
  }

  onError(errorRes: HttpErrorResponse) {
    this.form.reset();
    this.myInputVariable.nativeElement.value = '';
    this.errors = modelStateFormMapper(this.form, errorRes, {});
    this.showSpinner = false;
    this.imageUploadCompleted.emit(false); // emit false for failure notification
  }
  onComplete() {
    this.toastr.info('Completed', 'Process Completed');
    this.showSpinner = false;
    this.imageUploadCompleted.emit(true); // emit as success so parent component will know
  }
  onSaveComplete() {
    this.toastr.success('Image uploaded', 'Save Success');
  }
}
