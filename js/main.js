function createElemWithText(element = "p", text = "", className) {
  const theElement = document.createElement(`${element}`);
  theElement.textContent = text;
  if (className) {
    theElement.classList.add(className);
  }
  return theElement;
}

const createSelectOptions = (users) => {
  if (!users) {
    return;
  }
  const optionElements = [];
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    optionElements.push(option);
  });
  return optionElements;
};

const toggleCommentSection = (postId) => {
  if (!postId) {
    return;
  }
  const commentSection = document.querySelector(
    `section[data-post-id="${postId}"]`
  );
  if (commentSection === null) {
    return null;
  }
  commentSection.classList.toggle("hide");
  return commentSection;
};

const toggleCommentButton = (postId) => {
  if (!postId) {
    return;
  }
  const button = document.querySelector(`button[data-post-id="${postId}"]`);
  if (button === null) {
    return null;
  }
  if (button.textContent === "Show Comments") {
    button.textContent = "Hide Comments";
  } else {
    button.textContent = "Show Comments";
  }
  return button;
};

const deleteChildElements = (parentElement) => {
  if (!parentElement?.tagName) {
    return;
  }
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
  return parentElement;
};

const addButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");
  if (buttons) {
    buttons.forEach((button) => {
      const postId = button.dataset.postId;
      button.addEventListener("click", function (event) {
        toggleComments(event, postId);
      });
      return button;
    });
    return buttons;
  }
};

const removeButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");
  if (buttons) {
    buttons.forEach((button) => {
      const postId = button.dataset.postId;
      button.removeEventListener("click", function (event) {
        toggleCommentSection(event, postId);
      });
      return button;
    });
    return buttons;
  }
};

const createComments = (comments) => {
  if (!comments) {
    return;
  }
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const articleElement = document.createElement("article");
    const h3Element = createElemWithText("h3", comment.name);
    const paragraphElement = createElemWithText("p", comment.body);
    const paragraphElement2 = createElemWithText("p", `From: ${comment.email}`);
    articleElement.append(h3Element, paragraphElement, paragraphElement2);
    fragment.append(articleElement);
  });
  return fragment;
};

const populateSelectMenu = (users) => {
  if (!users) {
    return;
  }
  const selectMenu = document.getElementById("selectMenu");
  const options = createSelectOptions(users);
  options.forEach((option) => {
    selectMenu.append(option);
  });
  return selectMenu;
};

const getUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error.stack);
  }
};

const toggleComments = (event, postId) => {
  if (!event || !postId) {
    return;
  }
  const array = [];
  event.target.listener = true;
  const sectionElement = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  array.push(sectionElement, button);
  return array;
};
