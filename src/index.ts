import { stringify, v4 as uuidV4 } from 'uuid';
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector('#new-task-form') as HTMLElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-input');
type Task = {
	id: string
	title: string 
	completed: boolean
	createdAt: Date
}
const tasks: Task[] = loadtask()

tasks.forEach(addItem)
form?.addEventListener("submit", e => {
	e.preventDefault()
	if (input?.value === "" || input?.value === null) return 
	const newTask : Task = {
		id:uuidV4(),
		title: input.value,
		completed: false,
		createdAt:new Date()
	}
	tasks.push(newTask)
	addItem(newTask);
	input.value = ""
})
function addItem(task:Task
) {
	const item = document.createElement('li')
	const label = document.createElement('label')
	const checkbox = document.createElement('input')
	checkbox.addEventListener("change", ()=> {
		task.completed = checkbox.checked
		saveTask()
	})
	checkbox.type = 'checkbox'
	checkbox.checked=task.completed
	label.append(checkbox, task.title)
	item.append(label)
	list?.append(item)
	
}
function saveTask (){
	localStorage.setItem('TASKS', JSON.stringify(tasks))
}
function loadtask() : Task[] {
	const taskjson = localStorage.getItem("TASKS")
	if (taskjson === null) return []
	 return JSON.parse(taskjson)
}