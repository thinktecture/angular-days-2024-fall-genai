import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // LAB #2
  // LAB #3
  // LAB #5

  async ngOnInit() {
    // LAB #2
  }

  async runPrompt(userPrompt: string) {
    // LAB #3, #7, #8 and #9
  }

  addTodo(text: string) {
    // LAB #5
  }

  toggleTodo(index: number) {
    // LAB #6
  }
}
