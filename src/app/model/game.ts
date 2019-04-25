import { Boundary } from './boundary';
import { Ball } from './ball';
import { Bat } from './bat';
import { NO_VELOCITY } from './velocity';

export class Game {

  private _ball: Ball;
  private _leftBat: Bat;
  private _rightBat: Bat;

  constructor(private _height: number, private _width: number) {
    this._ball = new Ball(15, 15, { x: 15, y: _height / 2 }, { vx: 5, vy: 5 });
    this._leftBat = new Bat(100, 20, { x: 50, y: _height / 2 }, NO_VELOCITY);
    this._rightBat = new Bat(100, 20, { x: _width - 50, y: _height / 2 }, NO_VELOCITY);
  }

  get ball(): Ball {
    return this._ball;
  }

  get leftBat(): Bat {
    return this._leftBat;
  }

  get rightBat(): Bat {
    return this._rightBat;
  }

  tick(): void {
    this._ball.move();
    this.handleCollisions();
  }

  private handleCollisions(): void {
    const ballBoundary: Boundary = this._ball.getBoundary();
    const leftBatBoundary: Boundary = this._leftBat.getBoundary();
    const rightBatBoundary: Boundary = this._rightBat.getBoundary();

    this.handleBallAndGameCollisions(ballBoundary)
    this.handleBallAndBatCollisions(ballBoundary, leftBatBoundary, rightBatBoundary);
  }

  private handleBallAndGameCollisions(ballBoundary: Boundary): void {
    if (ballBoundary.bottom >= this._height || ballBoundary.top <= 0) {
      this.ball.bounceY();
    }

    if (ballBoundary.right >= this._width || ballBoundary.left <= 0) {
      this.ball.bounceX();
    }
  }

  private handleBallAndBatCollisions(ballBoundary: Boundary, leftBatBoundary: Boundary, rightBatBoundary: Boundary): void {
    if (
      ballBoundary.left <= leftBatBoundary.right
      && ballBoundary.bottom >= leftBatBoundary.top
      && ballBoundary.top <= leftBatBoundary.bottom
    ) {
      this.ball.bounceX();
    }

    if (
      ballBoundary.right >= rightBatBoundary.left
      && ballBoundary.bottom >= rightBatBoundary.top
      && ballBoundary.top <= rightBatBoundary.bottom
    ) {
      this.ball.bounceX();
    }
  }

}
