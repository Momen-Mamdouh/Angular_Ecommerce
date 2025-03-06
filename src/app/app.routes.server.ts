import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'shop/:shopCategory',
    renderMode: RenderMode.Client
  },

  {
    path: 'details/:id',
    renderMode: RenderMode.Client
  },

  {
    path: 'checkOut/:cartId',
    renderMode: RenderMode.Client
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
