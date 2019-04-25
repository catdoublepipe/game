import { MovableObject } from './movable-object';
import { Position } from './position';
import { Velocity } from './velocity';

export class Ball extends MovableObject {

  constructor(
    protected _height: number,
    protected _width: number,
    protected _position: Position,
    protected _velocity: Velocity,
  ) {
    super(_height, _width, _position, _velocity);
  }

  bounceY(): void {
    this._velocity.vy = -this._velocity.vy;
  }

  bounceX(): void {
    this._velocity.vx = -this._velocity.vx;
  }

}
