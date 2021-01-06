import * as PIXI from "pixi.js";
import { Main } from "./Main";
import {ImageImporter} from "../ImageImporter";
import { Arena } from "./Arena";
import { Cell } from "./Cell";
import { Vector2 } from "./Custom Types/Vector2";
import { StateManager } from "./StateManager";
import { GameStates } from "./StateManager";
import { Directions } from "./Custom Types/Directions";
import { PlayerFollowingCell } from "./PlayerFollowingCell";
import { State } from "./Custom Types/State";
import { Mimicable } from "./Interfaces/Mimicable";
import { Disposable } from "./Interfaces/Disposable";

const Keyboard = require('pixi.js-keyboard');

export class PlayerHead implements Mimicable, Disposable{

    onScreenHead : PIXI.Sprite;

    moveCooldownTarget : number = 0.1;
    moveCooldown : number = 0;

    tailCell : PlayerFollowingCell | null = null;
    followingCells : PlayerFollowingCell[] = [];

    isMimicing : Mimicable = this;
    toMimic : Mimicable = this;

    currentDirection : any = Directions.Up;
    
    previousOccupation : Cell;
    previousState : State;

    constructor(){
        let texture = PIXI.Texture.from(ImageImporter.playerHeadImage);

        this.onScreenHead = new PIXI.Sprite(texture);

        let arenaSizeX = Arena.Get().GetSize().x;
        let arenaSizeY = Arena.Get().GetSize().y;

        let cell = Arena.Get().GetCellInfo(new Vector2(Math.round(arenaSizeX / 2), Math.round(arenaSizeY / 2)));

        this.previousOccupation = cell;

        this.onScreenHead.x = cell.realPosition.x;
        this.onScreenHead.y = cell.realPosition.y;

        this.onScreenHead.anchor.set(0.5, 0.5);
        
        this.previousState = new State(new Vector2(this.onScreenHead.position.x, this.onScreenHead.position.y), this.currentDirection);

        Main.Get().GetApp().stage.addChild(this.onScreenHead);

        Main.Get().SubscribeToUpdate(this.Update, this);
    }


    Update(delta : number, context : PlayerHead){
        if(StateManager.Get().GetState() != GameStates.PLAYING) { return; }

        context.CheckInputForDirection(context);
        context.Move(context, delta);
        context.UpdateOccupation(context);

        context.moveCooldown += delta;
    }

    private CheckInputForDirection(context : PlayerHead){
        if(Keyboard.isKeyPressed("ArrowLeft", "KeyA")){
            let id = Main.Get().SubscribeToUpdate(() => {context.QueueTurn(context, context.TurnLeft, id)}, context);
        }

        if(Keyboard.isKeyPressed("ArrowRight", "KeyD")){
            let id = Main.Get().SubscribeToUpdate(() => {context.QueueTurn(context, context.TurnRight, id)}, context);
        }
    }

    private QueueTurn(context : PlayerHead, callBack : (context : PlayerHead) => void, callID : number){
        let currentCell = Arena.Get().GetCellFromPosition(new Vector2(context.onScreenHead.x, context.onScreenHead.y));

        let xDis = context.onScreenHead.x - currentCell.realPosition.x;
        let yDis = context.onScreenHead.y - currentCell.realPosition.y;

        if(Math.abs(xDis) < 5 && Math.abs(yDis) < 5){
            context.onScreenHead.x = currentCell.realPosition.x;
            context.onScreenHead.y = currentCell.realPosition.y;

            callBack(context);
            Main.Get().UnSubscribeUpdate(callID);
        }
    }

    private TurnRight(context : PlayerHead){
        context.currentDirection -= 1;
            
        context.onScreenHead.angle += 90;
        if(context.currentDirection < 0){
            context.currentDirection = Directions.Left;
        }
    }
    private TurnLeft(context : PlayerHead){
        context.currentDirection += 1;
        context.onScreenHead.angle -= 90;
        if(context.currentDirection > 3){
            context.currentDirection = Directions.Up;
        }
    }

    private Move(context : PlayerHead, delta : number){
        if(this.moveCooldown >= this.moveCooldownTarget){

            this.moveCooldown = 0;
            this.previousState = new State(new Vector2(this.onScreenHead.position.x, this.onScreenHead.position.y), this.currentDirection);
            
            switch(context.currentDirection){
            case Directions.Up:
                context.onScreenHead.position.y -= 25;
            break;
            case Directions.Down:
                context.onScreenHead.position.y += 25;
            break;
            case Directions.Left:
                context.onScreenHead.position.x += 25;
            break;
            case Directions.Right:
                context.onScreenHead.position.x -= 25;
                break;
            }

            context.MimicMove();
        }
    }

    private UpdateOccupation(context : PlayerHead){
        let currentCell  = Arena.Get().GetCellFromPosition(new Vector2(context.onScreenHead.x, context.onScreenHead.y));

        // Check if the cell returned indicated being at the end of the playable arena.
        if(currentCell == Arena.Get().DeadCell){
            context.OnDeath();
        }

        // Check if the cell is occupied, interact with it.
        let occupation : any = currentCell.GetOccupation();
        if(occupation != false && occupation != context){
            occupation.OnCollision(context);
        }

        context.previousOccupation = currentCell;
    }

    OnDeath(){
        StateManager.Get().SetState(GameStates.REPLAY);
    }

    public CreateNewCell(){
        
        let newCell
        if(this.tailCell != null){
            newCell = new PlayerFollowingCell(true, this.tailCell);
            this.tailCell = newCell;
        }
        else{
            newCell = new PlayerFollowingCell(true, this);
            this.tailCell = newCell;
        }

        this.followingCells.forEach(cell => {
            cell.isTail = false;
        });

        if(this.followingCells.length > 0){
            this.followingCells[this.followingCells.length - 1].SetIsMimicing(newCell);
        }
        else{
            this.isMimicing = newCell;
        }

        this.followingCells.push(newCell);
    }

    public MimicMove(){
        if(this.isMimicing != this){
            this.isMimicing.MimicMove();
        }
    }

    public GetPreviousState() : State{
        return this.previousState;
    }

    /**
     * If there is a tail cell, returns the tailCell.
     * If there is no tail cell, returns the head.
     */
    public GetTailCell() : State{
        if(this.tailCell == null){
            return new State(new Vector2(this.onScreenHead.position.x, this.onScreenHead.position.y), this.currentDirection);
        }

        return new State(new Vector2(this.tailCell.onScreenCell.position.x, this.tailCell.onScreenCell.position.y), this.tailCell.currentDirection);
    }

    public Dispose(){
        Main.Get().GetApp().stage.removeChild(this.onScreenHead);

        this.followingCells.forEach(cell => {
            Main.Get().GetApp().stage.removeChild(cell.onScreenCell);
            cell.active = false;
        });

        this.tailCell = null;
        this.followingCells = [];
    }
}