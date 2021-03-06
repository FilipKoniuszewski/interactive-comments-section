# Frontend Mentor - Interactive comments section

## Welcome! 👋

This is a solution for a [Frontend Mentor](https://www.frontendmentor.io) challenge to help me improve coding skills by building realistic projects.

## The challenge

![Design preview for the Interactive comments section coding challenge](https://user-images.githubusercontent.com/82803009/165188106-ba2c6898-5f86-42f5-92e5-96f3342142b6.jpg)

## Links

- [Solution URL](https://www.frontendmentor.io/solutions/responsive-interactive-comments-section-using-reactjs-BkD6RPNS9)
- [Live Site URL](https://filipkoniuszewski.github.io/interactive-comments-section/) 

### Built with

- React, JSX
- Hooks
- Local storage
- CSS variables
- Flexbox
- react-time-ago for Comment post date
- Figma for design

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
- You can only edit or delete your own comments and replies.


