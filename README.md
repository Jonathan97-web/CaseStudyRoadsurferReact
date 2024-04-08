# Case Study - Roadsurfer

---

### Steps of implementation:

- Create React App
-- Install necessary basic dependencies (React, Tailwind, Material UI) 
- Creating basic pages and components  
1. Added Dropdown into a component and implementing the logic.  
1.1 The value always start being Berlin or 1 just to populate the Dropdown and Calendar immediately.  
1.2 The dropdown is populated directly on app render.  
2. Added Calendar page with logic.  
2.1 Maps through bookings and assigns it to the current day by calculating from the date.  
2.2 Normally it starts on a Sunday but I reformatted this for the Calendar to start on a Monday instead.  
3. Created a Customer Modal to be able to go in and out of bookings fast.  
  3.1 I reformatted the date to YYYY-MM-DD and time to HH-MM-SS For increased readability.  
  3.2 I added the customer id and all the relevant information.  
  3.3 I created a duration which shows the exact duration in days.  
4. Created a basic 404 message when routed to the wrong page.  
  4.1 I noticed later that there is already a custom 404 page from Github.  
5. I reformatted the whole application to have the fetchData at the top of the application.  
5.1 This was done to complement the 6th step.  
6. created a context to be able to pass props directly down instead of it being all over the place.  
7. Created tests for my application, these can be seen under Testing.  
8. Add more comments to my application to increase readability.  


----

### Features
- Users can view bookings by clicking the view booking, the user will be redirected to the booking details page to view the booking in more detail.  
- Users can choose from a dropdown menu in the Navbar to view bookings depending on city.  
- If no bookings exists on a day, it will show no bookings found.  
- Navigate between weeks for bookings with specified dates, if there are no bookings on a certain the week will get skipped.  

---
### Future features

- User authentication so that only authorized people can login and view the bookings.

---

### Testing

- Manual tests:  
-- Testing for 404 Error when inputting the wrong URL  
-- Test view booking button so that it shows the modal when clicked and that the user information is correct.  
-- Test the dropdown menu so that it returns the correct bookings for selected city  

- Automated tests:
-- I wrote 3 automated tests to test the following:  
-- Created a test to render the Navbar component and sets the location to Berlin.  
-- Created a test to render the App component to make sure it renders correctly.  
-- Created a test to render the calendar component, make sure it fetches locations and expects to find customer name and booking id.  

- These tests do not cover the entire application, but as a future feature it will.   

---


| Frameworks/Libraries  |
| -------- |
| [React](https://react.dev/) |
| [Material UI](https://mui.com/material-ui/) |
| [Tailwind CSS](https://tailwindcss.com/)    |

---

### Bugs
- I noticed that there is now a 7th value in the response from the API, not sure if this was made intentionally or by an accidental post request.