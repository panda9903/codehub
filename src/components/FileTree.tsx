"use client";

import React from "react";
import Tree from "./FileTree/FileTree";
import { useState, useLayoutEffect } from "react";
import { Socket } from "socket.io-client";
const structure = [
  {
    type: "folder",
    name: "Main",
    files: [
      {
        type: "folder",
        name: "server",
        files: [
          { type: "file", name: "index.js" },
          { type: "file", name: "server.js" },
          { type: "file", name: "router.js" },
        ],
      },
      {
        type: "folder",
        name: "client",
        files: [
          {
            type: "folder",
            name: "ui",
            files: [
              { type: "file", name: "Toggle.js" },
              { type: "file", name: "Button.js" },
              { type: "file", name: "Button.style.js" },
            ],
          },
          {
            type: "folder",
            name: "components",
            files: [
              { type: "file", name: "Tree.js" },
              { type: "file", name: "Tree.style.js" },
            ],
          },
          { type: "file", name: "setup.js" },
          { type: "file", name: "setupTests.js" },
        ],
      },
      {
        type: "folder",
        name: "packages",
        files: [
          {
            type: "file",
            name: "main.js",
          },
        ],
      },
      { type: "file", name: "index.js" },
    ],
  },
];
const FileTree = ({ socket }: { socket: Socket }) => {
  let [data, setData] = useState(structure);

  const handleClick = (node) => {
    if (node.node.type === "file") {
      socket.emit("edit", node.node.name);
    }
  };

  const handleUpdate = (state) => {
    /* localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    ); */
  };

  /* useLayoutEffect(() => {
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree"));
      if (savedStructure) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []); */

  return (
    <>
      <Tree
        data={data}
        onUpdate={handleUpdate}
        onNodeClick={handleClick}
        children={undefined}
      />
    </>
  );
};

export default FileTree;
