# Fullstack

### Context

Build a [Hacker News](https://news.ycombinator.com/) like App but for lightning talk polling.

A lightning talk is a very short presentation lasting only a few minutes, given at a conference or a meetup etc.

Polling is often needed for the organizers to understand what is more interesting, or for people to decide what should go on stage.

### Requirements

#### User Stories

1. When a user opens the page, he/she should see a list of lighting talks submitted by the users, ordered by rating \(poll amount\).
2. If there's no lighting talk yet, there should be some description and some text to encourage the users to submit their own talks.
3. For each of the talks in the list, the user could vote it by clicking a button.
4. After voting it, the user should see an updated version of the list, eg. with new talks and new sorting order etc.
5. The users should be able to submit new lighting talks anytime. The required information is the title and description, while the system should also save the submit time and user.
6. After submitting a topic, the user should see an updated version of the list.

#### Functionality

* The frontend part should be a single page application rendered in the frontend and load data from a RESTful API \(not rendered from backend\).
* The API should follow typical RESTful API design pattern.
* Provide proper unit test.

#### Tech stack

* Use React for the frontend.
* Do not use any scaffolding tool such as `create-react-app`, or any CSS framework, but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
* Use any backend framework as you like. Use any DB for storing the data, or if you prefer, only using the memory \(with no permanent storage\) could just work.

#### Advanced requirements

_These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out._

* Make it responsive.
* Provide a form validation strategy.
* Provide an error handling strategy, such as the UI/UX, and different handling for different errors etc.
* Provide a complete user auth \(authentication/authorization/etc\) strategy, such as OAuth.
* Provide a complete logging \(when/how/etc\) strategy.
