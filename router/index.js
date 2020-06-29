import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions || createDefaultRouter(ssrContext).options;
  const hostname = ssrContext ? ssrContext.req.headers.host : location.host;

  // console.log(options.routes);
  return new Router({
    ...options,
    routes: fixRoutes(options.routes, hostname),
  });
}

function fixRoutes(defaultRoutes, hostname) {
  if (hostname.includes('subdomain1')) return subdomain1Routes(defaultRoutes);
  if (hostname.includes('subdomain2')) return subdomain2Routes(defaultRoutes);
  return nubisoftRoutes(defaultRoutes);
}

function nubisoftRoutes(defaultRoutes) {
  return defaultRoutes.filter(r => r.name !== 'subdomain1' && 'subdomain2');
}

function subdomain1Routes(defaultRoutes) {
  const route = defaultRoutes.find(r => r.name === 'subdomain1');
  route.path = '/';
  return [route];
}

function subdomain2Routes(defaultRoutes) {
  const route = defaultRoutes.find(r => r.name === 'subdomain2');
  route.path = '/';
  return [route];
}
