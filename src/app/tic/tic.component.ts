
import { Component, OnInit } from '@angular/core';
import {Gamelogic} from '../gamelogic';

@Component({
  selector: 'app-tic',
  templateUrl: './tic.component.html',
  styleUrls: ['./tic.component.scss'],
  providers: [Gamelogic]
})
export class TicComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void { }
   
  startGame(): void{
      this.game.gameStart();
      const currentPlayer = 'current turn: player: '+ this.game.currentTurn;
      const information = document.querySelector('.current-status');
      information!.innerHTML = currentPlayer ;
    }

    async clickSubfield(subfield: any): Promise<void> {
      if(this.game.gameStatus === 1) {
        const position = subfield.currentTarget.getAttribute('position');
        this.game.setField(position, this.game.currentTurn);
        const color = this.game.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);
        
     await this.game.checkGameEndWinner().then((end:boolean) => {
       if(this.game.gameStatus === 0 && end ) {
        const currentPlayer1 = 'Winner is : player: '+ this.game.currentTurn;
        const information = document.querySelector('.current-status');
        information!.innerHTML = currentPlayer1 ;
       }
     });

     await this.game.checkGameEndFull().then((end:boolean)=> {
      if(this.game.gameStatus === 0 && end) {
        const currentPlayer2 = 'No winner, draw' 
        const information = document.querySelector('.current-status');
        information!.innerHTML = currentPlayer2 ;

      }
    });

      this.game.changePlayer();

      if(this.game.gameStatus === 1) {
        const currentPlayer ='Current turn: Player: ' + this.game.currentTurn;
        const information = document.querySelector('.current-status');
        information!.innerHTML=currentPlayer;
      }
    }

  }

}
