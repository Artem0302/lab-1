import React from "react";
import * as fs from "fs";

export const saveTable = (name, table) => {
  table.forEach((el) => {
    el.forEach((element) => {
      try {
        fs.writeFile(`${name}`, name, { flag: 'a+' }, (err) => {})
        console.log(table,'wot tut');
      } catch (err) {
        console.error(err);
      }
    });
  });
};

