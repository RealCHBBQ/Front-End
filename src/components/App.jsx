import React from "react";
import TableDemo from "./TableDemo";
  
function App() {
    return (
        <div>
            {/* Header with inline css */}
            <h1
                style={{
                    display: 'flex', justifyContent: 'center', padding: '15px',
                    border: '13px solid #b4f0b4', color: 'rgb(11, 167, 11)'
                }}>
                Dogs Information
            </h1>
            {/* Table component below header */}
            <TableDemo />
        </div>
    )
}
  
export default App;