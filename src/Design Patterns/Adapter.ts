export class Adapter{

    /**
     * Run the Adapter example.
     * Use an adapter whic hdetermines which function should be called depending on the "type" given to "Play".
     */
    Run(){
        console.log("%c ----- Adapter -----", "font-weight: bold;");

        // Call "Play" 4 times giving different "types".
        this.Play(1);
        this.Play(2);
        this.Play(0);
        this.Play(4);
    }

    /**
     * Call Player to play a type.
     */
    Play(type : number){
        let player : Player = new Player;

        if(player.Play(type)){
            console.log("%cPlayed successfully", "color:grey");
        }
        else{
            console.log("%cPlaying failed.", "color:grey");
        }
    }
}

/**
 * Player that calls PlayerAdapter.
 */
class Player implements IPlayer{
    Play(type: number) : boolean{
        let adapter = new PlayerAdapter;

        if(adapter.Play(type)){
            return true;
        }
        return false;
    }
}


class PlayerAdapter implements IPlayer{
    /**
     * Checks what type was sent in and calls the appropriate method to play it.
     * @param type The type to play.
     */
    Play(type : number) : boolean{
        let AdvancedPlayer : IAdvancedPlayer;

        // Check what type was sent in, and use the correct TypePlayer for the type.
        switch(type){
            case 1:
                AdvancedPlayer = new Type1Player;
                AdvancedPlayer.PlayType1();
                return true;
            break;

            case 2:
                AdvancedPlayer = new Type2Player;
                AdvancedPlayer.PlayType2();
                return true;
            break;

            default:
            console.log(`The type ${type} wasn't recognised, nothing happened.`);
            return false;
            break;
        }
    }    
}

interface IPlayer{
    Play(type : number) : boolean;
}

interface IAdvancedPlayer{
    PlayType1() : void;
    PlayType2() : void;
}

/**
 * Player for Type1.
 */
class Type1Player implements IAdvancedPlayer{
    PlayType1(){
        console.log("Played Type 1");
    }
    PlayType2(){
    }
}

/**
 * Player for Type2.
 */
class Type2Player implements IAdvancedPlayer{
    PlayType1(){
    }
    PlayType2(){
        console.log("Played Type 2");
    }
}