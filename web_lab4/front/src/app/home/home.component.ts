import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../user-service.service";
import {User} from "../model/user";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  imports: [
    FormsModule,
    NgIf
  ],
  selector: 'app-home',
  providers: [UserService],
  standalone: true,
  styleUrl: 'home.component.css',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
  user: User;
  show_login_form: boolean = true;
  error_msg: string = '';
  constructor(private router: Router,
              private userService: UserService) {
    this.user = new User();
  }

  ngAfterViewInit(): void {
    this.initializeClock();
  }

  login() {
    this.error_msg = ''
    if (this.user.username === undefined) {
      alert("нееет юзернейм обязателен")
    }else if (this.user.password === undefined) {
      alert("нееет пароль обязателен")
    }


     this.userService.login(this.user).subscribe(
         (response) => {
           sessionStorage.setItem("currentUser", JSON.stringify(this.user));
           this.router.navigate(['/graph'])
         },
         (error) => {
           console.log(error.status)
           console.log('Ошибка входа:', error.error.message);
           this.error_msg = error.error.message;
         }
         )

  }
  changeLogForm(){
      this.error_msg = ''
      this.show_login_form = !this.show_login_form
  }
  register(){
    if (this.user.username === undefined) {
      alert("нееет юзернейм обязателен")
      return;
    }else if (this.user.password === undefined) {
      alert("нееет пароль обязателен")
      return;
    }else if (this.user.repeated_password === undefined) {
      alert("нееет повторный пароль обязателен")
      return;
    }
    if (this.user.password != this.user.repeated_password){
      this.error_msg = 'а ниче тот факт что пароли НЕ совпадают'
      return;
    }

    this.userService.register(this.user).subscribe(
        (response) => {
          console.log("дада он зарегался" + response.userId)
          this.user.id = response.userId;

          sessionStorage.setItem("currentUser", JSON.stringify(this.user));
          this.router.navigate(['/graph'])
        },
        (error) => {
          console.log(error.status)
          console.log('Ошибка входа:', error.error.message);
          this.error_msg = error.error.message;
        }
    );
  }
  initializeClock(): void {
    const canvas = document.getElementById("clockCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.font = "16px Impact";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const drawClock = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "#b5c7e0";
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.closePath();


      for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180 - Math.PI / 3;
        const x = centerX + (radius - 20) * Math.cos(angle);
        const y = centerY + (radius - 20) * Math.sin(angle);
        ctx.fillText((i + 1).toString(), x, y);
      }

      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      drawHand(centerX, centerY, (hour % 12) * 30 + (minute / 2), radius - 50, 6, "#000");  // Часовая стрелка
      drawHand(centerX, centerY, minute * 6, radius - 30, 4, "#000");  // Минутная стрелка
      drawHand(centerX, centerY, second * 6, radius - 10, 2, "#b5c7e0");  // Секундная стрелка
    };

    const drawHand = (x: number, y: number, angle: number, length: number, width: number, color: string) => {
      const radian = (angle) * Math.PI / 180 - Math.PI / 2;
      const endX = x + length * Math.cos(radian);
      const endY = y + length * Math.sin(radian);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.closePath();
    };

    setInterval(drawClock, 1000);
    drawClock();
  }
}
