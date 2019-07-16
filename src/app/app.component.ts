import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupform: FormGroup;

  ngOnInit() {
    // new to initialize a new form group to create the form.
    this.signupform = new FormGroup({
      // form control can take up to 3 arguments with the 1st being the default value the field loads with
      // the 2nd being an array of validators and the 3rd consists of any asynchronus validatos you
      // may want to add. Ex with gender we passed in the default value of male when the form loads.
      // Each key value pair in our new FormGroup is called a form-control.
      username: new FormControl(null, [Validators.required]),
      // It's important to remember that the validators that we pass in must be imported from angular forms
      // and that they are passed as reference, so we do not execute them. Instead angular itself will execute
      // our validators when something is typed into the value.
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl("male")
    });
  }

  onSubmit() {
    console.log(this.signupform);
  }
}
