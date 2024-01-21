import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
// import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalServiceService, ActivityType, Monitor, Activity } from '../utils/serviciosGenerales-service.service';

@Component({
  selector: 'diw-activities',
  standalone: true,
  imports: [MatDatepickerModule,MatCardModule, MatNativeDateModule, NgClass, CommonModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
//requisitos:
//    TODO! hay que empezar con la fecha actual y asi nos quitamos lo de si no seleciona 
export class ActivitiesComponent {
  activities: Activity[] = [];
  activityTypes: ActivityType[] = [ActivityType.BodyPump, ActivityType.Pilates, ActivityType.Spinning];
  date: Date = new Date();
  newActivity: Activity = { fecha: '', monitor: [], tipo: ActivityType.Pilates };
  activity1: Activity = { fecha: '', monitor: [], tipo: ActivityType.Pilates };
  activity2: Activity = { fecha: '', monitor: [], tipo: ActivityType.Pilates };
  activity3: Activity = { fecha: '', monitor: [], tipo: ActivityType.Pilates };
  defaultMessage: string = this.date.getDate().toLocaleString() + ' ' + this.date.toLocaleString('es-ES', { month: 'long' }) + ' ' + this.date.getFullYear();

  hour1: string = '10:00';hour2: string = '13:30';hour3: string = '17:30';
  act1: boolean = false;
  act2: boolean = false;
  act3: boolean = false;
  isModalOpen: boolean = false;
  monitors: Monitor[];
  idMonitor1: number = -1;
  idMonitor2: number = -1;

  constructor(private globalService: GlobalServiceService) {
    this.monitors = this.globalService.getMonitors();
  }
  setHour(hour: string): Date {
    const [startHourHours, startHourMinutes] = hour.split(':');
    const newDate = new Date(this.date);
    newDate.setHours(Number(startHourHours), Number(startHourMinutes), 0);
    return newDate;
  }
  closeModal(): void {
    //dejamos vacia la actividad y asi no se añade PORQUE ESTA VACIA y no se añade
    this.newActivity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
    this.isModalOpen = false;//cierra el modal
  }

  openModal(hour: string): void {
    //TODO recibimos los monitores y los guardamos en la variable y abrimos el modalm, ponemos la fecha y la hora de la actividad
    this.monitors = this.globalService.getMonitors();
    this.isModalOpen = true;
    this.date = this.setHour(hour);
    //! this.newActivity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
    this.newActivity.fecha = this.date.toLocaleString();
  }

  //TODO pasamos o retrocedemos un dia para poder selecionar que actividades se muestran
  prevDay(): void {
    if (this.defaultMessage !== this.date.getDate().toLocaleString()) {
      this.date.setDate(this.date.getDate() - 1);
      this.onDateChange();
    }
  }

  nextDay(): void {
    if (this.defaultMessage !== this.date.getDate().toLocaleString()) {
      this.date.setDate(this.date.getDate() + 1);
      this.onDateChange();
    }
  }

  onDateChange(): void {
    this.act1 = false;
    this.act2 = false;
    this.act3 = false;

    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const month = new Intl.DateTimeFormat('es-ES', options).format(this.date);//cogemos el mes en español formato largo
    this.defaultMessage = `${this.date.getDate()} ${month.charAt(0).toUpperCase() + month.slice(1)} ${this.date.getFullYear()}`;

    this.activities = this.globalService.getActivities();
    // this.activities = this.activities.filter((activity) => activity.fecha === this.date.toLocaleString());
    const date1 = this.setHour(this.hour1);
    const date2 = this.setHour(this.hour2);
    const date3 = this.setHour(this.hour3);
    // console.log(this.activities);
    //TODO controlamos que no se repitan las actividades en el mismo dia y hora y que no se repitan los monitores
    this.activities.forEach((activity) => {
      if (activity.fecha === date1.toLocaleString()) {
        this.activity1 = activity;
        this.act1 = true;
      }
      if (activity.fecha === date2.toLocaleString()) {
        this.activity2 = activity;
        this.act2 = true;
      }
      if (activity.fecha === date3.toLocaleString()) {
        this.activity3 = activity;
        this.act3 = true;
      }
    });
  }

  
  //TODO Finalmente añadimos la actividad a la lista de actividades cuando pulsamos el boton y cerramos el modal
  addActivity(): void {
    if (this.idMonitor1 !== -1 || this.idMonitor2 !== -1) {
      const selectedMonitor1: Monitor = this.monitors[this.idMonitor1];
      const selectedMonitor2: Monitor = this.monitors[this.idMonitor2];

      if (selectedMonitor1) {
        this.newActivity.monitor = [selectedMonitor1];
      }

      if (selectedMonitor2) {
        if (!this.newActivity.monitor) {
          this.newActivity.monitor = [];
        }
        this.newActivity.monitor.push(selectedMonitor2);
      }

      const existingActivity = this.globalService.getActivities().find(activity => activity.id === this.newActivity.id);

      if (existingActivity) {
        Object.assign(existingActivity, this.newActivity);
      } else {
        this.globalService.addActivity(this.newActivity);
      }

      this.onDateChange();
      this.closeModal();
      this.newActivity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
      console.log(this.globalService.getActivities());
    } else {
      console.error('al menos un monitor');
    }
  }

  deleteActivity(activity: Activity): void {
    const activityId = activity.id || 0;
    this.globalService.removeActivity(activityId);
    this.onDateChange();
  }

  editActivity(activity: Activity, hour: string): void {
    this.newActivity = { ...activity };
    this.openModal(hour);
  }
}

  

  
