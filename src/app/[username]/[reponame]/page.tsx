"use client";
import EditorElement from "@/components/EditorElement";

import { io } from "socket.io-client";
import "react-complex-tree/lib/style-modern.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileTree from "@/components/FileTree";

const socket = io("http://localhost:8000", {
  path: "/api",
});

function App() {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="" defaultSize={15}>
          <FileTree socket={socket} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="">
          <EditorElement socket={socket} className="h-screen" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default App;
