import React from "react";
/* import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree"; */
import Tree from "./FileTree/FileTree";
import { useState, useLayoutEffect } from "react";
import { longTree } from "./data";
import { Socket } from "socket.io-client";
const structure = [
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
];
const FileTree = ({ socket }: { socket: Socket }) => {
  let [data, setData] = useState(structure);

  const handleClick = (node) => {
    console.log(node);
  };
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  useLayoutEffect(() => {
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree"));
      if (savedStructure) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {/*  <UncontrolledTreeEnvironment
        dataProvider={
          new StaticTreeDataProvider(longTree.items, (item, data) => ({
            ...item,
            data,
          }))
        }
        getItemTitle={(item) => item.data}
        canDragAndDrop={true}
        canReorderItems={true}
        canDropOnFolder={true}
        canDropOnNonFolder={true}
        viewState={{}}
        onSelectItems={(items) => {
          //console.log("Changing file to ", items[0]);
          socket.emit("edit", items[0]);
        }}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment> */}
      <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
    </>
  );
};

export default FileTree;
