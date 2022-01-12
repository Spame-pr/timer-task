import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  houres: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  initialTimer: number = 0
  startedTimer: boolean = false

  int: Subscription = new Subscription()

  constructor() { }

  startTimer() {
    this.int = timer(0, 1000).subscribe(count => {
      this.initialTimer = count
      this.seconds++
      if (this.seconds >= 60) {
        this.minutes++;
        this.seconds = 0
      }
      if (this.minutes >= 60) {
        this.houres++
        this.minutes = 0
      }
    })
    this.startedTimer = !this.startedTimer
  }
  stopTimer() {
    this.int.unsubscribe()
    this.houres = 0
    this.minutes = 0
    this.seconds = 0
    this.startedTimer = !this.startedTimer
  }
  waitTimer() {

    this.int.unsubscribe()
    this.startedTimer = !this.startedTimer

  }

  resetTimer() {
    this.int.unsubscribe()
    this.houres = 0
    this.minutes = 0
    this.seconds = 0
    this.startTimer()
    this.startedTimer = !this.startedTimer
  }

  transform(value: number) {
    return (value + '').length === 1 ? '0' + value : value + '';
  }
}
