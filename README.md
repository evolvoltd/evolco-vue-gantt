<div align="center">
    <h2>Evolco Gantt</h2>
    <p align="center">
        <p>Modification of frappé gantt library</p>
        </a>
    </p>
</div>


### Install
```
npm install evolco-vue-gantt
```

### Usage
Include it in your HTML:
```
<script src="frappe-gantt.min.js"></script>
<link rel="stylesheet" href="frappe-gantt.css">
```

And start hacking:
```js
var tasks = [
  {
    row_id: 1, // Allows to match task/tasks with the speciffic row
    id: 'Task 1',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20, // optional 
    dependencies: 'Task 2, Task 3', // optional (needs debugging)
    custom_class: 'bar-milestone', // optional 
    draggable: false, // Disables all functionalities related to dragging (bar dragging, bar or 
    // process width adjustments) 
  },...]

var rows = [] // Required to generate multiple rows and for left_header_label and 
// left_column_label options. E.g.: rows = users = [{id:1, full_name: 'John Smith'},...]

var gantt = new Gantt("#gantt", tasks, rows);
```

You can also pass various options to the Gantt constructor:
```js
var gantt = new Gantt("#gantt", tasks, rows, {
    header_height: 50,
    column_width: 30,
    step: 24,
    view_modes: ['Hour', 'Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
    bar_height: 20,
    bar_corner_radius: 3,
    arrow_curve: 5,
    padding: 18,
    view_mode: 'Day',   
    date_format: 'YYYY-MM-DD',
    custom_popup_html: null,
    left_header_label: 'Users', 
    left_column_label: 'full_name',
    onBarClick: yourFunction, // Create your function which will be executed on bar click
    // it has access to task and event. E.g.: yourFunction(task, event) {console.log(task, event)}
});
```

If you want to contribute:

1. Clone this repo.
2. `cd` into project directory
3. Use Node.js 22.13 or newer in the 22.x series (or Node.js 24+) and npm.
4. `npm ci`
5. `npm run dev`

Use npm and commit `package-lock.json` when updating dependencies.

`npm run build` produces `dist/frappe-gantt.js` and
`dist/frappe-gantt.min.js`, both exposing the browser global `Gantt`, plus
`dist/frappe-gantt.css`. The build uses Dart Sass.

Bundler consumers continue to import `evolco-vue-gantt` from `src/index.js`,
which imports `src/gantt.scss`. Configure your application bundler with Dart
Sass to compile this stylesheet.

Run `npm test` for the date utility tests and `npm run lint` for JavaScript
checks. `npm pack` builds the distribution before packaging.

License: MIT

------------------

