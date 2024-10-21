import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateMLCEngine, MLCEngine } from '@mlc-ai/web-llm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // LAB #2
  protected readonly progress = signal(0);
  protected readonly ready = signal(false);
  protected engine?: MLCEngine;

  // LAB #3
  // LAB #5

  async ngOnInit() {
    // LAB #2
    const model = 'Llama-3.2-3B-Instruct-q4f32_1-MLC';
    this.engine = await CreateMLCEngine(model, {
      initProgressCallback: ({ progress }) => this.progress.set(progress)
    });
    this.ready.set(true);
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