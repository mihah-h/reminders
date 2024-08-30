import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RemindersService } from './core/services/reminders.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [RemindersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
