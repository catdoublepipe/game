import { Velocity } from './ball';

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface SpeedRatio {
  x: number;
  y: number;
}

export interface Boundary {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export class Ball {

  static readonly DEFAULT_SPEED_RATIO: SpeedRatio = { x: 1, y: 1 };

  constructor(
    private _height: number,
    private _width: number,
    private _position: Position,
    private _velocity: Velocity,
    private _speedRatio: SpeedRatio = Ball.DEFAULT_SPEED_RATIO
  ) { }

  get height(): number {
    return this._height;
  }

  get width(): number {
    return this._width;
  }

  get position(): Position {
    return this._position;
  }

  bounceY(): void {
    this._speedRatio.y = -this._speedRatio.y;
  }

  bounceX(): void {
    this._speedRatio.x = -this._speedRatio.x;
  }

  move(): void {
    this._position = {
      x: this._position.x + (this._velocity.vx * this._speedRatio.x),
      y: this._position.y + (this._velocity.vy * this._speedRatio.y)
    };
  }

  getBoundary(): Boundary {
    return {
      top: this.position.y - (this._height / 2),
      bottom: this.position.y + (this._height / 2),
      right: this.position.x + (this._width / 2),
      left: this.position.x - (this._width / 2)
    };
  }

}
