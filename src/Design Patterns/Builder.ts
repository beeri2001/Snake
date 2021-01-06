export class Builder{
    
    /**
    * Run the Builder example.
     * Create 3 orders with pizzas using the OrderBuilder.
     */
    Run(){
        console.log("%c ----- Builder -----", "font-weight: bold;");

        // Instantiate the OrderBuilder.
        let orderBuilder : OrderBuilder = new OrderBuilder;

        // Create 3 orders.
        let order1 = orderBuilder.Order1();
        let order2 = orderBuilder.Order1();
        let order3 = orderBuilder.Order2();

        // Print out the 3 orders.
        console.log(order1.ListOrder());
        console.log(order2.ListOrder());
        console.log(order3.ListOrder());
    }
}
/**
 * Contains multiple Order variations that can be constructed.
 */
class OrderBuilder{
    Order1() : Order{
        let order : Order = new Order;

        order.AddPizza(new CheesePizza);
        order.AddPizza(new CheesePizza);
        order.AddPizza(new MushroomPizza);
        order.AddPizza(new MeatPizza);

        return order;
    }
    Order2() : Order{
        let order : Order = new Order;

        order.AddPizza(new MushroomPizza);
        order.AddPizza(new MushroomPizza);
        order.AddPizza(new MeatPizza);
        order.AddPizza(new MeatPizza);

        return order;
    }
}

/**
 * And order containing a pizza array, The entire order can be retrieved via "ListOrder".
 */
class Order{
    pizzas : Pizza[] = [];

    /**
     * Add a pizza to the order.
     * @param pizzaToAdd The pizza to add to the order.
     */
    AddPizza(pizzaToAdd : Pizza){
        this.pizzas.push(pizzaToAdd);
    }

    /**
     * Parse the entire order to a string and return it.
     */
    ListOrder() : string{
        let order : string = "";
        
        this.pizzas.forEach(pizza => {
            order += `${pizza.GetName()} with `;

            pizza.GetIngredients().forEach(ingredient => {
                order += `"${Ingredients[ingredient].toLowerCase()}" `;
            });

            order += `for ${pizza.GetPrice().toString()}\n`;
        });

        let totalPrice : number = 0;

        this.pizzas.forEach(pizza => {
            totalPrice += pizza.GetPrice();
        })

        order += `\nTotal: ${totalPrice.toString()}`;

        return order;
    }
}

/**
 * Pizza base interface that every pizza inherits from.
 */
interface Pizza{
    GetName (): string;
    GetIngredients(): Ingredients[];
    GetPrice (): number;
}

/**
 * Ingredients enum containing all the avaiable ingredients for pizzas.
 */
enum Ingredients{
    CHEESE,
    HAM,
    PINEAPPLE,
    MUSHROOMS,
    BACON,
    CHICKEN
}

/**
 * A cheese pizza.
 */
class CheesePizza implements Pizza{
    GetName() : string{
        return "Cheese pizza";
    }
    GetIngredients() : Ingredients[]{
        return [Ingredients.CHEESE, Ingredients.BACON, Ingredients.HAM];
    }
    GetPrice() : number{
        return 8.5;
    }
}
/**
 * A mushroom pizza.
 */
class MushroomPizza implements Pizza{
    GetName() : string{
        return "Mushroom pizza";
    }
    GetIngredients() : Ingredients[]{
        return [Ingredients.CHEESE, Ingredients.MUSHROOMS, Ingredients.CHICKEN];
    }
    GetPrice() : number{
        return 12.75;
    }
}
/**
 * A meat pizza.
 */
class MeatPizza implements Pizza{
    GetName() : string{
        return "Meat pizza";
    }
    GetIngredients() : Ingredients[]{
        return [Ingredients.CHEESE, Ingredients.BACON, Ingredients.CHICKEN, Ingredients.HAM];
    }
    GetPrice() : number{
        return 14.25;
    }
}