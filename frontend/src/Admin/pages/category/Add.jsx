import React from "react";

function Add() {
  return (
    <>
      <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg">
        <div class="border-b px-6 py-4">
          <h2 class="text-lg font-semibold text-gray-700">Create Category</h2>
        </div>
        <form class="p-6 space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Slug
            </label>
            <input
              type="text"
              placeholder="category-slug"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter description"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              class="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>

            <button
              type="reset"
              class="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add;
