class Schedule {
    constructor() {
        this.courses = [];
    }

    addCourse(course) {
        this.courses.push(course);
    }

    getSchedule() {
        let schedule = "";
        this.courses.forEach(course => {
            schedule += `${course.getDetails()} - ${course.getSchedule()}\n`;
        });
        return schedule;
    }

    getTotalCredits() {
        let totalCredits = 0;
        this.courses.forEach(course => {
            totalCredits += course.credits;
        });
        return totalCredits;
    }

    checkCredits() {
        let totalCredits = this.getTotalCredits();
        let maxCredits = 22;
        let minCredits = 16;
        return totalCredits >= minCredits && totalCredits <= maxCredits;
    }

    checkClassConflict() {
        let schedule = [];
        this.courses.forEach(course => {
            schedule.push(course.getSchedule());
        });
        for (let i = 0; i < schedule.length; i++) {
            for (let j = i + 1; j < schedule.length; j++) {
                let time1 = schedule[i].split(" - ");
                let time2 = schedule[j].split(" - ");
                if ((time1[0] >= time2[0] && time1[0] <= time2[1]) || (time1[1] >= time2[0] && time1[1] <= time2[1])) {
                    return true;
                }
            }
        }
        return false;
    }
}

class Course {
    constructor(title, instructor) {
        this.title = title;
        this.instructor = instructor;
        this.maxCredits = null;
        this.minCredits = null;
        this.credits = null;
        this.startTime = null;
        this.endTime = null;
    }

    setCredits(minCredits, maxCredits) {
        this.minCredits = minCredits;
        this.maxCredits = maxCredits;
    }

    setSchedule(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    getDetails() {
        return `${this.title} - ${this.instructor} ${this.minCredits} - ${this.maxCredits} ${this.startTime} - ${this.endTime}`;
    }

    getSchedule() {
        return `${this.startTime} - ${this.endTime}`;
    }
}

class ScheduleBuilder {
    constructor() {
        this.schedule = new Schedule();
    }

    addCourse(course) {
        this.schedule.addCourse(course);
    }

    build() {
        if (!this.schedule.checkCredits()) {
            alert("Total credits must be between 16 and 22.");
            return false;
        }
        if (this.schedule.checkClassConflict()) {
            alert("There is a class conflict in your schedule.");
            return false;
        }
        return true;
    }

    printTimetable() {
        let timetableElement = document.getElementById("timetable");
        timetableElement.innerHTML = `<h3>Timetable:</h3>`;
        
        let table = document.createElement("table");
        table.style.width = "100%";

        let thead = document.createElement("thead");
        let headerRow = document.createElement("tr");

        let headers = ["Course Title", "Instructor", "Schedule", "Credits"];
        headers.forEach(headerText => {
            let th = document.createElement("th");
            th.appendChild(document.createTextNode(headerText));
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement("tbody");

        this.printCourseInTimetable(tbody);

        table.appendChild(tbody);
        timetableElement.appendChild(table);
    }

    printCourseInTimetable(tbody) {
        this.schedule.courses.forEach(course => {
            let row = document.createElement("tr");

            let titleCell = document.createElement("td");
            titleCell.appendChild(document.createTextNode(course.title));
            row.appendChild(titleCell);

            let instructorCell = document.createElement("td");
            instructorCell.appendChild(document.createTextNode(course.instructor));
            row.appendChild(instructorCell);

            let scheduleCell = document.createElement("td");
            scheduleCell.appendChild(document.createTextNode(`${course.startTime} - ${course.endTime}`));
            row.appendChild(scheduleCell);

            let creditsCell = document.createElement("td");
            creditsCell.appendChild(document.createTextNode(course.credits));
            row.appendChild(creditsCell);

            tbody.appendChild(row);
        });
    }
}

function listCourses() {
    let course1 = new Course("CS101", "Mr. A");
    course1.setCredits(5, 5);
    course1.setSchedule("8:00", "8:50");

    let course2 = new Course("CS201", "Mr. B");
    course2.setCredits(3, 4);
    course2.setSchedule("8:00", "9:50");

    let course3 = new Course("CS203", "Mr. C");
    course3.setCredits(6, 8);
    course3.setSchedule("10:00", "10:50");

    let course4 = new Course("CS401", "Mr. D");
    course4.setCredits(4, 6);
    course4.setSchedule("11:00", "11:50");

    let course5 = new Course("CS601", "Mr. E");
    course5.setCredits(6, 6);
    course5.setSchedule("12:00", "12:50");

    let course6 = new Course("CS701", "Mr. F");
    course6.setCredits(3, 5);
    course6.setSchedule("1:00", "1:50");

    displayCourse(course1, "course1");
    displayCourse(course2, "course2");
    displayCourse(course3, "course3");
    displayCourse(course4, "course4");
    displayCourse(course5, "course5");
    displayCourse(course6, "course6");
}

function displayCourse(course, id) {
    let creditsCellContent;
    if (course.minCredits === course.maxCredits) {
        creditsCellContent = `<span>${course.minCredits}</span>`;
    } else {
        creditsCellContent = `<input type="number" id="${id}cred" name="${id}cred" min="${course.minCredits}" max="${course.maxCredits}">`;
    }

    document.getElementById(id).innerHTML = `
        <td><input type="checkbox" id="${id}select"></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td>${course.maxCredits}</td>
        <td>${course.minCredits}</td>
        <td>${course.startTime} - ${course.endTime}</td>
        <td>${creditsCellContent}</td>
    `;

    if (course.minCredits !== course.maxCredits) {
        document.getElementById(`${id}cred`).addEventListener('input', function() {
            document.getElementById(`${id}select`).checked = true;
        });
    }

    document.getElementById(`${id}select`).addEventListener('change', function() {
        if (!this.checked && course.minCredits !== course.maxCredits) {
            document.getElementById(`${id}cred`).value = '';
        }
    });
}

function submitCourses() {
    let timetableElement = document.getElementById("timetable");
    timetableElement.innerHTML = "";

    let builder = new ScheduleBuilder();

    for (let i = 1; i <= 6; i++) {
        if (document.getElementById(`course${i}select`).checked) {
            let course = new Course(
                document.getElementById(`course${i}`).children[1].innerText,
                document.getElementById(`course${i}`).children[2].innerText
            );
            course.setCredits(
                parseInt(document.getElementById(`course${i}`).children[4].innerText),
                parseInt(document.getElementById(`course${i}`).children[3].innerText)
            );
            course.setSchedule(
                document.getElementById(`course${i}`).children[5].innerText.split(" - ")[0],
                document.getElementById(`course${i}`).children[5].innerText.split(" - ")[1]
            );

            if (course.minCredits === course.maxCredits) {
                course.credits = course.minCredits;
            } else {
                let creditsInput = document.getElementById(`course${i}cred`);
                let enteredCredits = creditsInput.value ? parseInt(creditsInput.value) : null;
                if (enteredCredits === null) {
                    alert(`Please enter credits for ${course.title}.`);
                    return;
                }
                if (enteredCredits < course.minCredits || enteredCredits > course.maxCredits) {
                    alert(`Credits for ${course.title} must be between ${course.minCredits} and ${course.maxCredits}.`);
                    return;
                }
                course.credits = enteredCredits;
            }

            builder.addCourse(course);
        }
    }

    if (builder.build()) {
        builder.printTimetable();
    }
}

window.submitCourses = submitCourses;
listCourses();