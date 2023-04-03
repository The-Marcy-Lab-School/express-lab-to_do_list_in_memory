# To Do List - In Memory
CRUD App With Real File Structure

- [To Do List - In Memory](#to-do-list---in-memory)
  - [Starter Code](#starter-code)
  - [Project Goals](#project-goals)
- [Question 1: List all `To Dos`](#question-1-list-all-to-dos)
- [Question 2: Create a `To Do`](#question-2-create-a-to-do)
- [Question 3: Mark a `To Do` Complete (or not complete)](#question-3-mark-a-to-do-complete-or-not-complete)
- [Question 4: Delete a `To Do`](#question-4-delete-a-to-do)
- [Bonus: Get a single `To Do`](#bonus-get-a-single-to-do)


You are going to make a `To Do` list app using the CRUD actions.

- Create = Create a new `To Do`
- Read = List out all the existing `To Dos`
- Update = Mark a `To Do` as complete
- Delete = Remove a `To Do` item from your list completely

## Starter Code
We have provided the following for you:
- A full test suite for all of the above actions
- A `ToDo` model with all the CRUD actions
- A front end where you can visually test your actions

This app doesn't use *all* the `REST` routes, but those that do exist will match the `REST` conventions you've learned.

## Project Goals
You have already made a CRUD app, so the goal of this assignment is:

 > Enhance a CRUD app with a realistic file structures, primarily relying on tests for guidance.

In Express there are *many* ways to structure an app, this is Marcy's. While you're here, we want you to get comfortable with this configuration before branching out into more complex structures.

Now, unlike the last assignment, we're not going to be as explicit in our instructions. We'll explain the basics of what we want, but for *exact* details you can check the tests (or play around with the frontend).

Use what you learned this week, start in `package.json` and start reading the code! When you're ready, run `npm i` and `npm start` (or `npm run test:w` for repeated testing)

> Still no DB yet, so our data will only persist as long as our server is running!

# Question 1: List all `To Dos`
We should be able to hit `GET /api/to-dos` and see all our `To Dos`.

# Question 2: Create a `To Do`
We should be able to hit `POST /api/to-dos` and create a new `To Do`. The request body should just be:

```json
{ "title": "Go to the store" }
```

And the response should be:
```json
{
  "id": 1,
  "title": "Go to the store",
  "isDone": false
}
```

# Question 3: Mark a `To Do` Complete (or not complete)
If we hit `PATCH /api/to-dos/3` with this body:

```json
{ "isDone": true }
```

We would expect to get the *full* `To Do` item back in a response with the updated attribute. If there wasn't a `To Do` with that id, we'd just get back a 404.

If we want to uncheck a `To Do` then we'd hit the same route, but with `isDone` being `false` instead.

# Question 4: Delete a `To Do`
Unlike completion, which just renders a crossed out `To Do`, `DELETE /api/to-dos/2` would *totally* remove the `To Do` item from our list.

# Bonus: Get a single `To Do`
If you have perfect test completions, try adding one more route. There won't be a frontend GUI for it, but try making a `GET /api/to-dos/:id` route. It should return a `To Do`, or return a `404`.
