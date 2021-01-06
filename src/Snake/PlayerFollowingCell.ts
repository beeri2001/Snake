import * as PIXI from "pixi.js";
import { ImageImporter } from "~ImageImporter";
import { Directions } from "./Custom Types/Directions";
import { Main } from "./Main";
import { Queue } from "./Custom Types/Queue";
import { Turn } from "./Custom Types/Turn";
import { Vector2 } from "./Custom Types/Vector2";
import { Arena } from "./Arena";
import { PlayerHead } from "./PlayerHead";
import { Collidable } from "./Interfaces/Collidable";
import { Cell } from "./Cell";
import { GameStates, StateManager } from "./StateManager";
import { State } from "./Custom Types/State";
import { Mimicable } from "./Interfaces/Mimicable";
import { Disposable } from "./Interfaces/Disposable";

export class PlayerFollowingCell implements Collidable, Mimicable, Disposable{

    isTail : boolean;
    turns : Queue<Turn> = new Queue<Turn>();

    toMimic :  Mimicable;
    isMimicing :  Mimicable = this;

    onScreenCell : PIXI.Sprite;
    currentDirection : Directions;

    previousOccupation : Cell;
    previousState : State;

    active : boolean = true;

    constructor(isTail : boolean, toMimic : Mimicable){
        this.onScreenCell = new PIXI.Sprite(PIXI.Texture.from(ImageImporter.playerCellImage));
        
        this.isTail = isTail;
        this.toMimic = toMimic;
        
        this.onScreenCell.position.x = toMimic.GetPreviousState().position.x;
        this.onScreenCell.position.y = toMimic.GetPreviousState().position.y;
        
        this.currentDirection = toMimic.GetPreviousState().direction;

        this.previousState = new State(new Vector2(this.onScreenCell.position.x, this.onScreenCell.position.y), this.currentDirection);

        this.onScreenCell.anchor.set(0.5, 0.5);

        this.previousOccupation = Arena.Get().GetCellFromPosition(new Vector2(this.onScreenCell.position.x, this.onScreenCell.position.y));

        Main.Get().GetApp().stage.addChild(this.onScreenCell);
        
        Main.Get().SubscribeToUpdate(this.Update, this);
    }

    public Update(delta : number, context : PlayerFollowingCell){
        if(StateManager.Get().GetState() != GameStates.PLAYING) { return; }
        if(!context.active){ return; }

        context.UpdateOccupation(context);
    }
    
    private UpdateOccupation(context : PlayerFollowingCell){
        
        let currentCell = Arena.Get().GetCellFromPosition(new Vector2(context.onScreenCell.x, context.onScreenCell.y));
        
        if(currentCell.GetOccupation() == false){
            currentCell.SetOccupation(context);
        }

        if(this.isTail == true){
            if(context.previousOccupation != currentCell.GetOccupation()){
                // console.log("un-occupied");
                context.previousOccupation.SetOccupation(null);
            }
        }
        context.previousOccupation = currentCell;
    }

    public MimicMove(){
        this.previousState = new State(new Vector2(this.onScreenCell.position.x, this.onScreenCell.position.y), this.currentDirection);    
        
        let newState = this.toMimic.GetPreviousState();

        this.onScreenCell.position.x = newState.position.x;
        this.onScreenCell.position.y = newState.position.y;

        this.currentDirection = newState.direction;
        
        if(this.isMimicing != this){
            this.isMimicing.MimicMove();
        }
    }

    public SetIsMimicing(mimic : Mimicable){
        this.isMimicing = mimic;
    }

    public GetPreviousState() : State{
        return this.previousState;
    }

    public OnCollision(head : PlayerHead){
        head.OnDeath();
    }

    public Dispose(){
        Main.Get().GetApp().stage.removeChild(this.onScreenCell);
    }
}