import * as PIXI from "pixi.js";
import { ImageImporter } from "~ImageImporter";
import { Arena } from "./Arena";
import { CandySpawner } from "./CandySpawner";
import { Cell } from "./Cell";
import { Collidable } from "./Interfaces/Collidable";
import { Main } from "./Main";
import { ScoreManager } from "./ScoreManager";
import { Vector2 } from "./Custom Types/Vector2";
import { PlayerHead } from "./PlayerHead";
import { Disposable } from "./Interfaces/Disposable";

export class Candy implements Collidable, Disposable{
    
    onScreenCandy : PIXI.Sprite;
    mapCell : Cell;

    constructor(gridPositionToSet : Vector2){
        this.mapCell = Arena.Get().GetCellInfo(gridPositionToSet);
        
        this.onScreenCandy = new PIXI.Sprite(PIXI.Texture.from(ImageImporter.candyImage));
        
        this.onScreenCandy.position.x = this.mapCell.realPosition.x;
        this.onScreenCandy.position.y = this.mapCell.realPosition.y;
        this.onScreenCandy.anchor.set(0.5, 0.5);

        this.mapCell.SetOccupation(this);

        Main.Get().GetApp().stage.addChild(this.onScreenCandy);
    }

    OnCollision(head : PlayerHead){
        head.CreateNewCell();

        ScoreManager.Get().AddScore(1);

        Main.Get().GetApp().stage.removeChild(this.onScreenCandy);
        this.mapCell.SetOccupation(null);

        CandySpawner.Get().SpawnRandomCandy();
    }

    public Dispose(){
        Main.Get().GetApp().stage.removeChild(this.onScreenCandy);
    }
}