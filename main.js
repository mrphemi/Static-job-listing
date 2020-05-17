const roles = document.querySelectorAll("[data-role]");
const levels = document.querySelectorAll("[data-level]");
const languages = document.querySelectorAll("[data-languages]");
const tools = document.querySelectorAll("[data-tools]");
const filterBox = document.querySelector(".filter-box");
const filters = document.querySelector(".filters");
const clearFiltersBtn = document.querySelector(".clear-filters");

window.onload = function () {
  [...roles, ...levels, ...languages, ...tools].forEach((x) => {
    x.addEventListener("click", () => {
      addFilters(x.innerText);
    });
  });

  clearFiltersBtn.addEventListener("click", clearFilters);
};

function hideFiltersBox() {
  if (!filters.childElementCount) {
    filterBox.classList.add("hide");
  }
}

function filterExists(name) {
  const filtersList = document.querySelectorAll(".filter .name");
  return [...filtersList].some((value) => value.innerText === name);
}

function addFiltersUi(name) {
  const filter = document.createElement("div");
  filter.className = "filter";

  const filterName = document.createElement("span");
  filterName.className = "name";
  filterName.innerText = name;

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete";
  deleteBtn.innerText = "X";

  if (filterBox.classList.contains("hide")) {
    filterBox.classList.remove("hide");
  }

  if (filterExists(name)) {
    return;
  }

  filter.appendChild(filterName);
  filter.appendChild(deleteBtn);

  filters.appendChild(filter);
}

function addFilters(name) {
  addFiltersUi(name);
  filterJobs();

  const deleteBtns = document.querySelectorAll(".delete");
  // delete filter from list
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
      filterJobs();
      // Remove filter box after deleting the last filter from the list
      if (deleteBtns.length === 1) {
        hideFiltersBox();
      }
    });
  });
}

function filterJobs() {
  // returns the text value of each filter
  const filtersList = [...document.querySelectorAll(".filter .name")].map(
    (filter) => filter.innerText,
  );
  // returns all categories per job post
  const CategoriesPerPost = [
    ...document.querySelectorAll(".role-languages-and-tools"),
  ].map((categories) => [...categories.children]);
  // returns job categories name and their parent elements(".job-item" div)
  const perJobCategories = CategoriesPerPost.map((categories) =>
    categories.map((category) => {
      return {
        name: category.innerText,
        firstParent: category.parentElement.parentElement,
      };
    }),
  );
  // returns all job posts
  const jobItems = [...document.querySelectorAll(".job-item")];

  jobItems.forEach((jobItem) => jobItem.classList.remove("hide"));
  filtersList.forEach((filter) => {
    perJobCategories.forEach((category) => {
      if (category.map((item) => item.name).includes(filter)) {
        return;
      }
      // filter job posts by hiding unrelated posts
      category.forEach((item) => item.firstParent.classList.add("hide"));
    });
  });
}

function clearFilters() {
  const jobItems = [...document.querySelectorAll(".job-item")];
  filters.innerHTML = "";
  hideFiltersBox();
  jobItems.forEach((jobItem) => jobItem.classList.remove("hide"));
}
