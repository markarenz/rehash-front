# Re:Hash Frontend

## About Re:Hash
Another in a long series of projects that seem to have no discernible meaning or purpose, Re:Hash is a social media
application where users grab short phrases from classic literature and re-hash them into new posts to share with other
users. Basically, it's magnetic poetry with source material cribbed from the likes of Charles Dickens and Emily
Dickinson. 

Even though posting in Re:Hash feels like plagiarism, the posts are thoroughly cited to credit the original authors.
However, if it helps your enjoyment to pretend that using the app is something illicit, please be my guest.

## The Stack
- The frontend uses GraphQL & Apollo to communicate with the API.
- We're using some SASS for global styles but most styling uses styled-components
- Please see the Re:Hash backend repo for info on the backend stack.

## To-do's
- Profile: update email address, check for uniqueness & connect to Auth0 API to change remotely
- New Post: currently saving all data as JSON strings. This is fine, but it would be great to leverage Mongo's support for arrays of objects.
