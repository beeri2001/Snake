export class Facade{
    /**
     * Run the Facade example.
     * Create a fighterjet that has multiple components it controls.
     */
    Run(){
        console.log("%c ----- Facade -----", "font-weight: bold;");

        let jet : FighterJet = new FighterJet;

        jet.Start();

        jet.Power(15);

        jet.TakeOff();

        jet.Power(65);

        jet.Roll(RollDirection.LEFT, 15);

        jet.Pull(PullType.PULL, 15);

        jet.Roll(RollDirection.RIGHT, 15);

        jet.Roll(RollDirection.LEFT, 0);

        jet.Power(35);

        jet.Land();

        jet.Power(3);
    }
}


// Plane Facade.
class FighterJet{
    // Components this FighterJet controls
    thruster : Thruster = new Thruster;
    wheels : Wheels = {frontWheel: new Wheel, backLeftWheel: new Wheel, backRightWheel: new Wheel};
    flaps : Flaps = {innerRightFlap: new Flap, innerleftFlap: new Flap, outerRightFlap: new Flap, outerleftFlap: new Flap};

    constructor(){
    }

    /**
     * Start the plane
     */
    Start(){
        console.log("%cStarting plane.", "color:grey");
        this.thruster.Ignite();
    }

    /**
     * Set the power of the thruster in percentage.
     * @param power Amount of maxPower usage in percentage.
     */
    Power(power : number){
        this.thruster.SetPower(power);
    }

    /**
     * Roll the plane.
     * @param rollDirection To the right or left.
     * @param strength How strongly.
     */
    Roll(rollDirection : RollDirection, strength : number){
        
        switch(rollDirection){
            case RollDirection.LEFT:
                console.log("%cRolling Left", "color:grey");
                // Rotate the flaps.
                
                // Right flaps.
                this.flaps.innerRightFlap.SetRotation(-strength);
                this.flaps.outerRightFlap.SetRotation(-strength);
                
                // Left flaps.
                this.flaps.innerleftFlap.SetRotation(strength);
                this.flaps.outerleftFlap.SetRotation(strength);
            break;
            
            case RollDirection.RIGHT:
                console.log("%cRolling right", "color:grey");

                // Rotate the flaps.

                // Right flaps.
                this.flaps.innerRightFlap.SetRotation(strength);
                this.flaps.outerRightFlap.SetRotation(strength);

                // Left flaps.
                this.flaps.innerleftFlap.SetRotation(-strength);
                this.flaps.outerleftFlap.SetRotation(-strength);
            break;
        }
    }

    /**
     * Pull or push the plane
     * @param pullType Pull the plane up, or push the plane down.
     * @param strength How strongly.
     */
    Pull(pullType : PullType, strength : number){
        // If the flaps should be pushed, invert the strength so the flaps are moved downward.
        switch(pullType){
            case PullType.PULL:
                console.log("%cPulling plane up.", "color:grey");
            break;

            case PullType.PUSH:
                strength *= -1;
                console.log("%cPushing plane down.", "color:grey");
            break;
        }
        // Rotate the flaps.

        // Right flaps.
        this.flaps.innerRightFlap.SetRotation(-strength);
        this.flaps.outerRightFlap.SetRotation(-strength);

        // Left flaps.
        this.flaps.innerleftFlap.SetRotation(-strength);
        this.flaps.outerleftFlap.SetRotation(-strength);
    }

    /**
     * Performs takeoff procedures.
     */
    TakeOff(){
        console.log("%cTaking off.", "color:grey");

        this.Power(100);
        
        // Retract the wheels.
        this.wheels.frontWheel.Retract();
        this.wheels.backLeftWheel.Retract();
        this.wheels.backRightWheel.Retract();

        // Rotate the flaps.

        // Right flaps.
        this.flaps.innerRightFlap.SetRotation(15);
        this.flaps.outerRightFlap.SetRotation(15);
        
        // Left flaps.
        this.flaps.innerleftFlap.SetRotation(15);
        this.flaps.outerleftFlap.SetRotation(15);
    }

    /**
     * Performs landing procedures.
     */
    Land(){
        console.log("%cLanding.", "color:grey");

        // Extend the wheels.
        this.wheels.frontWheel.Extend();
        this.wheels.backLeftWheel.Extend();
        this.wheels.backRightWheel.Extend();

        // Rotate the flaps.

        // Right flaps.
        this.flaps.innerRightFlap.SetRotation(-15);
        this.flaps.outerRightFlap.SetRotation(-15);
        
        // Left flaps.
        this.flaps.innerleftFlap.SetRotation(-15);
        this.flaps.outerleftFlap.SetRotation(-15);
    }
}

enum RollDirection{
    LEFT,
    RIGHT
}
enum PullType{
    PULL,
    PUSH
}

type Flaps = {
    // Right flaps.
    innerRightFlap : Flap;
    outerRightFlap : Flap;
    
    // Left flaps.
    innerleftFlap : Flap;
    outerleftFlap : Flap;
}

type Wheels = {
    frontWheel : Wheel;

    backRightWheel : Wheel;
    backLeftWheel : Wheel;
}

// Independent components.

/**
 * Thruster to power planes.
 */
class Thruster{
    maxPower : number = 25600;
    
    Ignite(){
        console.log("Thruster ignitited");
    }
    /**
     * Set the power of the thruster (in percentage).
     * @param power percentage of total power output.
     */
    SetPower(power : number){
        console.log(`Set thruster power to ${power}%`);
    }
}

/**
 * Flaps to control planes.
 */
class Flap{
    SetRotation(rotation : number){
        console.log(`Set flap rotation to ${rotation}`);
    }
}

/**
 * Wheels for planes.
 */
class Wheel{
    Extend(){
        console.log("Extending wheel.");
    }
    Retract(){
        console.log("Retracting wheel.");
    }
}