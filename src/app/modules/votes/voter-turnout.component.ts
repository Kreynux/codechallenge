import { Component } from '@angular/core';
import { VoterTurnoutService } from './voter-turnout.service'
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { Turnout } from './voter-turnout.module';

@Component({
  selector: 'voter-turnout',
  templateUrl: './voter-turnout.component.html',
  styleUrls: ['./voter-turnout.component.css']
})


export class VoterTurnoutComponent {
  title = 'Voter Turnout in Sweden';
  highestTurnouts: Turnout[] = [];

  constructor(private voterturnoutService: VoterTurnoutService) { }
  
  ngOnInit() {
  this.addHighTurnout();
  
  }
  
  addHighTurnout() {

    forkJoin([this.voterturnoutService.getVoters(), this.voterturnoutService.getVoterTurnout()])
      .pipe(first())
      .subscribe((data)=>{

        for (let obj of data[1]) {  
          let p = +obj.values[0];
          if(Number.isNaN(p)) {
            continue;
          }
      
          let y = +obj.key[1];
          let c = obj.key[0];
          let n = data[0].valueTexts[data[0].values.indexOf(c)];
          let found = false;

          for(var i = 0; i < this.highestTurnouts.length; i++) {
            if (this.highestTurnouts[i].year == y){
              if ( this.highestTurnouts[i].percentage > p){
                found = true;
              }
              else if ( this.highestTurnouts[i].percentage < p) {
                 this.highestTurnouts.splice(i, 1);  
              }
            }
          }
          if (!found) {
            let t: Turnout = {year: y, code: +c, name: n, percentage: p};
            this.highestTurnouts.push(t);
          }
        }
        this.highestTurnouts.sort((a, b) =>(+a.year) - (+b.year));
      });
  }
}