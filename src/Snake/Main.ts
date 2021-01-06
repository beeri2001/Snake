// Import Pixi.
import { indexOf } from "lodash";
import * as PIXI from "pixi.js";
import { Context } from "vm";
import { Arena } from "./Arena";
import { CandySpawner } from "./CandySpawner";
import { Disposable } from "./Interfaces/Disposable";
import { PauseNotification } from "./PauseNotification";
import { PlayerHead } from "./PlayerHead";
import { ScoreManager } from "./ScoreManager";
import { StateManager } from "./StateManager";
import { GameStates } from "./StateManager";

const Keyboard = require('pixi.js-keyboard');

export class Main{

    public static Instance : Main;

    // Methods subscribed to "UpdateCall" are called every frame.
    private UpdateCall : MethodCall[] = [];
    
    // The PIXI App itself
    private app : PIXI.Application = new PIXI.Application({
        width: 1200, height: 700, backgroundColor: 0x00e600, resolution: window.devicePixelRatio || 1
    });

    private disposableObjects : Disposable[] = [];

    static Get() : Main{
        if(Main.Instance == null){
            Main.Instance = new Main();
        }

        return Main.Instance;
    }

    /**
     * Start the snake game.
     */
    Start(){
        document.getElementById("display").appendChild(this.app.view);

        Arena.Get();
        
        PauseNotification.Get();

        StateManager.Get().SetState(GameStates.WAITING_FOR_FIRST_PLAY);

        this.app.ticker.add(this.UpdateLoop, this);

        this.StartNewGame()
    }

    public StartNewGame(){
        this.Reset();

        Arena.Get().Initialize();

        this.AddDisposableObject(new PlayerHead());

        CandySpawner.Get().SpawnRandomCandy();

        this.SubscribeToUpdate(this.Update, this);
    }

    private Reset(){
        this.UpdateCall = [];

        ScoreManager.Get().SetScore(0);

        this.disposableObjects.forEach(obj => {
            obj.Dispose();
        });

        this.disposableObjects = [];
    }
    
    // ----- UpdateCall subscribtion and call -----
    SubscribeToUpdate(methodToSubscribe : (delta : number, context : any) => void, context : Context) : number{
        let id = Math.round(Math.random() * 9999999);

        this.UpdateCall.push({method: methodToSubscribe, context: context, id: id});

        return id;
    }

    UnSubscribeUpdate(id : number){
        let index = -1;
        
        this.UpdateCall.forEach(call => {
            if(call.id == id){
                index = indexOf(this.UpdateCall, call);
            }
        });

        this.UpdateCall.splice(index, 1);
    }
    
    private UpdateLoop() : void{
        this.UpdateCall.forEach(call => {
            call.method(this.app.ticker.deltaMS / 1000, call.context);
        });
    }

    public Update(delta : number, context : Main){
        switch(StateManager.Get().GetState()){
            case GameStates.PLAYING:
                context.OnPlayingUpdate(delta, context);
            break;

            case GameStates.PAUSED:
            case GameStates.WAITING_FOR_FIRST_PLAY:
                context.OnPausedUpdate(delta, context);
            break;

            case GameStates.REPLAY:
                context.OnReplayUpdate(delta, context);
            break;
        }

        Keyboard.update();
    }

    private OnPlayingUpdate(delta : number, context : Main){
        if(Keyboard.isKeyPressed("Escape", "Space")){
            StateManager.Get().SetState(GameStates.PAUSED);
        }
    }
    
    private OnPausedUpdate(delta : number, context : Main){
        if(Keyboard.isKeyPressed("Space", "Escape")){
            StateManager.Get().SetState(GameStates.PLAYING);
        }
    }

    private OnReplayUpdate(delta : number, context : Main){
        if(Keyboard.isKeyPressed("Space", "Escape")){
            this.StartNewGame();
            StateManager.Get().SetState(GameStates.PLAYING);
        }
    }
    
    // ----- Data Getters / Setters -----
    GetApp(){
        return this.app;
    }

    public AddDisposableObject(object : Disposable){
        this.disposableObjects.push(object);
    }
}

type MethodCall = {
    id : number;
    method : Function;
    context : Context;
}