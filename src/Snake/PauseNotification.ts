import * as PIXI from "pixi.js";
import { Main } from "./Main";

export class PauseNotification{

    public static Instance : PauseNotification;

    private onScreenText : PIXI.Text;

    private messageStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: '#ffffff'
    });

    public static Get(){
        if(PauseNotification.Instance == null){
            PauseNotification.Instance = new PauseNotification();
        }

        return PauseNotification.Instance;
    }

    constructor(){
        this.onScreenText = new PIXI.Text("", this.messageStyle);

        this.onScreenText.anchor.set(0.5, 0.5);
        this.onScreenText.position.x = Main.Get().GetApp().view.width / 2;
        this.onScreenText.position.y = Main.Get().GetApp().view.height / 2;

        Main.Get().GetApp().stage.addChild(this.onScreenText);
    }

    Enable(message : string){
        this.onScreenText.text = message;
    }

    Disable(){
        this.onScreenText.text = "";
    }
}