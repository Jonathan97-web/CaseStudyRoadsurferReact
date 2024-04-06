# Case Study - Roadsurfer
----
## Welcome to the Documentation.
---

### Features
- Users can view bookings by clicking the view booking, a modal will pop up with booking information.
- Users can filter to view bookings depending on city.
- If no bookings exists on a day, it will show no bookings found.
- There are buttons for previous and next week, but they are not functional since I need to be able to filter by week from the API.

---
### Future features

- Be able to filter bookings by week.
- User authentication so that only licensed people can login and view the bookings.

---

### Testing

- Manual tests:
-- Testing for 404 Error when inputting the wrong URL
-- Test view booking button so that it shows the modal when clicked and that the user information is correct.
-- Test the dropdown menu so that it returns the correct bookings for selected city

Automated tests:
-- I wrote 3 automated tests to test the following:
-- Created a test to render the App component to make sure it renders correctly.
-- Created a test to render the calendar component, make sure it fetches locations and expects to find customer name and booking id.

---

### Bugs
- I noticed that there is now a 7th value in the response from the API, not sure if this was made intentionally or by a accidental post request.