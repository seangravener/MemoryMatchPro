import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularMemory';
}
