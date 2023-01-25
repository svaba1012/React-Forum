import React, { useState } from "react";
import "./TabView.css";

function TabView(props) {
  let [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="ui secondary pointing menu tabs-container">
        {props.tabs.map((el, id) => {
          return (
            <div
              className={activeTab === id ? "item active" : "item"}
              key={id}
              onClick={(e) => {
                setActiveTab(id);
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="tab-body">
        {props.children.filter((el, id) => id === activeTab)}
      </div>
    </div>
  );
}

export default TabView;
