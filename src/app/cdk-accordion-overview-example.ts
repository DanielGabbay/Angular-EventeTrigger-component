import { CdkAccordion } from '@angular/cdk/accordion';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

interface iTrigger {
  id?: number;
  translation?: string;
  values?: [];
}
type cTrigger = typeof cTrigger[keyof typeof cTrigger];
const cTrigger = {
  notify: JSON.stringify({ id: 1, translation: 'notify', values: [] }),
  agent: JSON.stringify({ id: 2, translation: 'agent', values: [] }),
  email: JSON.stringify({ id: 3, translation: 'email', values: [] }),
  cancel: JSON.stringify({ id: 4, translation: 'cancel', values: [] }),
  alert: JSON.stringify({ id: 5, translation: 'alert', values: [] }),
} as const;

interface iEvent {
  id?: number;
  translation?: string;
  values?: [];
}
type cEvent = typeof cEvent[keyof typeof cEvent];
const cEvent = {
  CycleStatusChanged: JSON.stringify({
    id: 1,
    translation: "the document's status was changed to",
    canTrigger: [1, 3, 4, 5],
    values: [],
  }),
  NotificationTimeout: JSON.stringify({
    id: 2,
    translation: 'a user does not sign the document within',
    canTrigger: [1, 3, 4, 5],

    values: [],
  }),
  UserTriggeredAlert: JSON.stringify({
    id: 3,
    translation: "a user clicked the document's alert button",
    canTrigger: [1],
    values: [],
  }),
} as const;

/**
 * @title Accordion overview
 */
@Component({
  selector: 'cdk-accordion-overview-example',
  templateUrl: 'cdk-accordion-overview-example.html',
  styleUrls: ['cdk-accordion-overview-example.css'],
})
export class CdkAccordionOverviewExample implements AfterViewInit {
  @ViewChild(CdkAccordion) accordion: CdkAccordion;
  expandedIndex = 0;

  items: Array<EventTriggerModel>;


  constructor() {
    this.items = new Array();
  }
  ngAfterViewInit(): void {}
  event_options = Object.values(cEvent).map((t) => {
    return JSON.parse(t)?.translation;
  });

  addNewEvent() {
    console.log(this.items.values.length);
    let it = new EventTriggerModel();
    it.$id = this.items.values.length;
    it.$event = cEvent.NotificationTimeout;
    this.items.push(it);
  }
}

export class EventTriggerModel {
  private id: number;
  private event: iEvent;
  private trigger: iTrigger;

  /**
   * Getter $id
   * @return {number}
   */
  public get $id(): number {
    return this.id;
  }

  /**
   * Getter $event
   * @return {iEvent}
   */
  public get $event(): iEvent {
    return this.event;
  }

  /**
   * Getter $trigger
   * @return {iTrigger}
   */
  public get $trigger(): iTrigger {
    return this.trigger;
  }

  /**
   * Setter $id
   * @param {number} value
   */
  public set $id(value: number) {
    this.id = value;
  }

  /**
   * Setter $event
   * @param {string | any} value
   */
  public set $event(value: string | any) {
    // console.log(JSON.parse(value) as iEvent);
    this.event = JSON.parse(value) as iEvent;
  }

  /**
   * Setter $trigger
   * @param {iTrigger} value
   */
  public set $trigger(value: string | any) {
    this.trigger = JSON.parse(value) as iTrigger;
  }

  constructor() {}

  validate() {}
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
