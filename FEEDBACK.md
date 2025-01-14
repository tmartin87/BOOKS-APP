# Feedback

## Readme

- Vuestro proyecto no tiene un README.md. Es importante que lo incluyáis para que los usuarios puedan entender rápidamente cómo funciona vuestro proyecto y cómo pueden usarlo. Cualquier proyecto que se publique en GitHub debería tener un README.md.

## About Us

- No hay una página de About Us. Es importante que los usuarios puedan saber quiénes sois y cómo contactar con vosotras.

## App.jsx

- El archivo principal tiene una estructura impecable. Está muy bien organizado y es fácil de leer. ¡Buen trabajo!

## Pages y Components
- Queda muy clara la separación de de componentes y pages estructuralmente. Aún así, parece que hay componentes que se están utilizando como páginas enteras (tanto funcionalmente como a nivel de estilos). No es necesario crear un componente que solo tenga unos fragments y luego un único componente. 

## CSS

- El hecho de haber dividido bien los componentes y páginas hace que el css sea más fácil de mantener y leer.

- Cuidado con las convenciones del naming. En algunos casos tenemos clases que empiezan con PascalCase, en otras con camelCase y en otras con guiones o combinaciones de ambas. Es importante mantener una convención de nombres consistente para que el código sea más fácil de leer y mantener.

## Helper functions

- Muy buena idea dividir estas funciones en archivos separados. Esto ha reducido la complejidad de componentes y páginas. 

## Supabase

- El cliente de supabase está bien implementado tal y como vimos en clase. 

- Está muy bien que hayáis usado funciones en supabase. Pero esto ha elevado excesivamente la complejidad del desarrollo. Me temo que hemos dejado el principio de KIS (Keep It Simple) de lado.

## Distribución de tareas

- Por la cantidad de código aportada por cada persona del equipo, hay una clara desigualdad en la distribución de tareas. Es importante que todos los miembros del equipo aporten de manera equitativa al proyecto. Reduciendo la complejidad de algunas partes del código, se podría haber distribuido mejor el trabajo.

- Es importante que todo el equipo entienda y pueda explicar cualquier parte del código. Tengamos esto en cuenta para futuros proyectos.

- Toda esta complejidad ha hecho que dejemos de lado partes importantes como la preparación de la presentación y la documentación del proyecto (README).

## GetDataFromAPI

- La lógica de usar estas llamadas es para evitar hacerlas repetidamente. Considerad si es necesaria toda la lógica de abortar el fetch. Si guardamos los datos en Supabase, solo necesitaríamos una llamada a la API para obtener la URL de la imagen al crear un nuevo libro. Guardamos la URL en Supabase y no necesitamos más llamadas a la API.

## Conclusiones

### Glows

- La estructura y organización del proyecto es muy buena. 

- La aplicación es atrayente visualmente y tiene un diseño muy cuidado.

### Grows

- Que todos los miembros del equipo aporten de manera equitativa al proyecto.

- Es importante mantener una convención de nombres consistente para que el código sea más fácil de leer y mantener.

- Keep It Simple. Intentemos inicialmente hacer las cosas de la manera más sencilla posible. Si vemos que hay algo que se sale mucho de lo visto en clase, es posible que estemos complicando demasiado las cosas. Elijamos el camino que se adapte al nivel del grupo/clase.