// Define an array to store tasks
let tasks: string[] = [];

// Function to add a task
function addTask(task: string): void {
  if (task.trim() !== "") {
    tasks.push(task);
    console.log(`Task added: "${task}"`);
  } else {
    console.log("Task cannot be empty.");
  }
}

// Function to remove a task by name
function removeTask(task: string): void {
  let found = false;

  // Loop through tasks using for loop
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].toLowerCase() === task.toLowerCase()) {
      tasks.splice(i, 1); // remove task
      console.log(`Task removed: "${task}"`);
      found = true;
      break; // exit loop once task is found
    }
  }

  // Conditional check if task was not found
  if (!found) {
    console.log(`Task "${task}" not found.`);
  }
}

// Function to display all tasks
function displayTasks(): void {
  if (tasks.length === 0) {
    console.log("📭 No tasks available.");
  } else {
    console.log("\n📋 Task List:");
    // Loop through tasks using for…of loop
    for (const task of tasks) {
      console.log(`- ${task}`);
    }
  }
}

// --- Test the program ---
addTask("Buy groceries");
addTask("Finish TypeScript homework");
addTask("Go for a walk");
displayTasks();
removeTask("Go for a walk");
removeTask("Clean the room");
displayTasks();
