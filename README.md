# Student-Course-Scheduler
This is a web application designed to help users build their academic schedule by selecting courses, entering credits for variable credit courses, and resolving scheduling conflicts. It checks for time overlaps and ensures that the total credit hours remain within an acceptable range.

The application is built using Builder Design Pattern.

## Features

- **Add Courses**: You can add courses to your schedule from a predefined list.
- **Variable Credits**: Courses can have a fixed or variable credit range. Users are prompted to select the appropriate number of credits if necessary.
- **Conflict Detection**: The app checks for overlapping class times to prevent conflicts in your schedule.
- **Credit Check**: Ensures that the total number of credits is between 16 and 22.
- **Timetable Display**: Once the schedule is built, the application displays the selected courses in a tabular format.

## How to Use

### 1. List Available Courses
Upon loading the page, a list of courses will be displayed. Each course will show:
- Title
- Instructor
- Credit range
- Class timings

### 2. Select Courses
Check the box next to the courses you want to add to your schedule. For courses with variable credits, you must input the number of credits you'd like to take.

### 3. Build Schedule
Once you've selected your courses, click on the "Submit Courses" button. The application will:
- Ensure that your total credits are within the required range (16–22 credits).
- Check for scheduling conflicts between the selected courses.

If the schedule is valid, it will be displayed as a table on the page.

### 4. Resolving Errors
- **Credit Validation**: If the entered credits for a course are outside the allowable range, an alert will prompt you to correct it.
- **Conflict Detection**: If there are time conflicts between selected courses, you will be notified to resolve them.

## Components

### Schedule Class
Handles the core functionality of storing and managing the list of courses, calculating total credits, and checking for time conflicts.

### Course Class
Defines each course with attributes such as title, instructor, credits, and schedule. It also provides methods to set credits and schedule.

### ScheduleBuilder Class
Acts as the interface between the user's course selections and the `Schedule` class. It builds the schedule, checks for conflicts, and displays the final timetable.

## Demo

You can see a demo of this app by opening `index.html` in your browser. The course list is generated on page load, and the user can interact with the form to create their schedule.
