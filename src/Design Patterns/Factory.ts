export class Factory{

    /**
     * Run the Factory example.
     * Create 3 different people using the PersonFactory.
     */
    Run(){
        console.log("%c ----- Factory -----", "font-weight: bold;");

        // Instantiate the factory.
        let factory = new PersonFactory;

        // Create a viking and let him intoduce himself.
        let viking : Viking = factory.Create(PersonType.VIKING);
        console.log(viking.Introduce());
        
        // Create a Priest and let him intoduce himself.
        let priest : Priest = factory.Create(PersonType.MAGE);
        console.log(priest.Introduce());
        
        // Create a Mage and let him intoduce himself.
        let mage : Mage = factory.Create(PersonType.PRIEST);
        console.log(mage.Introduce());
    }
}

/**
 * Responsible for creating different people.
 */
class PersonFactory{
    
    /**
     * Create a new person.
     * 
     * @param type What type of person to create.
     */
    Create (type : PersonType) : any{

        switch(type){
            case PersonType.VIKING:
                return new Viking;
                
            case PersonType.PRIEST:
                return new Priest;
                    
            case PersonType.MAGE:
                return new Mage;
        }
    }
}

/**
 * Base Interface that every person needs to implement.
 */
interface Person {
    Introduce () : string;
}

/**
 * A viking.
 */
class Viking implements Person{
    Introduce () : string{
        return "I am a great Viking!";
    }
}

/**
 * A priest.
 */
class Priest implements Person{
    Introduce () : string{
        return "I am a holy Priest!";
    }
}

/**
 * A mage.
 */
class Mage implements Person{
    Introduce () : string{
        return "I am an almighy Mage!";
    }
}

/**
 * All types of people.
 */
enum PersonType{
        VIKING,
        PRIEST,
        MAGE
}