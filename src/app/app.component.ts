import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatCompletionMessageParam, CreateMLCEngine, MLCEngine } from '@mlc-ai/web-llm';
import { Todo } from './todo';

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
  protected readonly reply = signal('');

  // LAB #5
  protected readonly todos = signal<Todo[]>([]);

  async ngOnInit() {
    // LAB #2
    const model = 'Llama-3.2-3B-Instruct-q4f32_1-MLC';
    this.engine = await CreateMLCEngine(model, {
      initProgressCallback: ({ progress }) =>
          this.progress.set(progress)
    });
    this.ready.set(true);
  }

  async runPrompt(userPrompt: string) {
    // LAB #3, #7, #8 and #9
    await this.engine!.resetChat();
    this.reply.set('…');
    // const systemPrompt = `Here's the user's todo list: \`\`\`json${JSON.stringify(this.todos())}\`\`\``;
    const systemPrompt = `
      You are a bad comedian.
      The user will ask questions about their todo list.
      Here's the user's todo list:
      ${this.todos().map(todo => `* ${todo.text} (${todo.done ? 'done' : 'not done'})`).join('\n')}`;
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ];
    const reply = await this.engine!.chat.completions.create({ messages });
    this.reply.set(reply.choices[0].message.content ?? '');
    console.log(reply.usage);
  }

  addTodo(text: string) {
    // LAB #5
    this.todos.update(todos => [...todos, { done: false, text }]);
  }

  toggleTodo(index: number) {
    // LAB #6
    this.todos.update(todos => todos.map((todo, todoIndex) =>
        todoIndex === index ? { ...todo, done: !todo.done } : todo));
  }
}
