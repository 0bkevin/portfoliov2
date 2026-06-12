import html from '../assets/econ-simulacion.html?raw';

export const prerender = true;

export function GET() {
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

export function HEAD() {
  return new Response(null, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
