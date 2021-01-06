export class SingletonExample{

    /**
     * Run the Singleton example.
     * Use "Singleton" to perfrom custom actions (calculations).
     */
    Run(){
        console.log("%c ----- Singleton -----", "font-weight: bold;");

        // Create num1 & num2.
        let num1 : number = 15;
        let num2 : number = 8;

        console.log(`number 1 (${num1}) and number 2 (${num2}):`)

        // Perform the custom calculations of the singleton.
        console.log("Added: " + Singleton.Get().Add(num1, num2));
        console.log("Subtracted: " + Singleton.Get().Subtract(num1, num2));
        console.log("Multiplied: " + Singleton.Get().Multiply(num1, num2));
        console.log("Dvidided: " + Singleton.Get().Divide(num1, num2));

        console.log("Using a singleton's custom methods.");
    }

}

/**
 * Singleton used to perform custom calculations.
 */
class Singleton{
    // The instance for the singleton.
    static Instance : Singleton;

    // Get the instance of the singleton.
    static Get() : Singleton{
        if(Singleton.Instance == null){
            Singleton.Instance = new Singleton();
        }

        return Singleton.Instance;
    }

    /**
     * Add "num1" and "num2".
     */
    Add(num1 : number, num2 : number) : number{
        return num1 + num2;
    }
     /**
     * Subtract "num1" from "num2".
     */
    Subtract(num1 : number, num2 : number) : number{
        return num1 - num2;
    }
     /**
     * Multiply "num1" and "num2".
     */
    Multiply(num1 : number, num2 : number) : number{
        return num1 * num2;
    }
     /**
     * Divide "num1" by "num2".
     */
    Divide(num1 : number, num2 : number) : number{
        return num1 / num2;
    }
}