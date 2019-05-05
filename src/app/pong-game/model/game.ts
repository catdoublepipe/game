import { Boundary } from './boundary';
import { Ball } from './ball';
import { Bat, BatAction } from './bat';
import { NO_VELOCITY, Velocity } from './velocity';

export class Game {

  private _ball: Ball;
  private _leftBat: Bat;
  private _rightBat: Bat;

  constructor(private _height: number, private _width: number) {
    this._ball = new Ball(10, 10, { x: _width / 2, y: _height / 2 }, { vx: 5, vy: 5 });
    this._leftBat = new Bat(80, 5, { x: 75, y: _height / 2 });
    this._rightBat = new Bat(80, 5, { x: _width - 75, y: _height / 2 });
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

  tick(batAction: BatAction): void {
    this._ball.move();
    this._leftBat.setState(batAction);
    this._leftBat.move();
    this.handleCollisions();
  }

  private handleCollisions(): void {
    this.handleBallAndGameCollisions()
    this.handleBallAndBatCollisions();
    this.handleBatAndGameCollisions();
  }

  private handleBallAndGameCollisions(): void {
    const ballBoundary: Boundary = this._ball.getBoundary();

    if (this.isBelowGame(ballBoundary.bottom) && this._ball.isMovingDown()) {
      this.ball.bounceY();
    }

    if (this.isAboveGame(ballBoundary.top) && this.ball.isMovingUp()) {
      this.ball.bounceY();
    }

    if (this.isLeftOfGame(ballBoundary.left) && this.ball.isMovingLeft()) {
      this.ball.bounceX();
    }

    if (this.isRightOfGame(ballBoundary.right) && this.ball.isMovingRight()) {
      this.ball.bounceX();
    }
  }

  private handleBallAndBatCollisions(): void {
    const ballBoundary: Boundary = this._ball.getBoundary();

    if (this._leftBat.hasCollidedWith(ballBoundary)) {
      this.ball.bounceX();
    }

    if (this._rightBat.hasCollidedWith(ballBoundary)) {
      this.ball.bounceX();
    }
  }

  private handleBatAndGameCollisions(): void {

  }

  private isAboveGame(topBoundary: number): boolean {
    return topBoundary <= 0;
  }

  private isBelowGame(bottomBoundary: number): boolean {
    return bottomBoundary >= this._height;
  }

  private isLeftOfGame(leftBoundary: number): boolean {
    return leftBoundary <= 0;
  }

  private isRightOfGame(rightBoundary: number): boolean {
    return rightBoundary >= this._width;
  }

}
