import { Acceleration, NO_ACCELERATION } from './acceleration';
import { Boundary } from './boundary';
import { Position } from './position';
import { Velocity, NO_VELOCITY } from './velocity';

export abstract class MovableObject {

  constructor(
    protected _height: number,
    protected _width: number,
    protected _position: Position,
    protected _velocity: Velocity = NO_VELOCITY,
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

  isMovingUp(): boolean {
    return this._velocity.vy < 0;
  }

  isMovingDown(): boolean {
    return this._velocity.vy > 0;
  }

  isMovingLeft(): boolean {
    return this._velocity.vx < 0;
  }

  isMovingRight(): boolean {
    return this._velocity.vx > 0;
  }

  /**
   * This algorithm works by detecting whether there is a gap between the two rectangles' sides.
   * The assumption is that they are axis-aligned (i.e. not rotated).
   * 
   * See https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
   * @param obstacleObject
   */
  hasCollidedWith(obstacleBoundary: Boundary): boolean {
    const objectBoundary: Boundary = this.getBoundary();

    return objectBoundary.left < obstacleBoundary.right
      && objectBoundary.right > obstacleBoundary.left
      && objectBoundary.top < obstacleBoundary.bottom
      && objectBoundary.bottom > obstacleBoundary.top;
  }

}
