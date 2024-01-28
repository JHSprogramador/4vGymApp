# Proyecto de Monitores - README

Este es un proyecto de gestión de monitores desarrollado con Angular, Tailwind CSS y Angular Material. Permite agregar, editar, eliminar y ver detalles de monitores de una manera sencilla y atractiva.

## Requisitos Previos

Asegúrate de tener instalados los siguientes elementos antes de ejecutar el proyecto:

1. **Node.js y npm**: Descarga e instala Node.js y npm desde [https://nodejs.org/](https://nodejs.org/)

2. **Angular CLI**: Instala Angular CLI globalmente ejecutando el siguiente comando en tu terminal:

    ```bash
    npm install -g @angular/cli
    ```

3. **Tailwind CSS**: Este proyecto utiliza Tailwind CSS para el diseño. Instala Tailwind ejecutando:

    ```bash
    npm install -D tailwindcss
    ```

    Después, genera el archivo de configuración de Tailwind ejecutando:

    ```bash
    npx tailwindcss init
    ```

4. **Angular Material**: Instala Angular Material ejecutando:

    ```bash
    ng add @angular/material
    ```

## Pasos para Ejecutar el Proyecto

1. **Clona el Repositorio:**

    ```bash
    git clone https://tu-repositorio.git
    cd nombre-del-proyecto
    ```

2. **Instala las Dependencias:**

    ```bash
    npm install
    ```

3. **Compila y Sirve la Aplicación:**

    ```bash
    ng serve
    ```
4. **Si no se ejecuta corectamente y da un error de que no permite por algun problema de permisos utiliza este comando:**

    ```bash
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 
    ```

    Abre tu navegador y visita [http://localhost:4200/](http://localhost:4200/)

## Comandos Adicionales

- **Compilar para Producción:**

    ```bash
    ng build --prod
    ```

    Los archivos compilados estarán en el directorio `dist/`.

- **Ejecutar Pruebas Unitarias:**

    ```bash
    ng test
    ```

- **Generar Documentación de Código:**

    ```bash
    compodoc -p tsconfig.json
    ```

    La documentación se generará en el directorio `documentation/`.

## Estructura del Proyecto

- **`src/app/`**: Contiene los componentes, servicios y otros recursos de la aplicación.
- **`src/assets/`**: Archivos estáticos como imágenes y estilos adicionales.
- **`src/environments/`**: Configuraciones de entorno para desarrollo y producción.

## Características Principales

- **Gestión de Monitores**: Agrega, edita, elimina y visualiza detalles de monitores.
- **Interfaz Atractiva**: Utiliza Tailwind CSS y Angular Material para una interfaz moderna y responsive.
- **Slider de Monitores**: Muestra los monitores en un slider interactivo.
- **Búsqueda Rápida**: Filtra los monitores por nombre de manera instantánea.
- **Modales Intuitivos**: Modales separados para agregar y editar monitores.

¡Disfruta gestionando tus monitores con esta aplicación! Si tienes alguna pregunta o problema, no dudes en crear un issue en el repositorio o contactar al equipo de desarrollo.
