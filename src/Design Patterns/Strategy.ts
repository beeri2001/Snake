export class Strategy{

    /**
     * Run the Strategy pattern.
     * This will execute an "Operation" 3 times using the same 2 numbers, but using a different strategy to operate on the 2 numbers.
     */
    Run(){
        console.log("%c ----- Strategy -----", "font-weight: bold;");
        
        // Create the 2 numbers.
        let number1 : number = 10;
        let number2 : number = 20;
        
        // Set the first operation to "Add" and execute it.
        let operation : Operation = new Operation(new Add());
        console.log(`Adding number1 (${number1}) and number2 (${number2}), which becomes: ` + operation.Operate(number1, number2));
        
        // Set the first operation to "Subtract" and execute it.
        operation = new Operation(new Subtract());
        console.log(`Subtracting number1 (${number1}) and number2 (${number2}), which becomes: ` + operation.Operate(number1, number2));
        
        // Set the first operation to "Multiply" and execute it.
        operation = new Operation(new Multiply());
        console.log(`Multiplying number1 (${number1}) and number2 (${number2}), which becomes: ` + operation.Operate(number1, number2));
    }
}

/**
 * The class that contains a strategy that can be switched out to perform different tasks based on waht is requested.
 */
class Operation{
    // The currently set strategy.
    private Strategy : OperationBase;

    // Construct the Operation and ask for the Strategy to use.
    constructor(operation : OperationBase){
        this.Strategy = operation;
    }

    // Execute the operation with the 2 given numbers.
    Operate(num1 : number, num2 : number) : number{
        return this.Strategy.Operate(num1, num2);
    }
}

// The baseInterface for the Operations.
interface OperationBase{
    Operate (num1 : number, num2 : number) : number;
}

// Inherit from baseInterface, Add num1 and num2.
class Add implements OperationBase{
    
    Operate(num1 : number, num2 : number) : number{
        return num1 + num2;
    }
}
// Inherit from baseInterface, Subtract num2 form num1.
class Subtract implements OperationBase{
    
    Operate(num1 : number, num2 : number) : number{
        return num1 - num2;
    }
}

// Inherit from baseInterface, multiply num1 with num2.
class Multiply implements OperationBase{

    Operate(num1 : number, num2 : number) : number{
        return num1 * num2;
    }
}