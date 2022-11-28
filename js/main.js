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
    return undefined;
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
  if (postId === null || postId === undefined) {
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
  if (postId === null || postId === undefined) {
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
