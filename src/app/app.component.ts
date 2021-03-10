import {
  Component,
  ElementRef,
  Renderer2,
  VERSION,
  ViewChild
} from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("suppotiveLins") suppotiveLins: ElementRef;
  @ViewChild("verticalLine") verticalLine: ElementRef;
  @ViewChild("horizondalLine") horizondalLine: ElementRef;
  @ViewChild("input") input: ElementRef;
  @ViewChild("button") button: ElementRef;
  @ViewChild("layout") layout: ElementRef;
  @ViewChild("clear") clear: ElementRef;
  controlToCreate = "";

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  getPoint(event: any) {
    if (!this.controlToCreate) {
      return;
    }
    var x = event.clientX;
    var y = event.clientY;
    this.createElement(x, y);
    var coor = "X coords: " + x + ", Y coords: " + y;
    console.log(coor);
  }
  setControl(control: string) {
    if (control === this.controlToCreate) {
      this.controlToCreate = null;
      this.removeActive(control);
      return;
    }
    this.setControlActive(control);
    this.controlToCreate = control;
    console.log(this.controlToCreate);
  }
  createElement(x, y) {
    let tempName;
    var el = this.renderer.createElement(this.controlToCreate);
    this.renderer.setStyle(el, "position", "absolute");
    this.renderer.setStyle(el, "top", `${y}px`);
    this.renderer.setStyle(el, "left", `${x}px`);
    if (this.controlToCreate === "button") {
      tempName = prompt("Enter the text to display");
      el.innerText = tempName || "sample";
    } else if (this.controlToCreate === "input") {
      tempName = prompt("Enter the placeholder");
      this.renderer.setAttribute(el, "placeholder", tempName || "text");
    }
    this.canvas.nativeElement.appendChild(el);
  }

  mosemoved(event: any) {
    var x = event.clientX;
    var y = event.clientY;
    var vrEl = this.verticalLine.nativeElement;
    this.renderer.setStyle(vrEl, "position", "absolute");
    this.renderer.setStyle(vrEl, "left", `${x + 3}px`);
    this.suppotiveLins.nativeElement.appendChild(vrEl);

    var hrEl = this.horizondalLine.nativeElement;
    this.renderer.setStyle(hrEl, "position", "absolute");
    this.renderer.setStyle(hrEl, "top", `${y}px`);
    this.suppotiveLins.nativeElement.appendChild(hrEl);

    var coor = "X coords: " + x + ", Y coords: " + y;
    console.log(coor);
  }
  /** set active style */
  setControlActive(control: string) {
    if (this.controlToCreate) {
      this.removeActive(this.controlToCreate);
    }
    var control = this[control].nativeElement;
    this.renderer.setStyle(control, "background-color", "gray");
  }
  /** remove active style */
  removeActive(control: string) {
    var control = this[control].nativeElement;
    this.renderer.setStyle(control, "background-color", "revert");
  }
  /** clear */
  clearControl() {
    this.canvas.nativeElement.innerHTML = "";
  }
}
