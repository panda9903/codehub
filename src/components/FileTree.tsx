import React from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import { longTree } from "./data";
import { Socket } from "socket.io-client";

const FileTree = ({ socket }: { socket: Socket }) => {
  return (
    <>
      <UncontrolledTreeEnvironment
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
      </UncontrolledTreeEnvironment>
    </>
  );
};

export default FileTree;
