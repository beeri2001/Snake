export class State{
    state : States;

    constructor(){
        this.state = States.STARTING;
    }

    /**
     * Run the State example.
     * Call a single behaviour method that changes what it does depending on the current state.
     */
    Run(){
        console.log("%c ----- State -----", "font-weight: bold;");

        this.RunBehaviour();

        this.SetState(States.PLAYING);
        this.RunBehaviour();
        
        this.SetState(States.PAUSED);
        this.RunBehaviour();
        
        this.SetState(States.PLAYING);
        this.RunBehaviour();
        
        this.SetState(States.OVER);
        this.RunBehaviour();
        
        this.SetState(States.STARTING);
        this.RunBehaviour();
        
        this.SetState(States.PLAYING);
        this.RunBehaviour();

    }

    /**
     * Set the state.
     * @param newState The new state.
     */
    private SetState(newState : States){
        this.state = newState;
    }

    /**
     * Run different behaviour based on the current state.
     */
    private RunBehaviour(){
        switch(this.state){
            case States.STARTING:
                this.StartingBehaviour();
            break;

            case States.PLAYING:
                this.PlayingBehaviour();
            break;
                
            case States.PAUSED:
                this.PausedBehaviour();
            break;
            
            case States.OVER:
                this.OverBehaviour();
            break;
        }
    }

    /**
     * Behaviour on state "Starting".
     */
    private StartingBehaviour(){
        console.log("The game is starting!");
    }

    /**
     * Behaviour on state "Playing".
     */
    private PlayingBehaviour(){
        console.log("The game is playing!");
    }

    /**
     * Behaviour on state "Paused".
     */
    private PausedBehaviour(){
        console.log("The game is paused!");
    }

    /**
     * Behaviour on state "Over".
     */
    private OverBehaviour(){
        console.log("The game is over!");
    }
}

/**
 * Game states.
 */
enum States{
    STARTING,
    PLAYING,
    PAUSED,
    OVER
}