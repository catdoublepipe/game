import { MovableObject } from './movable-object';
import { Velocity } from './velocity';
import { Position } from './position';

export class Bat extends MovableObject {

  constructor(
    protected _height: number,
    protected _width: number,
    protected _position: Position,
    protected _velocity: Velocity
  ) {
    super(_height, _width, _position, _velocity);
  }

}
