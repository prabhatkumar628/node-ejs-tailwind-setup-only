import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { Fevourite } from "./fevourite.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Home {
  constructor({ houseName, location, price, image }) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.image = image;
  }

  save() {
    Home.fetchAll((homes) => {
      if (this.id) {
        homes = homes.map((home) => {
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        this.id = Math.floor(Math.random() * 10000000);
        homes.push(this);
      }
      fs.writeFile(
        path.resolve(__dirname, "../", "store", "data.json"),
        JSON.stringify(homes),
        (error) => {}
      );
    });
  }

  static fetchAll(callback) {
    fs.readFile(
      path.resolve(__dirname, "../", "store", "data.json"),
      (error, data) => {
        callback(!error ? JSON.parse(data) : []);
      }
    );
  }

  static findById(houseId, callback) {
    this.fetchAll((houses) => {
      const house = houses.find((house) => house.id === Number(houseId));
      callback(house);
    });
  }

  static delete(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(
        path.resolve(__dirname, "../", "store", "data.json"),
        JSON.stringify(homes),
        (error) => {
          Fevourite.removeToFevourite(homeId, callback);
        }
      );
    });
  }
}
