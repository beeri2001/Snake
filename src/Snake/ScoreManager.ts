import * as PIXI from "pixi.js";
import { Arena } from "./Arena";
import { Main } from "./Main";

export class ScoreManager{

    public static Instance : ScoreManager;

    private score : number = 0;
    private onScreenText : PIXI.Text;

    public static Get() : ScoreManager{
        if(ScoreManager.Instance == null){
            ScoreManager.Instance = new ScoreManager();
        }

        return ScoreManager.Instance;
    }

    constructor(){
        this.onScreenText = new PIXI.Text("00");

        this.onScreenText.position.x = Arena.Get().GetMapOffset().x;
        this.onScreenText.position.y = 35;

        this.onScreenText.anchor.set(0, 0);

        Main.Get().GetApp().stage.addChild(this.onScreenText);

    }

    public AddScore(amountToAdd : number){
        this.score += amountToAdd;

        this.onScreenText.text = this.score < 10 ? "0" + this.score : this.score.toString();
    }

    public SetScore(newScore : number){
        this.score = newScore;

        this.onScreenText.text = this.score < 10 ? "0" + this.score : this.score.toString();
    }

    public GetScore() : number{
        return this.score;
    }
}