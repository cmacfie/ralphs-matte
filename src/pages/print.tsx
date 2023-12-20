import React from "react";
import PrintComponent from "@/components/PrintComponent";


const PrintPage = () =>{
    
    return (
      <PrintComponent problems={problems} ref={(el) => (ref.current = el)} />
    );
}