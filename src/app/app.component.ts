import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs/observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupform: FormGroup;
  forbiddenUserNames = ["Chris", "Anna"];

  ngOnInit() {
    // new to initialize a new form group to create the form.
    this.signupform = new FormGroup({
      userData: new FormGroup({
        /* form control can take up to 3 arguments with the 1st being the default value the field loads with
        the 2nd being an array of validators and the 3rd consists of any asynchronus validatos you
         may want to add. Ex with gender we passed in the default value of male when the form loads.
        Each key value pair in our new FormGroup is called a form-control.
        - import that we bind this to our custom validators b/c angular is the one that calles the method
        upon validity. So we must pass a references to "this" so angualr knows how to properly execute the
        validator.
        */
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        // It's important to remember that the validators that we pass in must be imported from angular forms
        // and that they are passed as reference, so we do not execute them. Instead angular itself will execute
        // our validators when something is typed into the value.
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.forbiddenEmails.bind(this)]
        )
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    });

    // We can also subscribe to any changes to our Form with the valueChanges method b/c it return an observable.
    /*
      this.signupform.valueChanges.subscribe(value => {
        console.log(value);
      });
    */

    // We can also subscribe to any state changes in our from the same way but with the status method.
    /*
    this.signupform.statusChanges.subscribe(status => {
      console.log(status);
    });
    */

    // setValue and Patch value methods work just as before.
    /*
    this.signupform.setValue({
      userData: {
        username: "storres8",
        email: "steve@test.com"
      },
      gender: "male",
      hobbies: []
    });
    */

    // Remember that patch allows you to patch one value or all but with setValue you must provide a value for
    // all fields.
    /*
    this.signupform.patchValue({
      userData: {
        username: "testing123"
      }
    });
    */
  }

  onAddHobby() {
    // creating a new form control once the user submits a new hobby.
    const control = new FormControl(null, [Validators.required]);
    // pushing the new form control with the value into the hobbies form array.
    // In this case we have to explicitly tell TS that we have a form array or else when we call the push method
    // TS will throw an error b/c it does not recognize that we are working with an array.
    (<FormArray>this.signupform.get("hobbies")).push(control);
  }

  getControls() {
    // we are accessing the form array and then getting all the individual from controls aka hobbies
    // that are stored in that array.
    return (<FormArray>this.signupform.get("hobbies")).controls;
  }

  /* the forbidedenNames function is our custum validator. Our validator takes in as an argument a control
  with the value of form control. We also specify the return value of the function which will be a JS object
  with the key being a string and the value being a boolean as shown bellow.

  To access the value of the control that we are passing in we can use the .value method on our control and
  angular will initiate it for us.

  ***IMPORTANT*** if validation is successful then we MUST return either null or simply omit a retrun value
  that demonstrates success. We only return something if validation is unsuccessful.
  */
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    } else {
      return null;
    }
  }

  /* -This is an ansynchrous validator that we make which returns either a promise or an observable.
    - We use asychronus validators mostly when we want to grab something from the backend or an external API
    since these things are not instant and take time to bring back the data to the front end.

    - We are going to simulate reaching out to the backend and getting some data with the setTimeout() method.
    - rember that a promise take two arguments resolve and reject.
    - if the control.value from the email field matches test@test.com we want to register a forbidden error,
      if not not then we won't raise any validation error and resolve null.
    - remember that Validators must always return something so at the end of this function we return the promise
      that we created.
    - Finally we add this asynchronous validator as a thrid argument into our email Form Conrtol above.
  */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          res({ emailIsForbidden: true });
        } else {
          res(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signupform);
  }
}
