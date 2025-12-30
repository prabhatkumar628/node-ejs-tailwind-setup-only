import { Home } from "../models/home.model.js";

export const getHostHomeList = (req, res) => {
  const store = Home.fetchAll((homes) => {
    res.render("host/homes", { path: "host-homes", homes });
  });
};

export const addHome = (req, res) => {
  res.status(200).render("host/home-form", { edit: false, path: "add-home" });
};

export const addSucces = (req, res) => {
  const { houseName, location, price, image } = req.body;
  const data = new Home({ houseName, location, price, image });
  data.save();
  res.status(302).redirect("/host/home/list");
};

export const getEditHostHome = (req, res) => {
  const { homeId } = req.params;
  const { editing } = req.query;
  const edit = editing === "true";
  // console.log(homeId,"homeId");
  // console.log(editing,"edinting");
  Home.findById(homeId, (home) => {
    if (!home) return res.redirect("/host/home/list");
    res.render("host/home-form", { edit, home, path: "add-home" });
  });
};

export const updateHostHome = (req, res) => {
  const { houseName, location, price, image } = req.body;
  const id = Number(req.body.id);
  const home = new Home({ houseName, location, price, image });
  home.id = id;
  home.save();
  res.redirect("/host/home/list");
};

export const deleteHostHome = (req, res) => {
  const homeId = Number(req.body.homeId);

  Home.delete(homeId);
  res.status(200).redirect("/host/home/list");
};
