import * as PIXI from "pixi.js";
import {ImageImporter} from "../ImageImporter";
import { Cell } from "./Cell";
import { Main } from "./Main";
import { Vector2 } from "./Custom Types/Vector2";

export class Arena{

    public static Instance : Arena;

    public DeadCell : Cell = new Cell(-1, -1, 0, 0);

    private arena : PIXI.TilingSprite = new PIXI.TilingSprite(PIXI.Texture.from(ImageImporter.arenaBackgroundImage));

    public map : Cell[][] = [];

    private sizeX : number = 0;
    private sizeY : number = 0;

    static Get() : Arena{
        if(Arena.Instance == null){
            Arena.Instance = new Arena();
        }

        return Arena.Instance;
    }

    constructor(){
        
        this.sizeX = 0;
        this.sizeY = 0;

        this.DrawBackground();
    }

    public Initialize(){
        this.InitializeMap();
    }

    private DrawBackground(){
        // Anchor width to be in the center, and height from the bottom.
        this.arena.anchor.set(0.5, 1);

        // Make the playable arena 95% of the avaiable width space and round it to match the 25px sqaures.
        let countableWidthToSet = Main.Get().GetApp().view.width / 100 * 95;
        let widthToSet = 0;
        while(countableWidthToSet > 25){
            countableWidthToSet -= 25;
            widthToSet += 25;
            this.sizeX += 1;
        }
        
        this.arena.width = widthToSet;
        
        // Make the playable arena 85% of the avaiable height space and round it to match the 25px sqaures.
        let countableHeightToSet = Main.Get().GetApp().view.height / 100 * 85;
        let heightToSet = 0;
        while(countableHeightToSet > 25){
            countableHeightToSet -= 25;
            heightToSet += 25;
            this.sizeY += 1;
        }
        this.arena.height = heightToSet;

        // center the position of the arena.
        this.arena.position.x = Main.Get().GetApp().view.width / 2;
        // Make the amount of pixels at the bottom of the arena the same as the amount on the sides.
        this.arena.position.y = Main.Get().GetApp().view.height - Main.Get().GetApp().view.width / 100 * 2.5;

        Main.Get().GetApp().stage.addChild(this.arena);
    }

    private InitializeMap(){
        let offset = this.GetMapOffset();

        this.map = [];

        for(let _x = 0; _x < this.sizeX; _x += 1){
            this.map[_x] = [];
            for(let _y = 0; _y < this.sizeY; _y += 1){
                let newCell = new Cell(_x, _y, offset.x + (_x * 25) + 12.5, offset.y + (_y * 25) + 12.5);

                this.map[_x][_y] = newCell;
            }
        }
    }

    public GetMapOffset() : Vector2{
        let x = this.arena.position.x - (this.arena.width * this.arena.anchor.x);
        let y = this.arena.position.y - (this.arena.height * this.arena.anchor.y);

        return new Vector2(x, y);
    }

    public GetArena() : PIXI.Sprite{
        return this.arena;
    }

    public GetCellInfo(cellPosition : Vector2){
        
        if(cellPosition.x >= this.sizeX || cellPosition.y >= this.sizeY || cellPosition.x < 0 || cellPosition.y < 0){
            console.error("A cell outside of the map bounds was requested.");
            return this.DeadCell;
        }
        else{
            return this.map[cellPosition.x][cellPosition.y]
        }
    }

    public GetCellFromPosition(position : Vector2){
        let offset = this.GetMapOffset();
        
        position.x -= offset.x;
        position.y -= offset.y;
        
        let xPos = -1;
        while(position.x > 25){
            position.x -= 25;
            xPos += 1;
        }
        if(position.x >= 12.50){
            xPos += 1;
        }

        let yPos = -1;
        while(position.y > 25){
            position.y -= 25;
            yPos += 1;
        }
        if(position.y >= 12.50){
            yPos += 1;
        }

        return this.GetCellInfo(new Vector2(xPos, yPos));
    }

    public GetSize () : Vector2{
        return new Vector2(this.sizeX, this.sizeY);
    }
}



