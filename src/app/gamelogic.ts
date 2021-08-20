import {Status } from './game-status';
export class Gamelogic {
    gameField: Array<number>=[];
    currentTurn : number;
    gameStatus: Status;
    winSituationsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [0,0,1,0,1,0,1,0,0],
        [1,0,0,0,1,0,0,0,1]
    ];

    winSituationsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [0,0,2,0,2,0,2,0,0],
        [2,0,0,0,2,0,0,0,2]
    ];


    public constructor() {
        this.currentTurn=1;
        this.gameStatus = Status.STOP;
        this.gameField=[0,0,0,0,0,0,0,0,0];
    }

    gameStart(): void {
        this.gameField= [0,0,0,0,0,0,0,0,0];
        this.currentTurn= this.randomPlayerStart();
        this.gameStatus=Status.START
    }

    randomPlayerStart() {
        const startPlayer= Math.floor(Math.random() * 2)+1;
        return startPlayer;
    }
    
    setField(postion:number,value:number): void {
    this.gameField[postion] = value;
    }

    getPlayerColorClass():string {
        const colorClass =(this.currentTurn === 2) ? 'player2' : 'player1';
        return colorClass;
    }

    changePlayer():void {
        this.currentTurn =(this.currentTurn === 2) ? 1 : 2;
    }

    async checkGameEndFull(): Promise<boolean> 
    {
        let isFull = true;

        if(this.gameField.includes(0)) {
            isFull= false;
        }

        if(isFull) {
            console.log('field is fill');
            this.gameEnd();
            return true;
        }
        else {
            return false;
        }
    }

    gameEnd(): void 
    {
        this.gameStatus = Status.STOP;
    }

    arrayEquals(a:Array<any>,b:Array<any>):boolean 
    {
        return Array.isArray(a) &&  Array.isArray(b) && a.length === b.length &&
        a.every( (value, index)=> value === b[index]);
    }

    async checkGameEndWinner(): Promise<boolean> {    
        let isWinner = false;
        const checkarray = (this.currentTurn===1) ? this.winSituationsOne : this.winSituationsTwo;
        const currentarray :number[]= [];

        this.gameField.forEach( (subfield, index) => {
          if( subfield !== this.currentTurn) 
          {
              currentarray[index]= 0;
          }
          else 
          {
              currentarray[index]=subfield;
          }
        });
       console.log(currentarray);

        checkarray.forEach( (checkfield, checkindex)=>
        {
            if(this.arrayEquals(checkfield,currentarray))
            {
            isWinner = true;
            }
        });

        //if(this.gameField.includes(0)) {
         //   isWinner= false;
        //}

        if(isWinner) {
            this.gameEnd();
            return true;
            
        }
        else {
            return false;
        }
    }

}
