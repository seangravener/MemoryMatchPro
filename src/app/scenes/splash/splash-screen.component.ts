import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-scene',
  template: `
  <div class="prose">
  <h1>splash page</h1>
The Memory Game
Think you have a good memory? Play the memory game and find out.

Look for matching pictures by clicking and flipping the cards
If the images don't match, they'll be flipped over again.
If you find a match, you'll hear a chime and see an effect.
Find all the matching images to win the game!

START
  <a href="/game">Goto game</a>
</div>
  `,
  // styleUrl: './game.component.scss'
})
export class SplashSceneComponent {}
