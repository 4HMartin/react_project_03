# Calorie Tracker
---
## Project description

## Tech stack + libraries
**uuid**
Generar identificadores únicos.
    `npm i uuid`
    `npm i --save-dev @types/uuid`
    `import { v4 as uuidv4 } from 'uuid'`

**heroicons**
Iconos de hero icons.
    `npm i @heroicons/react`

## Hooks used

#### useState

#### useReducer
useReducer es un Hook de React que te permite agregar un reducer a tu componente.

El hook useReducer en React es una alternativa a use State que se utiliza para manejar estados más complejos y transiciones de estado que involucran lógica más complicada. Mientras que use State es perfecto para el manejo de estados simples. useReducer es más adecuado para situaciones donde el nuevo estado depende del estado anterior o cuando hay múltiples sub-valores o lógica condicional a considerar.

- **activity-reducer.ts**
    Al no contar con un state global se debe importar en App.tsx y pasarlo vía props, importando el hook 'useReducer'.<br><br>

    Por ejemplo, la lógica de la acción de guardar una nueva actividad desde el formulario se maneja en el reducer si el tipo de actividad coincide con el tipo definido en las acciones del activityReducer para "save-activity".

#### useMemo
useMemo will only recompute the memoized value when one of the deps has changed.

## Methods and experience gains

- Manejo del estado para un formulario dinámico sin uso de librerias externas.
- Inferir tipos de datos para los eventos relacionados al formulario.