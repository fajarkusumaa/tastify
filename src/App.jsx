import axios from "axios";
import "./App.css";
import { useState } from "react";
// import moment from "moment/moment";
import { useEffect } from "react";

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
  const [input, setInput] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState();

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
    let url;

    if (input) {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      setIsSelect(false);
      setList();
      console.log(list.length);
    } else {
      const randomFood = bestFood[Math.floor(Math.random() * bestFood.length)];
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${randomFood}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      setIsSelect(false);
      setList();
    }

    try {
      const response = await axios.get(url);
      setList(response.data);
      console.log(list._links.next.href);
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
      <div className=" flex h-screen w-screen overflow-hidden bg-slate-300 p-8 px-12 duration-200 ease-in dark:bg-slate-900">
        <div className="flex h-full w-full flex-col justify-start gap-4">
          {/* NAVBAR */}
          <div className="flex h-fit items-center justify-between">
            <h1
              onClick={() => setIsSelect(false)}
              className="cursor-pointer text-4xl font-bold text-slate-700 dark:text-slate-50"
            >
              Tastify
              <span className="text-orange-500">.</span>
            </h1>
            {/* Search form */}
            <form
              className="relative flex h-14 w-[500px] items-center gap-4 rounded-xl bg-slate-200 p-2 ps-6 text-xl text-slate-700 dark:bg-white dark:bg-opacity-10 dark:text-white"
              onSubmit={() => handleSearchRecipes()}
            >
              <input
                type="text"
                className="w-full border-none bg-transparent outline-none"
                placeholder="chicken, beef, bacon, fried rice .etc"
                onChange={(event) => setInput(event.target.value)}
              />
              {input && (
                <button
                  onClick={() => handleSearchRecipes()}
                  className="absolute right-1 h-fit w-fit ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              )}
            </form>

            {/* Misc */}
            <div className="flex items-center gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  onClick={() => toggleTheme()}
                />

                <div className="peer h-8 w-14 rounded-full bg-slate-600 after:absolute after:start-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:border-gray-300 after:bg-orange-500 after:transition-all after:content-[''] peer-checked:bg-slate-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-slate-800"></div>
              </label>
              <a
                href="https://github.com/fajarkusumaa"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  className="fill-slate-700 duration-200 ease-in hover:fill-orange-400 dark:fill-slate-500 dark:hover:fill-orange-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CONTENT */}
          {isSelect === false && (
            <>
              <div className="relative mt-8 grid flex-1 grid-cols-5 gap-8 gap-y-40 overflow-y-auto pe-4 pt-20 text-white">
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
                      <span className="line-clamp-1 rounded-md bg-slate-600 p-2 text-sm text-slate-200 dark:bg-white dark:bg-opacity-10 dark:text-white">
                        {item.recipe.dishType}
                      </span>
                      <span className="line-clamp-1 rounded-md bg-slate-600 p-2 text-sm text-slate-200 dark:bg-white dark:bg-opacity-10 dark:text-white">
                        {item.recipe.cuisineType}
                      </span>
                    </div>
                  </a>
                ))}

                <div className="mt-4 flex gap-2">{/* {list._links.} */}</div>
              </div>

              <div className="w-100 mt-5 text-center text-base font-bold dark:text-white">
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
                  <div className="flex justify-between">
                    <div>
                      <span className="uppercase tracking-widest text-orange-300">
                        {dataItem.recipe.dishType}
                      </span>
                      <h1 className="mt-3">{dataItem.recipe.label}</h1>
                    </div>
                  </div>
                  {/* Ingredients */}{" "}
                  <h5 className="mt-8 text-2xl text-orange-300">Ingredients</h5>
                  <div className="mb-8 mt-4 grid w-3/4 grid-cols-6 gap-8 overflow-y-auto ">
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
                        <p className="text-center font-bold capitalize">
                          {item.food}
                        </p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-auto dark:text-white">
                    Source :{" "}
                    <a
                      href={dataItem.recipe.url}
                      target="_blank"
                      className="text-orange-300 hover:text-orange-400"
                      rel="noreferrer"
                    >
                      {dataItem.recipe.source}
                    </a>
                  </span>
                </div>

                <div className="flex w-1/3 flex-col rounded-3xl bg-white ">
                  <img
                    src={dataItem.recipe.image}
                    alt=""
                    className="relative z-10 h-52 rounded-3xl object-cover shadow-lg"
                  />

                  <div className="relative -top-20 flex-1 rounded-3xl p-14 pt-32">
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

                    <h1 className="mt-5 text-3xl text-slate-900">
                      Ingredients
                    </h1>
                    <ul className="list-inside list-disc">
                      {dataItem.recipe.ingredientLines.map((list, i) => (
                        <li key={i} className="leading-8 text-slate-700">
                          {list}
                        </li>
                      ))}
                    </ul>
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
