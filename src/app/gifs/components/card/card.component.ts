import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input()
  public gifs!: Gif;

  ngOnInit(): void {
    if (!this.gifs) {
      throw new Error('Gif property is required');
    }
  }
}
