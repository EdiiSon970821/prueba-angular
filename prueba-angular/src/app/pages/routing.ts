import { Routes } from '@angular/router';

const Routing: Routes = [
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
        path: 'proyectos',
        loadChildren: () => import('./proyecto/proyecto.module').then((m) => m.ProyectoModule),
    },
    {
        path: 'tareas',
        loadChildren: () => import('./tareas/tareas.module').then((m) => m.TareasModule),
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    }
];

export { Routing };