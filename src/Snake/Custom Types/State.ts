import { Direction } from "tty";
import { Directions } from "~Snake/Custom Types/Directions";
import { Vector2 } from "./Vector2";

export class State{
    position : Vector2;
    direction : Directions;

    constructor(position : Vector2, direction : Directions){
        this.position = position;
        this.direction = direction;
    }
}
