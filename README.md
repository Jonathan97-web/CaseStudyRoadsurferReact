# Case Study - Roadsurfer

---
### [Live Site](https://jonathan97-web.github.io/casestudyreact/)

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
  2.3 Added pagination functionality based on weeks, if no bookings exist on a certain week it will be skipped to increase efficiency.  
  2.4 Calculations are created for the weeks so it shows exact dates and matches it with the API's bookings.
3. Created a Customer Modal to be able to go in and out of bookings fast.  
  3.1 I reformatted the date to YYYY-MM-DD and time to HH-MM-SS For increased readability.    
  3.2 I added the customer id and all the relevant information.  
  3.3 I created a duration which shows the exact duration in days.  
4. I reformatted the whole application to have the fetchData at the top of the application.  
  4.1 This was done to complement the 6th step.  
5. Created a context to be able to pass props directly down instead of it being all over the place.  
6. Created tests for my application, these can be seen under Testing.  
7. Add more comments to my application to increase readability.  
8. Remade the Customer Modal to a View Customer page instead that fetches the station ID and Customer ID from the API directly.  
  8.1 You can go back to the calendar gain by pressing go back.  
  8.2 It shows important details about the booking such as their id, station, start date, end date, what time they picked up their vehicle and when to return it.   
9. Remade Calendar logic to better fit with specifications.  
  9.1 Will be alerted when there are no bookings for the current week.  
  9.2 Can scroll between individual weeks.  
  9.3 Filtration between locations now changes the dates so that the first booking can be found upon first selecting location/station.  
  9.4 Start date is now from the first booking for each location.
10. Deployment and build to Github Pages.
  -- The deployed version can be found [here](https://jonathan97-web.github.io/casestudyreact/) or by pressing on the live site link in the top of the readme.

----

### Features
- Users can view bookings by clicking the view booking, the user will be redirected to the booking details page to view the booking in more detail.  
- Users can choose from a dropdown menu in the Navbar to view bookings depending on city.  
- If no bookings exists on a day, it will show no bookings found.  
- Navigate between weeks for bookings by using the previous and next week button.
- Alert when there are no more bookings to be found while scrolling between weeks for increased UX.
- The border around the navbar will go away when scrolled down to increase readability of the booking calendar when over 100vh.
- Calendar changes dates and finds the first booking upon changing location from the start.

---
### Future features

- User authentication so that only authorized people can login and view the bookings.

---

### Testing

- Manual tests:  
-- Testing for 404 Error when inputting the wrong URL  
-- Test view booking button so that it redirects to the booking details page for the specific booking that was selected.  
-- Test the dropdown menu so that it returns the correct bookings for selected city   
-- Test the navigation button function so that it navigates between weeks.  
-- Test so that the alerts pop up when they should.  

- Automated tests:
-- I wrote 4 automated tests to test the following:  
-- Created a test to render the Navbar component and sets the location to Berlin.    
-- Created a test to render the App component to make sure it renders correctly.   
-- Created a test to render the DropDownStation component, using fetchData and locations as mock data.   
-- Created a test to render the Calendar component and expects to find the previous week button and next week button.  

- These tests do not cover the entire application, but as a future feature it will.   

---


| Frameworks/Libraries  |
| -------- |
| [React](https://react.dev/) |
| [Material UI](https://mui.com/material-ui/) |
| [Tailwind CSS](https://tailwindcss.com/)    |
| [React Router](https://reactrouter.com/en/main) |
| [Axios](https://axios-http.com/)

---

### Bugs
- I noticed that there is now a 7th value in the response from the API, not sure if this was made intentionally or by an accidental post request.
