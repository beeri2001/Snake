import { Vector2 } from "./Custom Types/Vector2";

export class Cell{
    gridPosition : Vector2;

    realPosition : Vector2;

    private occupation : any = null;

    constructor(gridX : number, gridY : number, realX : number, realY : number){
        this.gridPosition = new Vector2(gridX, gridY);
        this.realPosition = new Vector2(realX, realY);
    }

    /**
     * Returns false if not occupied, returns the object occupying this cell otherwise.
     */
    public GetOccupation() : any{
        if(this.occupation == null){
            return false;
        }
        return this.occupation;
    }

    public SetOccupation(occupation : any){
        this.occupation = occupation;
    }
}