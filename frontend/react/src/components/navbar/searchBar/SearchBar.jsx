import React, {useState} from "react";

import search from "../../../pages/Search/application/search.js";
import {toast} from "react-toastify";
import Loading from "../../Loading.jsx";
import ShopItem from "../../ShopItem.jsx";


export function SearchBar(props) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const [query, setQuery] = useState("");

  const searchForQuery = async () => {
    setLoading(true);
    if (query.length >= 3 && query) {
      console.log(query);
      const data = await search(query);
      setLoading(false);
      setItems(data);
      return;
    }
    setLoading(false);
    toast.info("Enter atleast 3 characters to search");
  };

  return (
    <>
      {/*<NavBar title="Search" />*/}
      <div className="">
      <section className="mt-[10vh] ">
        <div className="flex flex-row lg:mx-16 p-5">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchForQuery();
              }
            }}
            type="text"
            placeholder="Enter your query"
            className="bg-semiDarkColor bg-opacity-10 w-[100%] py-3  border-2 outline-none border-white focus:border-darkColor focus:rounded-lg focus:outline-none px-2 transition-all mr-3 "
          ></input>
          <button
            onClick={() => searchForQuery()}
            className="bg-accentColor text-white px-4  rounded-md"
          >
            Search
          </button>
        </div>

        {items != null ? (
            <LoadedPage items={items} />
        ) : (
          ''
        )}
      </section>
      </div>
    </>

  );
}

function LoadedPage({ items }) {
  return (
    <>
      <section className=" min-h-[92vh] w-[100%] p-6 lg:px-24 ">
        <h1 className="text-3xl font-bold">
          {items.length > 0 ? "Results" : "No Results"}
        </h1>
        <div className=" w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  mt-5">
          {items.map((e) => (
            <ShopItem key={e._id} itemId={e._id} />
          ))}
        </div>
      </section>
    </>
  );
}

