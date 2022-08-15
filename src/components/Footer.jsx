import React from "react";

const Footer = () => {
  return (
    <>
      <button
        id="dropdownHelperButton"
        data-dropdown-toggle="dropdownHelper"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown checkbox{" "}
        <svg
          class="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdownHelper"
        class="z-10 w-60 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block"
        // style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(286.4px, 70.4px, 0px);"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="bottom"
      >
        <ul
          class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHelperButton"
        >
          <li>
            <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div class="flex items-center h-5">
                <input
                  id="helper-checkbox-1"
                  aria-describedby="helper-checkbox-text-1"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              <div class="ml-2 text-sm">
                <label
                  for="helper-checkbox-1"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  <div>Enable notifications</div>
                  <p
                    id="helper-checkbox-text-1"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    Some helpful instruction goes over here.
                  </p>
                </label>
              </div>
            </div>
          </li>
          <li>
            <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div class="flex items-center h-5">
                <input
                  id="helper-checkbox-2"
                  aria-describedby="helper-checkbox-text-2"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              <div class="ml-2 text-sm">
                <label
                  for="helper-checkbox-2"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  <div>Enable 2FA auth</div>
                  <p
                    id="helper-checkbox-text-2"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    Some helpful instruction goes over here.
                  </p>
                </label>
              </div>
            </div>
          </li>
          <li>
            <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <div class="flex items-center h-5">
                <input
                  id="helper-checkbox-3"
                  aria-describedby="helper-checkbox-text-3"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
              </div>
              <div class="ml-2 text-sm">
                <label
                  for="helper-checkbox-3"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  <div>Subscribe newsletter</div>
                  <p
                    id="helper-checkbox-text-3"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    Some helpful instruction goes over here.
                  </p>
                </label>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
