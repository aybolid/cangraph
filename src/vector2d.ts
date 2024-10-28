/** 2D vector */
class Vec2D {
  /** x-coordinate */
  x: number;
  /** y-coordinate */
  y: number;

  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /** Returns a new vector with the provided `x` and `y` coordinates */
  static new(x: number, y: number): Vec2D {
    return new Vec2D(x, y);
  }
  /** Returns a new vector with `x` and `y` coordinates set to 0 */
  static zero(): Vec2D {
    return new Vec2D(0, 0);
  }
  /** Returns a new vector with provided `x` coordinate while `y` is set to 0 */
  static fromX(x: number): Vec2D {
    return new Vec2D(x, 0);
  }
  /** Returns a new vector with provided `y` coordinate while `x` is set to 0 */
  static fromY(y: number): Vec2D {
    return new Vec2D(0, y);
  }
  /** Returns a new vector with `x` and `y` set to the provided `value` */
  static from(value: number): Vec2D {
    return new Vec2D(value, value);
  }

  /** Adds the provided `other` vector to this vector */
  public add(other: Vec2D): void {
    this.x += other.x;
    this.y += other.y;
  }
  /** Creates a new vector by adding the provided `other` vector to this vector */
  public toAdded(other: Vec2D): Vec2D {
    return Vec2D.new(this.x + other.x, this.y + other.y);
  }

  /** Return vector magnitude (same as length) */
  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /** Returns vector length (same as magnitude) */
  public length = this.magnitude;

  /** Normalizes this vector */
  public normalize(): void {
    const magnitude = this.magnitude();
    if (magnitude > 0) {
      this.x /= magnitude;
      this.y /= magnitude;
    }
  }
  /** Returns a new normalized vector */
  public toNormalized(): Vec2D {
    const magnitude = this.magnitude();
    if (magnitude > 0) {
      return Vec2D.new(this.x / magnitude, this.y / magnitude);
    }
    return Vec2D.zero();
  }
}

export { Vec2D };
