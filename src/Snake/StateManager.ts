import { PauseNotification } from "./PauseNotification";
import { ScoreManager } from "./ScoreManager";

export class StateManager{
    
    public static Instance : StateManager;

    private gameState = GameStates.PAUSED;

    static Get() : StateManager{
        if(StateManager.Instance == null){
            StateManager.Instance = new StateManager();
        }

        return StateManager.Instance;
    }

    public SetState(newState : GameStates){
        this.gameState = newState;

        switch(this.gameState){
            case GameStates.WAITING_FOR_FIRST_PLAY:
                PauseNotification.Get().Enable("Press [Space] to start playing!");
            break;
            case GameStates.PLAYING:
                PauseNotification.Get().Disable();
            break;
            case GameStates.PAUSED:
                PauseNotification.Get().Enable("Press [Space] to resume playing again!");
            break;
            case GameStates.REPLAY:
                PauseNotification.Get().Enable(`You crashed! your score was: ${ScoreManager.Get().GetScore()}\nPress [Space] to play again!`);
            break;
        }
    }

    public GetState(){
        return this.gameState;
    }
}

export enum GameStates{
    WAITING_FOR_FIRST_PLAY,
    PLAYING,
    PAUSED,
    REPLAY
}