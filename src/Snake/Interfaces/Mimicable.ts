import { State } from "../Custom Types/State";

export interface Mimicable{
    GetPreviousState : () => State;
    MimicMove : () => void;

    isMimicing : Mimicable;
    toMimic : Mimicable;

}