import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription, take, tap, timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  houres: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  initialTimer: number = 0
  startedTimer: boolean = false
  int: Subscription = new Subscription()
  doubleClickSub: Subscription = new Subscription()

  @ViewChild('doubleClick') dbClick: ElementRef

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

  dblClick() {
    let lastClicked = 0;
    this.doubleClickSub = fromEvent(this.dbClick.nativeElement, 'click').pipe(take(2), tap(v => {
      const timeNow = new Date().getTime();
      if (timeNow < (lastClicked + 300)) this.waitTimer();
      lastClicked = timeNow;
    })).subscribe();
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

  ngOnDestroy(): void {
    this.doubleClickSub.unsubscribe()
  }
}
