import { MovableObject } from './movable-object';
import { Velocity, NO_VELOCITY } from './velocity';
import { Position } from './position';

export enum BatAction {
  MOVE_UP,
  MOVE_DOWN,
  STAY
}

export class Bat extends MovableObject {

  private readonly ABSOLUTE_ACCELERATION = 10;

  constructor(
    protected _height: number,
    protected _width: number,
    protected _position: Position,
    protected _velocity: Velocity = NO_VELOCITY
  ) {
    super(_height, _width, _position, _velocity);
  }

  setState(batAction: BatAction): void {
    switch (batAction) {
      case BatAction.MOVE_UP: {
        this._velocity.vy = -this.ABSOLUTE_ACCELERATION;
        break;
      }
      case BatAction.MOVE_DOWN: {
        this._velocity.vy = this.ABSOLUTE_ACCELERATION;
        break;
      }
      case BatAction.STAY: {
        this._velocity.vy = 0;
        break;
      }
      default: {

      }
    }
  }

}
