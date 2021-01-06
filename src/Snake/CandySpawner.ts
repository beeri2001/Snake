import { Arena } from "./Arena";
import { Candy } from "./Candy";
import { Vector2 } from "./Custom Types/Vector2";
import { Main } from "./Main";

export class CandySpawner{
    
    public static Instance : CandySpawner;
    
    static Get() : CandySpawner{
        if(CandySpawner.Instance == null){
            CandySpawner.Instance = new CandySpawner();
        }

        return CandySpawner.Instance;
    }

    public SpawnRandomCandy(){
        let mapSize = Arena.Get().GetSize();
        
        let randomX = Math.round(Math.random() * mapSize.x - 1);
        let randomY = Math.round(Math.random() * mapSize.y - 1);
        
        if(randomX < 0){
            randomX = 0;
        }
        if(randomY < 0){
            randomY = 0;
        }

        let targetCell = Arena.Get().GetCellInfo(new Vector2(randomX, randomY));
        
        while(targetCell.GetOccupation() != false){
            randomX = Math.round(Math.random() * mapSize.x - 1);
            randomY = Math.round(Math.random() * mapSize.y - 1);
            
            if(randomX < 0){
                randomX = 0;
            }
            if(randomY < 0){
                randomY = 0;
            }
            
            targetCell = Arena.Get().GetCellInfo(new Vector2(randomX, randomY));
        }
        
        Main.Get().AddDisposableObject(new Candy(targetCell.gridPosition));
    }
}