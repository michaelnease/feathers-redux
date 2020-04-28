import React, { useState, useEffect } from "react";

function Tabs(props) {
  const [ activeTab, setActiveTab ] = useState(
    props.initialActiveTab ? props.initialActiveTab : 0
  );

  useEffect(() => {
    if (typeof props.onActiveTabChange === "function") {
      props.onActiveTabChange();
    }
    return () => {
      if (typeof props.onActiveTabCleanup === "function") {
        props.onActiveTabCleanup();
      }
    };
  }, [ activeTab ]);

  const renderTabSelects = children => {
    return (
      <div className="tab__selects">
        {React.Children.map(children, (item, i) => {
          return React.Children.map(item.props.children, (child, ci) => {
            return ci === 0 ? (
              <a
                href=""
                className={`${activeTab === i ? "active-tab" : ""}`}
                onClick={event => {
                  event.preventDefault();
                  setActiveTab(i);
                }}
              >
                {child}
              </a>
            ) : null;
          });
        })}
      </div>
    );
  };

  const renderTabsContent = children => {
    return (
      <div className="tab__content">
        {React.Children.map(children, (item, i) => {
          return React.Children.map(item.props.children, (child, ci) => {
            return ci === 1 && i === activeTab ? child : null;
          });
        })}
      </div>
    );
  };

  return (
    <div className="tabs">
      {renderTabSelects(props.children)}
      {renderTabsContent(props.children)}
    </div>
  );
}

function Tab(props) {
  return <div className="tab">{props.children}</div>;
}

export { Tabs, Tab };
