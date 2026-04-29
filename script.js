// ===============================
// ARRAYS TO STORE DATA
// ===============================

// This array stores the actual task text (like "Do homework")
let tasks = []

// This array stores whether each task is completed (true/false)
// Example: [false, true, false]
let completed = []


// ===============================
// ADD TASK FUNCTION
// ===============================

function addTask() {

  // Get the input box element
  let input = document.getElementById('taskInput')

  // Get the text the user typed, and remove extra spaces
  let task = input.value.trim()

  // Only add the task if it's NOT empty
  if (task) {

    // Add the task text to the tasks array
    tasks.push(task)

    // Add "false" to completed array (new task = not done yet)
    completed.push(false)

    // Clear the input box
    input.value = ''

    // Update the list on the screen
    displayTasks()

    // Put cursor back into input box
    input.focus()
  }
}


// ===============================
// BUTTON CLICK EVENT
// ===============================

// When the "Add" button is clicked → run addTask()
document.getElementById('addTaskBtn').addEventListener('click', addTask)


// ===============================
// ENTER KEY EVENT
// ===============================

// When user presses a key inside input box
document.getElementById('taskInput').addEventListener('keydown', function (e) {

  // If the key pressed is Enter
  if (e.key === "Enter") {

    // Add the task
    addTask()
  }
})


// ===============================
// DISPLAY TASKS ON SCREEN
// ===============================

function displayTasks() {

  // Get the <ul> where tasks will be shown
  let list = document.getElementById('taskList')

  // Clear the current list (so we can redraw it fresh)
  list.innerHTML = ''

  // Loop through every task in the tasks array
  tasks.forEach((task, index) => {

    // Create a new <li> element
    let li = document.createElement('li')

    // Add Bootstrap classes for styling
    li.className = "list-group-item d-flex justify-content-between align-items-center"

    // If this task is completed (true)
    if (completed[index]) {

      // Add "completed" class (adds strike-through via CSS)
      li.classList.add('completed')
    }

    // Create a span to hold the task text
    let span = document.createElement('span')

    // Set the text of the span to the task
    span.textContent = task

    // Create the ✔ button
    let btn = document.createElement('button')

    // Set button text
    btn.textContent = "✔"

    // Add Bootstrap styling to the button
    btn.className = "btn btn-success btn-sm"

    // When button is clicked
    btn.onclick = function (e) {

      // Prevent click from triggering the li click
      e.stopPropagation()

      // Toggle completion (done/undone)
      toggleComplete(index)
    }

    // When clicking anywhere on the task row
    li.onclick = function () {

      // Toggle completion
      toggleComplete(index)
    }

    // Add the span (text) to the li
    li.appendChild(span)

    // Add the button to the li
    li.appendChild(btn)

    // Add the li to the list in HTML
    list.appendChild(li)
  })

  // Update the task counters
  updateCounters()
}


// ===============================
// TOGGLE COMPLETE FUNCTION
// ===============================

function toggleComplete(index) {

  // Check what the new state will be (opposite of current)
  const willComplete = !completed[index]

  // Flip the value (false → true OR true → false)
  completed[index] = willComplete

  // Update the display
  displayTasks()

  // If the task was just marked as completed
  if (willComplete) {

    // Show confetti 🎉
    fireConfetti()
  }
}


// ===============================
// CONFETTI FUNCTION
// ===============================

function fireConfetti() {

  // Different colors for confetti pieces
  const colors = ['#F7C9C0', '#FBE8A6', '#B2D6A1', '#79A6A0', '#4F6F52']

  // Get the container div
  const container = document.getElementById('confetti-container')

  // Create 30 confetti pieces
  for (let i = 0; i < 30; i++) {

    // Create a new div
    const confetti = document.createElement('div')

    // Add class for styling
    confetti.className = 'confetti-piece'

    // Random horizontal position
    confetti.style.left = Math.random() * 100 + '%'

    // Random color
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

    // Random width
    confetti.style.width = Math.random() * 8 + 6 + 'px'

    // Random height
    confetti.style.height = Math.random() * 5 + 8 + 'px'

    // Random animation duration
    confetti.style.setProperty('--duration', (Math.random() * 0.8 + 1.4) + 's')

    // Add to page
    container.appendChild(confetti)

    // Remove after animation ends
    setTimeout(() => confetti.remove(), 2000)
  }
}


// ===============================
// CLEAR ALL TASKS
// ===============================

// When "Clear All" button is clicked
document.getElementById('clearTasksBtn').addEventListener('click', function () {

  // Empty both arrays
  tasks = []
  completed = []

  // Update display
  displayTasks()
})


// ===============================
// UPDATE COUNTERS
// ===============================

function updateCounters() {

  // Show total number of tasks
  document.getElementById('taskCounter').textContent =
    "Tasks: " + tasks.length

  // Count how many tasks are completed (true values)
  let done = completed.filter(c => c).length

  // Show completed count
  document.getElementById('completedCounter').textContent =
    "Completed: " + done
}