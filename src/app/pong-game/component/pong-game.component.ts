import { BatAction } from '../model/bat';
import { KeyboardKeyCode } from '../model/keyboard-key-code';
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Game } from '../model/game';
import { Ball } from '../model/ball';
import { interval, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Bat } from '../model/bat';

@Component({
  selector: 'app-pong-game',
  templateUrl: './pong-game.component.html',
  styleUrls: ['./pong-game.component.scss']
})
export class PongGameComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private _game: Game;
  private _canvasWidth = 800;
  private _canvasHeight = 600;
  private _endGame$: Subject<void>;

  private _ctx!: CanvasRenderingContext2D;
  private _secondsPerFrame = 1000 / 80; // for 60 fps

  private _playerCommand: BatAction = BatAction.STAY;

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

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    if (event.keyCode == KeyboardKeyCode.UP) {
      this._playerCommand = BatAction.MOVE_UP;
    }

    if (event.keyCode == KeyboardKeyCode.DOWN) {
      this._playerCommand = BatAction.MOVE_DOWN;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    this._playerCommand = BatAction.STAY;
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
    interval(this._secondsPerFrame).pipe(
      tap(() => this._game.tick(this._playerCommand)),
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
    this.paintBat(this._ctx, this._game.leftBat);
    this.paintBat(this._ctx, this._game.rightBat);
  }

  private paintBackground(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, this._canvasWidth, this._canvasHeight);
  }

  private paintBall(ctx: CanvasRenderingContext2D, ball: Ball): void {
    this._ctx.fillStyle = 'rgb(255,255,255)';
    this._ctx.fillRect(ball.getBoundary().left, ball.getBoundary().top, ball.width, ball.height);
  }

  private paintBat(ctx: CanvasRenderingContext2D, bat: Bat): void {
    this._ctx.fillStyle = 'rgb(255,255,255)';
    this._ctx.fillRect(bat.getBoundary().left, bat.getBoundary().top, bat.width, bat.height);
  }

}
