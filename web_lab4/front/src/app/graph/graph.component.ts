import {AfterViewInit, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { CanvasDrawer } from './CanvasDrawer';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import Swal from 'sweetalert2';
import { PointsService } from '../points-service.service';
import {Point} from '../model/point';

@Component({
  selector: 'app-graph',
  imports: [FormsModule, NgClass, NgForOf, DecimalPipe, NgIf],
  templateUrl: './graph.component.html',
  standalone: true,
  styleUrl: './graph.component.css'
})
export class GraphComponent implements AfterViewInit{
  private canvasDrawer!: CanvasDrawer;
  radii: number[] = [0, 0.5, 1, 1.5, 2];
  selectedRadius: number | null = 1;

  xCoordinates: number[] = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  selectedX: number | null = 0;

  canvas!: HTMLElement | null;

  points: Point[] = [];
  constructor(private router: Router, private pointsService: PointsService) {

  }

  //ну типа window.onload
  ngAfterViewInit(): void {

    this.canvasDrawer = new CanvasDrawer()

    this.canvas = document.getElementById("canvas");
    this.canvas?.addEventListener("click", (event) => this.processCanvasClick());

    const yInputElement = document.querySelector('input[name="y_coord"]') as HTMLInputElement;
    yInputElement.addEventListener("focus", this.validateY);
    yInputElement.addEventListener("input", this.validateY);

    const userAsJson = sessionStorage.getItem("currentUser");
    console.log(userAsJson)

    this.pointsService.getPoints(userAsJson!).subscribe(
      (response) => {
        this.points = response.reverse();
        this.canvasDrawer.redrawAll(sessionStorage.getItem("r") ? parseFloat(sessionStorage.getItem("r")!) : 1, this.points);

      },
      (error) => {
        alert(error.error.message);
      })

  }

  selectRadius(r: number): void {

    sessionStorage.setItem("r", r.toString());
    this.selectedRadius = sessionStorage.getItem("r") ? parseFloat(sessionStorage.getItem("r")!):1;

    if (this.points.length === 0) this.canvasDrawer.redrawAll(this.selectedRadius);
    else this.scalePoints(this.selectedRadius);

  }
  selectX(x: number): void {
    this.selectedX = x;
  }

  goBack() {
    sessionStorage.clear();
    this.router.navigate(['/']);// redirecting to home page

  }
  clear(){

    this.pointsService.clear(sessionStorage.getItem("currentUser")!).subscribe(
      (response) => {
        this.points.length = 0;
        this.canvasDrawer.redrawAll(sessionStorage.getItem("r")? parseFloat(sessionStorage.getItem("r")!) : 1);
      },
      (error)=>{
        alert(error.error.message)
      }
    );
  }


  validateX():number{
    const x_error = document.querySelector('.x-error') as HTMLInputElement;
    console.log(x_error)
    if (this.selectedX == null) {
      Swal.fire({
        title: 'ошибка валидации',
        text: 'нееет выберите значение х',
        icon: 'warning',
        confirmButtonText: 'ок',
      })
      return NaN;
    }

    return this.selectedX;
  }

  validateY():number{

    const yInputElement = document.querySelector('input[name="y_coord"]') as HTMLInputElement;
    const yValue = parseFloat(yInputElement.value);

    if (isNaN(yValue) || yValue < -3 || yValue > 5) {
      yInputElement.setCustomValidity('введите значение y от -3 до 5');
      yInputElement.reportValidity();
      return NaN;
    }

    yInputElement.setCustomValidity('');
    return parseFloat(yInputElement.value);
  }

  validateR(){
    console.log(this.selectedRadius)
    if (this.selectedRadius == null) {
      Swal.fire({
        title: 'ошибка валидации',
        text: 'нееет выберите радиус',
        icon: 'warning',
        confirmButtonText: 'ок',
      })
      return NaN;
    }

    return this.selectedRadius;
  }

  submit(){
    const x = this.validateX();
    const y = this.validateY();

    this.sendRequest(x, y);
  }

  processCanvasClick(){
    const [graphx, graphy] = this.canvasDrawer.getGraphValues();
    console.log("дада получили значения с графика", graphx, graphy)
    this.sendRequest(graphx!, graphy!);

  }

  addPoint(response: Point){
      this.points.unshift(response)
      this.canvasDrawer.drawPoint(response.x, response.y,response.result)
  }

  sendRequest(x: number, y: number){
    const r = this.validateR();

    if (isNaN(x) || isNaN(y) || isNaN(r)) return;
    console.log("дада счас будем реквестить", x,y,r)
    const userAsJson = sessionStorage.getItem("currentUser");
    this.pointsService.check(userAsJson!, x, y, r).subscribe((response) => {

        this.addPoint(response)

      },
      (error) => {
        console.log(error.status)
        console.log(error)
        console.log('Ошибка входа:', error.error.message);
        alert(error.error.message);
      })
  }
  scalePoints(newR: number){
    this.canvasDrawer.redrawAll(newR);
    for (const point of this.points) {
        this.canvasDrawer.drawPoint(point.x * newR/(point.radius === 0 ? 1 : point.radius), point.y*newR/(point.radius === 0 ? 1 : point.radius), point.result)

    }
  }


}

