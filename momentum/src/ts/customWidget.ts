import { t } from "./translator";

const todos: HTMLUListElement | null = document.querySelector(".todos");
const addBtn: HTMLButtonElement | null =
  document.querySelector(".todo-add-btn");
const input: HTMLInputElement | null = document.querySelector(".todo-input");

interface Todo {
  title: string;
  done: boolean;
}

export function initCustomWidget() {
  if (!todos || !input || !addBtn) {
    return;
  }

  const restoreTodos = () => {
    const jsonTodos = localStorage.getItem("todos");
    if (!jsonTodos) {
      return;
    }

    const todos: Todo[] = JSON.parse(jsonTodos);
    todos.forEach((todo) => {
      addTodo(todo);
    });
  };

  const saveTodos = () => {
    const todoElements = [...todos.children];
    const todoObjs: Todo[] = todoElements.map((elem) => {
      const checkbox: HTMLInputElement | null = elem.querySelector(
        "input[type='checkbox']"
      );
      const label: HTMLLabelElement | null = elem.querySelector("label");
      return {
        title: label ? String(label.textContent) : "null",
        done: checkbox ? checkbox.checked : false,
      };
    });

    localStorage.setItem("todos", JSON.stringify(todoObjs));
  };

  const addTodo = (todoObj: Todo) => {
    const todosAmount = todos.childElementCount;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-ch");
    checkbox.id = `todo-ch${todosAmount}`;
    checkbox.checked = todoObj.done;
    checkbox.onchange = () => {
      saveTodos();
    }

    const todoTitle = document.createElement("label");
    todoTitle.setAttribute("for", `todo-ch${todosAmount}`);
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = todoObj.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo-remove-btn");
    deleteBtn.textContent = "x";
    deleteBtn.onclick = () => {
      deleteBtn.parentElement?.remove();
      saveTodos();
    };
    const todo = document.createElement("li");
    todo.classList.add("todo");
    todo.append(checkbox);
    todo.append(todoTitle);
    todo.append(deleteBtn);

    todos.append(todo);
  };

  const onAddBtnClicked = () => {
    const title = input.value.trim();
    input.value = "";
    if (title) {
      addTodo({ title: title, done: false });
      saveTodos();
    }
  };

  restoreTodos();
  input.setAttribute("placeholder", t("custom.placeholder"));
  addBtn.addEventListener("click", onAddBtnClicked);

  return {
    finalize: () => {
      addBtn.removeEventListener("click", onAddBtnClicked);
    },
  };
}
