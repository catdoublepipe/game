import { Ball, Boundary } from './ball';

export class Game {

  private _ball: Ball;

  constructor(private _height: number, private _width: number) {
    this._ball = new Ball(15, 15, { x: 15, y: _height / 2 }, { vx: 5, vy: 5 });
  }

  get ball(): Ball {
    return this._ball;
  }

  tick(): void {
    this._ball.move();
    this.checkCollisions(this._ball);
  }

  private checkCollisions(ball: Ball): void {
    this.checkXCollision(ball);
    this.checkYCollision(ball);
  }

  private checkYCollision(ball: Ball): void {
    if (ball.getBoundary().bottom >= this._height || ball.getBoundary().top <= 0) {
      this.ball.bounceY()
    }
  }

  private checkXCollision(ball: Ball): void {
    if (ball.getBoundary().right >= this._width || ball.getBoundary().left <= 0) {
      this.ball.bounceX()
    }
  }

}
