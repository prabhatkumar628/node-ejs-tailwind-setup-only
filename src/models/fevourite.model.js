import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { error } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Fevourite {
  static addToFevourite(homeId, callback) {
    Fevourite.getFevourites((fevourites) => {
      if (fevourites.includes(homeId)) {
        callback("Home is allready marked favourite");
      } else {
        fevourites.push(homeId);
        fs.writeFile(
          path.resolve(__dirname, "../", "store", "fevourite.json"),
          JSON.stringify(fevourites),
          callback
        );
      }
    });
  }

  static getFevourites(callback) {
    fs.readFile(
      path.resolve(__dirname, "../", "store", "fevourite.json"),
      (error, data) => {
        callback(!error ? JSON.parse(data) : []);
      }
    );
  }

  static removeToFevourite(homeId) {
    Fevourite.getFevourites((fevs) => {
      fevs = fevs.filter((fev) => Number(fev) !== homeId);
      console.log(fevs);

      fs.writeFile(
        path.resolve(__dirname, "../", "store", "fevourite.json"),
        JSON.stringify(fevs),
        ()=>{}
      );
    });
  }
}
