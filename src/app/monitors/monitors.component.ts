import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalServiceService, Monitor } from '../utils/serviciosGenerales-service.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-monitors',
  standalone: true,

  imports: [CommonModule, CarouselModule, FormsModule],
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss']
})
export class MonitorsComponent implements OnInit {

  numVisible: number = 3;

  monitors: Monitor[] = [];

  newMonitor: Monitor = { nombre: '', email: '', telefono: '' };
  isModalOpen: boolean = false;
  isDetailsModalOpen: boolean = false;
  selectedMonitor: Monitor | undefined; // Variable para almacenar el monitor seleccionado

  searchTerm: string = '';
  filteredMonitors: Monitor[] = [];

  constructor(private globalService: GlobalServiceService) { }

  ngOnInit(): void {
    this.updateMonitors();
  }

  [x: string]: any;
  prevSlide() {
    this['carousel'].prev();
  }
  nextSlide() {
    this['carousel'].next();
  }


  deleteMonitor(monitorToDelete: Monitor): void {
  const monitorIndex = this.monitors.findIndex(m => m.id === monitorToDelete.id);
  if (monitorIndex !== -1) {
    this.monitors.splice(monitorIndex, 1);
    this.updateMonitors(); // Actualiza la vista después de borrar una tarjeta
    
  }
}

  openModalDetails(monitor: Monitor): void {
    this.selectedMonitor = monitor; // Almacena el monitor seleccionado
    this.isDetailsModalOpen = true; // Abre el modal de detalles
    this.updateMonitors();
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.newMonitor = { nombre: '', email: '', telefono: '' }; // Restablecer el nuevo monitor
    this.updateMonitors();
  }

  openModal(): void {
    this.isModalOpen = true;
    this.updateMonitors();
  }
  openEditModal(): void {
    this.isModalOpen = true;
    this.updateMonitors();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newMonitor = { nombre: '', email: '', telefono: '' };
    this.updateMonitors();
  }

  loadMonitorForEdit(monitor: Monitor): void {
    this.newMonitor = { ...monitor };
    this['isEditing'] = true; // Activar el modo de edición
    this.openModal();
  }

  addMonitor(): void {
    if (this['isEditing']) {
      // Estás en modo de edición
      const existingMonitor = this.monitors.find(m => m.id === this.newMonitor.id);

      if (existingMonitor) {
        // Actualiza el monitor existente
        Object.assign(existingMonitor, this.newMonitor);
        this.updateMonitors();
      }
    } else {
      // Estás en modo de adición
      // Agrega un nuevo monitor
      this.globalService.addMonitor(this.newMonitor);
      this.updateMonitors();
    }

    // Restablece el formulario y cierra el modal
    this.newMonitor = { nombre: '', email: '', telefono: '' };
    this['isEditing'] = false; // Desactivar el modo de edición
    this.closeModal();
    this.updateMonitors();
  }

  updateMonitors(): void {
    this.monitors = this.globalService.getMonitors();
    if (this.searchTerm) {
      this.filteredMonitors = this.monitors.filter(monitor => monitor.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredMonitors = this.monitors;
    }
  }
}
