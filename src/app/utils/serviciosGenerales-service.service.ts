import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
export interface Activity {
  id?: number;
  fecha: string;
  monitor: Monitor[];
  tipo: ActivityType;
}
export interface Monitor{
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
}
export enum ActivityType {
  Pilates = "Pilates",
  BodyPump = "BodyPump",
  Spinning = "Spinning"
}
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  activities: Activity[];
  monitors: Monitor[];
  constructor(private logger: LoggerService) {
    this.monitors = [
      {
        id: 0,
        nombre: "entrenado1",
        email: "mail1@gmail.com",
        telefono: "123456789"
      },
      {
        id: 1,
        nombre: "entrenado2",
        email: "mail2@gmail.com",
        telefono: "123456654"
      },
      {
        id: 2,
        nombre: "entrenado3",
        email: "mail3@gmail.com",
        telefono: "987654987"
      },
      {
        id: 3,
        nombre: "entrenado4",
        email: "mail4@gmail.com",
        telefono: "987654321"
      }
    ]
    this.activities = [
      {
        id: 0,
        fecha: "21/1/2024, 23:59:00",
        monitor: [this.monitors[0]],
        tipo: ActivityType.BodyPump
      },
      {
        id: 1,
        fecha: "22/1/2024, 23:59:00",
        monitor: [this.monitors[1]],
        tipo: ActivityType.Pilates
      },
      {
        id: 2,
        fecha: "23/1/2024, 23:59:00",
        monitor: [this.monitors[1], this.monitors[2]],
        tipo: ActivityType.Spinning
      }
    ];;
  }
  getActivities(){
    return this.activities;
  }
  getMonitors(){
    return this.monitors;
  }
  addActivity(activity: Activity){
    var finalActivity: Activity = this.activities[this.activities.length - 1];
    if (finalActivity){
      activity.id = finalActivity.id ? finalActivity.id + 1 : 0;
    }else{
      activity.id = 0;
    }
    this.activities = this.activities.concat(activity);
  }
  addMonitor(monitor: Monitor){
    var finalMonitor: Monitor = this.monitors[this.monitors.length - 1];
    if (finalMonitor){
      monitor.id = finalMonitor.id ? finalMonitor.id + 1 : 0;
    }else{
      monitor.id = 0;
    }
    this.monitors = this.monitors.concat(monitor);
  }
  removeActivity(activityId: number) {
    this.activities = this.activities.filter(activity => activity.id !== activityId);
  }

  removeMonitor(monitorId: number) {
    this.monitors = this.monitors.filter(monitor => monitor.id !== monitorId);
    this.activities.forEach(activity => {
      activity.monitor = activity.monitor.filter(monitor => monitor.id !== monitorId);
    });
  }
}
