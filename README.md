# 🥗 Calorie Tracker - React.js
🌐*[calorie-tracker.4hmartin.com](https://calorie-tracker.4hmartin.com/)*
---
## Description

This project is a simple web application built with **React.js** that allows users to track their calorie intake and expenditure throughout the day. Through a main form, users can register different activities, whether they are meals or exercises, and view a summary of their calorie balance.

## Features

✅ Form to register activities with the following fields:
- **Category:** Dropdown to select between _Meal_ or _Exercise_.
- **Activity:** Text field to describe the specific meal or exercise.
- **Calories:** Numeric field to enter the corresponding calories (positive or negative depending on the category).

✅ Calorie summary banner that displays:
- **Calories Consumed:** Total calories ingested through meals.
- **Calories Burned:** Total calories burned through exercises.
- **Difference:** Balance between calories consumed and burned, allowing users to see if there is a calorie deficit.

✅ Dynamic list of activities:
- Each activity is displayed as a **card** with its information.
- Activities can be **edited**, loading the information into the form for modification.
- Activities can be **deleted**.
- The calorie summary updates automatically after changes, thanks to efficient state management.

✅ **Data persistence** using **Local Storage**, ensuring information is not lost when the page is reloaded.

✅ Focus on learning and applying the **`useReducer`** hook, responsible for efficiently managing all state logic related to activities.

## Technologies

- ⚛️ **React.js**
- 🛠️ **useReducer** for advanced state management
- 💾 **Local Storage** for client-side data persistence

## Libraries
- **uuid**
    Generate unique identifiers.
        `npm i uuid`
        `npm i --save-dev @types/uuid`
        `import { v4 as uuidv4 } from 'uuid'`

- **heroicons**
    Icons from hero icons.
        `npm i @heroicons/react`

## 🛠️ React Hooks Used

### useState

The `useState` hook is used to manage simple, local state within components, ideal for basic form fields or UI toggles.

---

### useReducer

`useReducer` is a React Hook that provides an alternative to `useState` for managing more complex state logic. It is particularly useful when:

- The new state depends on the previous state.
- The state consists of multiple sub-values.
- Complex state transitions or conditional logic are required.

In this project, `useReducer` is used to handle all logic related to activity management.

**Reducer Location:**  
`activity-reducer.ts`

Since this project does not implement global state management, the reducer is imported into `App.tsx` and passed down to child components via props. The `useReducer` hook initializes and provides the state and dispatch functions.

**Example:**  
The logic for saving a new activity from the form is handled inside the reducer, specifically in the `save-activity` action.

**Defined Actions:**

```ts
export type ActivityActions =
  | { type: 'save-activity', payload: { newActivity: Activity } }   // Create or update an activity
  | { type: 'set-activeId', payload: { id: Activity['id'] } }      // Set active activity for editing
  | { type: 'delete-activity', payload: { id: Activity['id'] } }   // Delete an activity
  | { type: 'restart-app' }                                        // Reset the app
```

---

### useMemo

`useMemo` is a performance optimization hook that memoizes the result of an expensive calculation. The memoized value is recomputed only when one of its dependencies changes.

In this project, `useMemo` is used to efficiently calculate calorie-related statistics based on the list of activities.

**Location:**  
`CalorieTracker.tsx`

**Example:**

```ts
// Total calories consumed (meals)
const caloriesConsumed = useMemo(() =>
  activities.reduce((total, activity) =>
    activity.category === 1 ? total + activity.calories : total, 0),
  [activities]
);

// Total calories burned (exercises)
const caloriesBurned = useMemo(() =>
  activities.reduce((total, activity) =>
    activity.category === 2 ? total + activity.calories : total, 0),
  [activities]
);

// Net calorie difference
const netCalories = useMemo(() =>
  caloriesConsumed - caloriesBurned,
  [activities]
);
```

---

## 🚀 Key Learning Outcomes

- Practical implementation of the **`useReducer`** hook to manage complex state logic.
- Handling dynamic forms and state updates without relying on external state management libraries.
- Type-safe management of form events and actions using **TypeScript**.
- Application of `useMemo` to optimize performance in real-time calculations.