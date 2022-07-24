import axios from "axios";

//get all categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_APT}/categories`);

// get on category by slug
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_APT}/${slug}`);

  //delete category by slug
export const deleteCategory = async (slug, authtoken) => {
  await axios.delete(`${process.env.REACT_APP_APT}/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

//update category by slug
export const updateCategory = async (slug, authtoken) => {
  await axios.put(`${process.env.REACT_APP_APT}/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
// create category by name
export const createCategory = async (category, authtoken) => {
    await axios.put(`${process.env.REACT_APP_APT}/categirory`,category ,{
      headers: {
        authtoken,
      },
    });
  };

