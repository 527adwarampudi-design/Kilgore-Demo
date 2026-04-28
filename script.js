let tasks = []
let completed = []

// ADD TASK
function addTask() {
  let input = document.getElementById('taskInput')
  let task = input.value.trim()

  if (task) {
    tasks.push(task)
    completed.push(false)

    input.value = ''
    displayTasks()
    input.focus()
  }
}

// BUTTON CLICK
document.getElementById('addTaskBtn').addEventListener('click', addTask)

// ENTER KEY
document.getElementById('taskInput').addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    addTask()
  }
})

// DISPLAY TASKS
function displayTasks() {
  let list = document.getElementById('taskList')
  list.innerHTML = ''

  tasks.forEach((task, index) => {
    let li = document.createElement('li')
    li.className = "list-group-item d-flex justify-content-between align-items-center"

    if (completed[index]) {
      li.classList.add('completed')
    }

    // TEXT (clickable)
    let span = document.createElement('span')
    span.textContent = task
    span.style.cursor = "pointer"

    span.onclick = function () {
      toggleComplete(index)
    }

    // ✔ BUTTON
    let btn = document.createElement('button')
    btn.textContent = "✔"
    btn.className = "btn btn-success btn-sm"

    btn.onclick = function (e) {
      e.stopPropagation()
      toggleComplete(index)
    }

    // Clicking anywhere on the task row also toggles completion
    li.onclick = function (e) {
      if (e.target !== btn) {
        toggleComplete(index)
      }
    }

    li.appendChild(span)
    li.appendChild(btn)
    list.appendChild(li)
  })

  updateCounters()
}

// TOGGLE COMPLETE
function toggleComplete(index) {
  const willComplete = !completed[index]
  completed[index] = willComplete
  displayTasks()

  if (willComplete) {
    fireConfetti()
  }
}

// CONFETTI EFFECT
function fireConfetti() {
  const colors = ['#F7C9C0', '#FBE8A6', '#B2D6A1', '#79A6A0', '#4F6F52']
  const container = document.getElementById('confetti-container')

  for (let i = 0; i < 35; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti-piece'
    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.width = `${Math.random() * 8 + 6}px`
    confetti.style.height = `${Math.random() * 5 + 8}px`
    confetti.style.opacity = `${Math.random() * 0.4 + 0.7}`
    confetti.style.setProperty('--duration', `${Math.random() * 0.8 + 1.4}s`)

    container.appendChild(confetti)
    setTimeout(() => confetti.remove(), 2200)
  }
}

// CLEAR ALL
document.getElementById('clearTasksBtn').addEventListener('click', function () {
  tasks = []
  completed = []
  displayTasks()
})

// UPDATE COUNTERS
function updateCounters() {
  document.getElementById('taskCounter').textContent =
    "Tasks: " + tasks.length

  let done = completed.filter(c => c).length

  document.getElementById('completedCounter').textContent =
    "Completed: " + done
}