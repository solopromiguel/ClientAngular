import { Injectable } from '@angular/core';
import {TransitionController, Transition, TransitionDirection} from 'ng2-semantic-ui';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  public transitionController = new TransitionController();
  constructor() { }

    public animate(transitionName: string = 'fade right') {
    this.transitionController.animate(
        new Transition(transitionName, 500, TransitionDirection.In, () => console.log('Completed transition.')));
  }
}
