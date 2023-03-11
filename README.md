# Fitness Bot

A web app that leads you through a workout session.

[Workout now!](https://skedwards88.github.io/fitness/)

<img src="src/images/maskable_icon_512.png" alt="bot lifting weights" width="100"/>

Do you have feedback or ideas for improvement? [Open an issue](https://github.com/skedwards88/fitness/issues/new).

Want more games? Visit [CnS Games](https://skedwards88.github.io/portfolio/).

## Development

To add a new exercise, add an entry to `src/exercises.json`. To add a motivational phrase (shown on home screen), add an entry to `motivationalPhrases.js`. To add a celebratory phrase (spoken at the end of the workout), add an entry to `celebratoryPhrases.js`.

To build, run `npm run build`.

To run locally with live reloading and no service worker, run `npm run dev`. (If a service worker was previously registered, you can unregister it in chrome developer tools: `Application` > `Service workers` > `Unregister`.)

To run locally and register the service worker, run `npm start`.

To deploy, push to `main` or manually trigger the `.github/workflows/deploy.yml` workflow.
