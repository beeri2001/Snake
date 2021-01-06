export class ObjectPool{


    /**
     * Run the ObjectPool example.
     * Create 3 different cars while creating minimal instances of "Car".
     */
    Run(){
        console.log("%c ----- ObjectPool -----", "font-weight: bold;");
        
        // Instantiate the Pool.
        let pool : Pool =  new Pool(2);

        // Log 2 empty objects
        this.LogPool(pool);

        // Create the first car.
        let volvo : Car = pool.GetInstance("Volvo") as Car;
        // Log that there is one empty object still in the pool.
        this.LogPool(pool);
        
        // Create a second car.
        let Volkswagen : Car = pool.GetInstance("Volkswagen") as Car;
        // Disable the first car "volvo" (it will go back into the pool).
        pool.PoolInstance(volvo);

        // Log the disabled "volvo" in the pool list.
        this.LogPool(pool);
        
        // Create a third car "renault".
        let Renault : Car = pool.GetInstance("Renault") as Car;

        // Log the now empty pool.
        this.LogPool(pool);
        
        // Disable both cars.
        pool.PoolInstance(Renault);
        pool.PoolInstance(Volkswagen);
        // Log the disabled "renault" & "volkswagen" in the pool.
        this.LogPool(pool);
        
        // Create 3 cars. (a new instance is created, as only 2 existed before this).
        volvo = pool.GetInstance("Volvo") as Car;
        Volkswagen = pool.GetInstance("Volkswagen") as Car;
        Renault = pool.GetInstance("Renault") as Car;
        // Log the empty pool.
        this.LogPool(pool);
    
        // Disable all 3 cars, returning them to the pool.
        pool.PoolInstance(volvo);
        pool.PoolInstance(Volkswagen);
        pool.PoolInstance(Renault);
        // Log the 3 disabled cars in the pool.
        this.LogPool(pool);
    }

    /**
     * Log the "disabled" objects in the "pool" list.
     */
    private LogPool(pool : Pool){
        console.log(`%c pool: ${pool.ListPool()}`, "color:grey");
    }
}

class Pool{

    // The pool for disabled objects.
    private pool : PoolableObject[] = [];

    // Initialize the pool.
    constructor(initialPoolSize : number){
        // Initialize the pool.

        for(let i = 0; i < initialPoolSize; i++){
            this.CreateNewInstance();
        }
    }

    /**
     * Get an instance of a PoolableObject (car).
     * @param name Name for the object (car).
     */
    GetInstance(name : string) : PoolableObject{
        if(this.pool.length <= 0){
            this.CreateNewInstance();
        }

        let object = this.pool[0];
        this.pool.splice(0, 1);

        object.Enable(name);

        return object;
    }

    /**
     * Return an object to the pool, disabling it.
     * @param PoolableObject The object to return.
     */
    PoolInstance(PoolableObject : PoolableObject){

        PoolableObject.Disable();
        this.pool.push(PoolableObject);
    }

    /**
     * Return the contents of the pool list.
     */
    ListPool() : string{
        let pooledItems : string = "";

        if(this.pool.length > 0){

            this.pool.forEach(object => {
                pooledItems += `"${JSON.stringify(object)}" `;
            })

            return pooledItems;
        }
        else{
            return "empty";
        }

    }

    /**
     * Create a new instance of Car.
     */
    private CreateNewInstance(){
        console.log("%c Created new car.", "color:grey");
        this.pool.push(new Car("empty car"));
    }
}

/**
 * A poolable object.
 */
interface PoolableObject{
    /**
     * Called whenever the object is instantiated, functions like a Reset.
     * @param name The name for the object.
     */
    Enable (name : string) : void;

    /**
     * Disable the object, it has returned to the pool.
     */
    Disable () : void;
}

/**
 * A car.
 */
class Car implements PoolableObject{

    // The name of the car.
    name : string = "";

    // Construct the car.
    constructor(name : string){
        this.name = name;
    }

    /**
     * Enable / Reset this car object.
     * @param name Name to set for the car.
     */
    Enable(name : string){
        this.name = name;
        // Enable the car here.
        console.log(`"${this.name}" starting engine. (instantiated)`);
        
    }

    /**
     * Disable this car object.
     */
    Disable(){
        // Disable the car here, as it has been returned to the pool.
        console.log(`"${this.name}" turning off engine. (disabled)`);
    }
}