import { Acceleration, NO_ACCELERATION } from './acceleration';
import { Boundary } from './boundary';
import { Position } from './position';
import { Velocity } from './velocity';

export abstract class MovableObject {

  constructor(
    protected _height: number,
    protected _width: number,
    protected _position: Position,
    protected _velocity: Velocity,
    protected _acceleration: Acceleration = NO_ACCELERATION
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

  get velocity(): Velocity {
    return this._velocity;
  }

  get acceleration(): Acceleration {
    return this._acceleration;
  }

  move(): void {
    this._position = {
      x: this._position.x + this._velocity.vx,
      y: this._position.y + this._velocity.vy
    };

    this._velocity = {
      vx: this._velocity.vx + this._acceleration.ax,
      vy: this._velocity.vy + this._acceleration.ay
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
