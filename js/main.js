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
  if (commentSection) {
    commentSection.classList.toggle("hide");
  }
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
    const requestedUserData = await response.json();
    return requestedUserData;
  } catch (error) {
    console.error(error.stack);
  }
};

const getUserPosts = async (userId) => {
  if (!userId) {
    return;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const requestedUserDataPost = await response.json();
    return requestedUserDataPost;
  } catch (error) {
    console.error(error.stack);
  }
};

const getUser = async (userId) => {
  if (!userId) {
    return;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const requestedUserData = await response.json();
    return requestedUserData;
  } catch (error) {
    console.error(error.stack);
  }
};

const getPostComments = async (postId) => {
  if (!postId) {
    return;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const requestedUserData = await response.json();
    return requestedUserData;
  } catch (error) {
    console.error(error.stack);
  }
};

const displayComments = async (postId) => {
  if (!postId) {
    return;
  }
  const section = document.createElement("section");
  section.dataset.postId = postId;
  section.setAttribute("postId", `${section.dataset.postId}`);
  section.classList.add("comments", "hide");
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  return section;
};

const createPosts = async (posts) => {
  if (!posts) {
    return;
  }
  const fragment = document.createDocumentFragment();
  for (const post of posts) {
    const article = document.createElement("article");
    const h2 = createElemWithText("h2", post.title);
    const paragraph = createElemWithText("p", post.body);
    const paragraph2 = createElemWithText("p", `Post ID: ${post.id}`);
    const author = await getUser(post.userId);
    const paragraph3 = createElemWithText(
      "p",
      `Author: ${author.name} with ${author.company.name}`
    );
    const paragraph4 = createElemWithText("p", `${author.company.catchPhrase}`);
    const button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;
    button.setAttribute("postId", `${button.dataset.postId}`);
    const section = await displayComments(post.id);
    article.append(
      h2,
      paragraph,
      paragraph2,
      paragraph3,
      paragraph4,
      button,
      section
    );
    fragment.append(article);
  }
  return fragment;
};
const displayPosts = async (posts) => {
  const main = document.querySelector("main");
  if (posts != null) {
    element = await createPosts(posts);
    main.append(element);
    return element;
  } else {
    element = createElemWithText(
      "p",
      "Select an Employee to display their posts.",
      "default-text"
    );
    main.append(element);
    return element;
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

const refreshPosts = async (posts) => {
  if (!posts) {
    return;
  }
  const array = [];
  const removeButtons = removeButtonListeners();
  const main = deleteChildElements(document.querySelector("main"));
  const fragment = await displayPosts(posts);
  const addButtons = addButtonListeners();
  array.push(removeButtons, main, fragment, addButtons);
  return array;
};

const selectMenuChangeEventHandler = async (event) => {
  if (!event) {
    return;
  }
  const element = document.getElementById("selectMenu");
  element.setAttribute("disabled", "");
  const userId = event?.target?.value || 1;
  const posts = await getUserPosts(userId);
  const refreshPostsArray = await refreshPosts(posts);
  element.removeAttribute("disabled");
  return [userId, posts, refreshPostsArray];
};

const initPage = async () => {
  const users = await getUsers();
  const menu = populateSelectMenu(users);
  return [users, menu];
};

const initApp = () => {
  initPage();
  const selectMenu = document.getElementById("selectMenu");
  selectMenu.addEventListener("change", selectMenuChangeEventHandler);
};

document.addEventListener("DOMContentLoaded", (event) => initApp());
