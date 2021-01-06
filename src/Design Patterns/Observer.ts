export class Observer{
    
    /**
     * Run the Observer example.
     * Have users subscribe to publishers via an observer system.
     */
    Run(){
        console.log("%c ----- Observer -----", "font-weight: bold;");

        // Create 3 users.
        let tom = new User("Tom");
        let rob = new User("Rob");
        let dan = new User("Dan");

        // Create 2 publishers.
        let p_garnt = new Publisher;
        let p_connor = new Publisher;

        // Have Tom subscribe to garnt & connor, rob subscribe to garnt and dan subscribe to connor.
        tom.SubscribeTo(p_garnt);
        tom.SubscribeTo(p_connor);

        rob.SubscribeTo(p_garnt);

        dan.SubscribeTo(p_connor);

        // Have both Connor and Garnt notify their subscribers.
        p_garnt.NotifySubscribers("Hey! I'm Garnt.");
        p_connor.NotifySubscribers("Hey! I'm Connor.");

        // Have Tom unsubscribe from Connor.
        tom.UnsubscribeFrom(p_connor);

        // Have Connor notify his subscribers again.
        p_connor.NotifySubscribers("Another message.");
    }
}

/**
 * A publisher, the "Subject"
 */
class Publisher{
    subscribers : User[] = [];

    /**
     * Add a user to this publishers subscribers list.
     * @param userToSubscribe The user to add to the subscribers list.
     */
    Subscribe(userToSubscribe : User){
        this.subscribers.push(userToSubscribe);
    }

    /**
     * Remove a user from this publishers subscribers list.
     * @param userToSubscribe The user to remove from the subscribers list.
     */
    UnSubscribe(userToUnsubscribe : User){
        let index : number = this.subscribers.indexOf(userToUnsubscribe);
        if(index > -1){
            this.subscribers.splice(index, 1);
        }
    }
    
    /**
     * Notify all users in this publishers subscribers list.
     * @param content The notification to send to all subscribers of this publisher.
     */
    NotifySubscribers(content : string){
        this.subscribers.forEach(sub => {
            sub.Notify(content);
        })
    }
}

/**
 * A user, the "Observer" (subscriber).
 */
class User{

    subscriberName : string;

    constructor(name : string){
        this.subscriberName = name;
    }

    /**
     * Have the user subscribe to a publisher.
     * @param publisherToSubscribeTo The publisher to subscribe to.
     */
    SubscribeTo(publisherToSubscribeTo : Publisher){
        publisherToSubscribeTo.Subscribe(this);
    }
    /**
     * Have the user unsubscribe from a publisher.
     * @param publisherToSubscribeTo The publisher to unsubscribe from.
     */
    UnsubscribeFrom(publisherToUnsubscribeFrom : Publisher){
        publisherToUnsubscribeFrom.UnSubscribe(this);
    }

    /**
     * Publishers can notify their subscribers via this.
     * @param content The content of the notification.
     */
    Notify(content : string){
        console.log(`"${this.subscriberName}" has been notified: "${content}"`);
    }
}