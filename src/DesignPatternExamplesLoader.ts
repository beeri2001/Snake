import {Strategy} from "./Design Patterns/Strategy";
import {Factory} from "./Design Patterns/Factory";
import {Builder} from "./Design Patterns/Builder";
import {ObjectPool} from "./Design Patterns/ObjectPool";
import {SingletonExample} from "./Design Patterns/Singleton";
import {Adapter} from "./Design Patterns/Adapter";
import {Facade} from "./Design Patterns/Facade";
import {Observer} from "./Design Patterns/Observer";
import {State} from "./Design Patterns/State";

export class DesignPatternExamples{
    Run(){
        // Design Pattern examples:
        
        // Strategy:
        let m_strategy = new Strategy;
        m_strategy.Run();
        
        // Factory:
        let m_factory = new Factory;
        m_factory.Run();
        
        // Builder:
        let m_builder = new Builder;
        m_builder.Run();
        
        // Object Pool:
        let m_objectPool = new ObjectPool;
        m_objectPool.Run();
        
        // Singleton:
        let m_singleton = new SingletonExample;
        m_singleton.Run();
        
        // Adapter:
        let m_adapter = new Adapter;
        m_adapter.Run();
        
        // Facade:
        let m_facade = new Facade;
        m_facade.Run();
        
        // Observer:
        let m_observer = new Observer;
        m_observer.Run();
        
        // State:
        let m_state = new State;
        m_state.Run();
    }
}