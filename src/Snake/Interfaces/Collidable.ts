import { PlayerHead } from "../PlayerHead";

export interface Collidable{
    OnCollision : (other : PlayerHead) => void;
}