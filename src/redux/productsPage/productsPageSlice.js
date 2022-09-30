import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  collection: "",
  products: [],
  filteredProducts: [],
  filters: {
    sizes: [],
    price: {
      min: 0,
      max: Infinity,
    },
    other: {
      inStock: false,
    },
  },
  sortOption: "",
  view: "product",
};

export const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    showDetails: (state, action) => {
      state.category = action.payload.category;
      state.collection = action.payload.collection;
    },
    filterReset: (state) => {
      state.filters = initialState.filters;
    },
    addSize: (state, action) => {
      state.filters.sizes = state.filters.sizes.concat(action.payload.size);
    },
    removeSize: (state, action) => {
      const sizes = state.filters.sizes;
      const i = sizes.indexOf(action.payload.size);
      sizes.splice(i, 1);
      state.filters.sizes = sizes;
    },
    resetSize: (state) => {
      state.filters.sizes = initialState.filters.sizes;
    },
    setMinPrice: (state, action) => {
      state.filters.price.min = +action.payload.minPrice;
    },
    setMaxPrice: (state, action) => {
      state.filters.price.max = +action.payload.maxPrice;
    },
    justInStock: (state, action) => {
      state.filters.other.inStock = action.payload.inStock;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload.sortOption;
    },
    viewType: (state, action) => {
      state.view = action.payload.view;
    },
    runSizeFilter: (state) => {
      state.filteredProducts = [];
      if (state.filters.sizes.length !== 0) {
        let filterIndex = new Set();
        state.filters.sizes.map((filterSize) => {
          for (const [index, product] of state.products.entries()) {
            product.sizes.map((size) => {
              if (filterSize === size) {
                filterIndex.add(index);
              }
            });
          }
        });
        filterIndex.forEach((index) => {
          state.filteredProducts.push(state.products[index]);
        });
      }
    },
    runPriceFilter: (state) => {
      const priceFiltered = [];
      if (state.filteredProducts.length === 0) {
        state.products.map((product) => {
          if (
            product.prices > state.filters.price.min &&
            product.prices < state.filters.price.max
            ) {
            state.filteredProducts.push(product);
          }
        });
      } else {
        state.filteredProducts.map((product) => {
          if (
            product.prices > state.filters.price.min &&
            product.prices < state.filters.price.max
          ) {
            priceFiltered.push(product);
          }
        });
        state.filteredProducts = priceFiltered;
      }
    },
  },
});

export const {
  showDetails,
  addSize,
  removeSize,
  filterReset,
  resetSize,
  setMinPrice,
  setMaxPrice,
  justInStock,
  setSortOption,
  viewType,
  runSizeFilter,
  setProducts,
  runPriceFilter,
} = productsPageSlice.actions;

export default productsPageSlice.reducer;
