"use client";
import EditorElement from "../../comps/EditorElement";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
  ControlledTreeEnvironment,
} from "react-complex-tree";
import { io } from "socket.io-client";
import { longTree } from "./data";
import "react-complex-tree/lib/style-modern.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
const socket = io("http://localhost:8000", {
  path: "/api",
});

function App() {
  return (
    <>
      {/* <div className="card space-x-3">
        <button onClick={() => socket.emit("edit", "collab.js")}>
          collab.js 
        </button>
        <button onClick={() => socket.emit("edit", "random.c")}>
          random.c
        </button>
        <button onClick={() => socket.emit("edit", "final_example.txt")}>
          final_example.txt
        </button>
      </div> */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="">
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
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="min-w-96">
          <EditorElement socket={socket} className="h-screen" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default App;
