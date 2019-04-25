import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Game } from '../model/game';
import { Ball } from '../model/ball';
import { interval, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private _game: Game;
  private _canvasWidth = 500;
  private _canvasHeight = 500;
  private _endGame$: Subject<void>;

  private _ctx!: CanvasRenderingContext2D;
  private _secondsPerFrame = 1000 / 60; // for 60 fps

  constructor() {
    this._game = new Game(this._canvasHeight, this._canvasWidth);
    this._endGame$ = new Subject();
  }

  ngAfterViewInit(): void {
    this._ctx = this.initialiseCanvas(this.canvasRef);
  }

  ngOnInit(): void {
    this.startGame(this._secondsPerFrame);
  }

  ngOnDestroy(): void {
    this.endGame();
  }

  private initialiseCanvas(canvasRef: ElementRef<HTMLCanvasElement>): CanvasRenderingContext2D {
    let ctx = canvasRef.nativeElement.getContext('2d');

    if (ctx !== null) {
      ctx.canvas.width = this._canvasWidth;
      ctx.canvas.height = this._canvasHeight;
      return ctx;
    } else {
      throw new Error('Could not get CanvasRenderingContext2D')
    }
  }

  private startGame(secondsPerFrame: number): void {
    interval(secondsPerFrame).pipe(
      tap(() => this._game.tick()),
      takeUntil(this._endGame$)
    ).subscribe(
      () => this.paint()
    );
  }

  private endGame(): void {
    this._endGame$.next();
  }

  private paint(): void {
    this.paintBackground(this._ctx);
    this.paintBall(this._ctx, this._game.ball);
  }

  private paintBackground(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
  }

  private paintBall(ctx: CanvasRenderingContext2D, ball: Ball): void {
    this._ctx.fillStyle = 'rgb(255,255,255)';
    this._ctx.fillRect(ball.getBoundary().left, ball.getBoundary().top, ball.width, ball.height);
  }

}
