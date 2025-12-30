import { Fevourite } from "../models/fevourite.model.js";
import { Home } from "../models/home.model.js";

export const getIndex = (req, res) => {
  const store = Home.fetchAll((store) => {
    const homes = Array.isArray(store) ? store.slice(0, 3) : [];
    res.render("store/index", { path: "home", store: homes });
  });
};

export const houseListAll = (req, res) => {
  const store = Home.fetchAll((store) => {
    res.render("store/house-list", { path: "house-list", store });
  });
};

export const houseDetails = (req, res) => {
  const { houseId } = req.params;
  Home.findById(houseId, (house) => {
    res.render("store/house-details", { path: "house-list", house: house ? house : [] });
  });
};

export const getFevourite = (req,res)=>{
 

  Fevourite.getFevourites((ids)=>{
    // console.log(ids);
    Home.fetchAll((homes)=>{
      // console.log(homes);
      const store = ids.map((id)=> homes.find(home=> home.id == id))
      // console.log(store);
       res.render("store/fevourite", {path:"fevourite",store })
    })
  })
 
}

export const addToFevourite = (req,res)=>{
  const {id} = req.body;

  Fevourite.addToFevourite(id,(error)=>{
    if(error){
      console.log("Error while marking fevourite",error);
    }
    res.redirect("/fevourite")
  })
}

export const removeToFevourite = (req, res)=>{
  const homeId = Number(req.body.homeId)
  console.log(homeId);
  Fevourite.removeToFevourite(homeId, (error)=>{
    if(error){
      console.log(error,"ERROR While remove from fevourite");
    }
     res.redirect("/fevourite")
  })
}
