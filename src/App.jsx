import axios from "axios";
import "./App.css";
import { useState } from "react";
// import moment from "moment/moment";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const APP_ID = "54ea683e";
  const APP_KEY = "1a673f1a965c62f5a553b754a0170aab";

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (localStorage.theme === "light" || theme === "light") {
      setTheme("dark");
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  };

  const [list, setList] = useState();
  const [input, setInput] = useState();
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState();

  console.log(input);

  const [dataItem, setDataItem] = useState();
  console.log(dataItem);

  const bestFood = [
    "Sushi",
    "Pizza",
    "Chocolate",
    "Tacos",
    "Cheeseburger",
    "Croissant",
    "Pad Thai",
    "Curry",
    "Pasta",
    "Dim Sum",
    "Paella",
    "Gelato",
    "Hamburger",
    "Moussaka",
    "Tiramisu",
    "Pho",
    "Churros",
    "Kimchi",
    "Poutine",
    "Ramen",
    "Gyoza",
    "Ceviche",
    "Biryani",
    "Baguette with Cheese",
    "Tandoori Chicken",
    "Croque Monsieur",
    "Guacamole",
    "Pierogi",
  ];

  const setData = (item) => {
    setDataItem(item);
    setIsSelect(true);
  };

  useEffect(() => {
    handleSearchRecipes();
  }, []);

  const handleSearchRecipes = async () => {
    setList();
    let url;

    if (input && input.length >= 1) {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      setIsSelect(false);

      console.log("fetching search list");
    } else {
      const randomFood =
        await bestFood[Math.floor(Math.random() * bestFood.length)];
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${randomFood}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      setIsSelect(false);

      console.log("fetching random list");
    }

    try {
      const response = await axios.get(url);
      setList(response.data);
      // console.log(list._links.next.href);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const handleNextPage = async () => {
    setList();
    let url;

    url = list?._links.next.href;

    const response = await axios.get(url);
    setList(response.data);
  };

  // Set Clock
  // const [date, setDate] = useState(moment().format("LT"));

  // setInterval(() => {
  //   setDate(moment().format("LT"));
  // }, 1000);

  return (
    <>
      <div className=" relative flex h-screen w-screen overflow-hidden bg-slate-300 p-8 px-12 duration-200 ease-in dark:bg-slate-900">
        <div className="flex h-full w-full flex-col justify-start gap-4">
          <Navbar
            setIsSelect={setIsSelect}
            handleSearchRecipes={handleSearchRecipes}
            input={input}
            setInput={setInput}
            toggleTheme={toggleTheme}
          />
          {/* CONTENT */}
          {isSelect === false && (
            <>
              <div className="relative mt-8 grid flex-1 grid-cols-5 gap-8 gap-y-40 overflow-y-auto pe-4 pt-20 text-white">
                {list
                  ? list.hits.map((item, i) => (
                      <a
                        key={i}
                        onClick={() => setData(item)}
                        className="relative z-0 flex h-80 cursor-pointer flex-col items-center justify-end rounded-lg bg-slate-200 p-6 pt-16 text-center text-white duration-100 ease-in hover:scale-105 hover:text-white dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-25"
                      >
                        <img
                          src={item.recipe.images.THUMBNAIL.url}
                          alt=""
                          className="absolute -top-16 w-44 rounded-full"
                        />
                        <p className="line-clamp-1 text-xl font-semibold text-slate-600 dark:text-slate-50">
                          {item.recipe.label}
                        </p>
                        <p className="text-base text-slate-600 opacity-50 dark:text-slate-50">
                          {Math.round(item.recipe.calories)} calories
                        </p>
                        <div className="my-6 w-full border-t border-slate-400 dark:opacity-20"></div>
                        <div className="flex w-full justify-center gap-2 overflow-hidden">
                          <span className="line-clamp-1 rounded-md bg-slate-400 p-2 text-sm text-slate-200 dark:bg-white dark:bg-opacity-10 dark:text-white">
                            {item.recipe.dishType}
                          </span>
                          <span className="line-clamp-1 rounded-md bg-slate-400 p-2 text-sm text-slate-200 dark:bg-white dark:bg-opacity-10 dark:text-white">
                            {item.recipe.cuisineType}
                          </span>
                        </div>
                      </a>
                    ))
                  : // Loading skeleton
                    Array.from({ length: 20 }, (_, index) => (
                      <div
                        key={index}
                        className="relative z-0 mb-4 flex h-80 h-80 animate-pulse cursor-pointer flex-col items-center justify-end rounded-lg rounded-lg  bg-slate-200 p-6  pt-16 text-center dark:bg-gray-800"
                      >
                        <div className="absolute -top-16 mb-4 h-44 w-44 rounded-full bg-gray-400 dark:bg-gray-700"></div>
                        <div className="mb-2 h-6 w-full rounded bg-gray-400 dark:bg-gray-700"></div>
                        <div className="mb-2 h-6 w-full rounded bg-gray-400 dark:bg-gray-700"></div>
                        <div className="mb-2 h-6 w-full rounded bg-gray-400 dark:bg-gray-700"></div>
                        <div className="h-6 w-full rounded bg-gray-400 dark:bg-gray-700"></div>
                      </div>
                    ))}
                {/* 
                {list?.hits.map((item, i) => (
                  <a
                    key={i}
                    onClick={() => setData(item)}
                    className="relative z-0 flex h-80 cursor-pointer flex-col items-center justify-end rounded-lg bg-slate-200 p-6 pt-16 text-center text-white duration-100 ease-in hover:scale-105 hover:text-white dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-25"
                  >
                    <img
                      src={item.recipe.images.THUMBNAIL.url}
                      alt=""
                      className="absolute -top-16 w-44 rounded-full"
                    />
                    <p className="line-clamp-1 text-xl font-semibold text-slate-600 dark:text-slate-50">
                      {item.recipe.label}
                    </p>
                    <p className="text-base text-slate-600 opacity-50 dark:text-slate-50">
                      {Math.round(item.recipe.calories)} calories
                    </p>
                    <div className="my-6 w-full border-t border-slate-400 dark:opacity-20"></div>
                    <div className="flex w-full justify-center gap-2 overflow-hidden">
                      <span className="line-clamp-1 rounded-md bg-slate-400 p-2 text-sm text-slate-200 dark:bg-white dark:bg-opacity-10 dark:text-white">
                        {item.recipe.dishType}
                      </span>
                      <span className="line-clamp-1 rounded-md bg-slate-400 p-2 text-sm text-slate-200 dark:bg-white dark:bg-opacity-10 dark:text-white">
                        {item.recipe.cuisineType}
                      </span>
                    </div>
                  </a>
                ))} */}
                <div className="mt-4 flex gap-2">{/* {list._links.} */}</div>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-slate-300 py-4 text-center text-lg font-bold text-slate-600 dark:bg-slate-900 dark:text-white">
                Support by{" "}
                <a
                  href="https://developer.edamam.com/edamam-recipe-api"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-500 hover:text-orange-600"
                >
                  Edamam API
                </a>
              </div>
            </>
          )}

          {isLoading === true && (
            <div className="flex h-full w-full items-center justify-center">
              Loading ...
            </div>
          )}

          {/* Detail content */}
          {isSelect === true && (
            <>
              <div className="mt-8 flex h-full flex-1 justify-between gap-4 overflow-hidden">
                <div className="relative flex h-full w-full flex-col">
                  <div className="mb-8">
                    <span className="uppercase tracking-widest text-slate-600 dark:text-orange-400">
                      {dataItem.recipe.dishType}
                    </span>
                    <h1 className="mt-3 text-slate-700 dark:text-white">
                      {dataItem.recipe.label}
                    </h1>
                  </div>
                  {/* Ingredients */}{" "}
                  <p className="uppercase tracking-widest text-slate-600 dark:text-orange-400">
                    Ingredients
                  </p>
                  <div className="mb-8 mt-4 grid w-5/6 grid-cols-6 gap-8 overflow-y-auto pe-24">
                    {dataItem.recipe.ingredients.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-start gap-3"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="aspect-square w-full rounded-full object-cover"
                        />
                        <p className="text-center font-bold capitalize text-slate-600 dark:text-white">
                          {item.food}
                        </p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-auto  text-slate-600 dark:text-white">
                    Source :{" "}
                    <a
                      href={dataItem.recipe.url}
                      target="_blank"
                      className="text-orange-400 hover:text-orange-700 dark:text-orange-400"
                      rel="noreferrer"
                    >
                      {dataItem.recipe.source}
                    </a>
                  </span>
                </div>

                <div className="flex w-1/3 flex-col overflow-hidden rounded-3xl bg-white">
                  <img
                    src={dataItem.recipe.image}
                    alt=""
                    className="relative z-10 h-52 rounded-3xl object-cover shadow-lg"
                  />

                  {/* Sidebar */}
                  <div className="relative h-full flex-1 overflow-y-auto rounded-3xl p-8 pb-24 pt-8">
                    <div className="flex items-center gap-4 text-lg text-slate-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 opacity-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>
                        {dataItem.recipe.totalTime === 0
                          ? "unknown"
                          : dataItem.recipe.totalTime + " minutes"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-lg text-slate-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 opacity-50"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                        />
                      </svg>

                      <span>
                        {dataItem.recipe.calories === 0
                          ? "unknown"
                          : Math.round(dataItem.recipe.calories) + " calories"}
                      </span>
                    </div>

                    <div className="h-full">
                      <h1 className="mt-5 text-3xl text-slate-900">
                        Ingredients
                      </h1>
                      <ul className="order h-full list-inside list-disc">
                        {dataItem.recipe.ingredientLines.map((list, i) => (
                          <li
                            key={i}
                            className="text-sm leading-8 text-slate-700"
                          >
                            {list}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
