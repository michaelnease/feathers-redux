import "./menu.css";
import React, { Fragment, useState, useEffect, useRef } from "react";
import useOutsideClick from "../../common/hooks/use-outside-click";

function Menu(props) {
  const initialState = props.initialState || false;
  const [ isOpen, setIsOpen ] = useState(initialState);
  const menuRef = useRef(null);
  const noop = () => void 0;

  const defaultCallbacks = {
    onOpen: noop,
    onClose: noop,
  };

  const callbacks = Object.assign(defaultCallbacks, props);
  const { onClose, onOpen } = callbacks;

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [ isOpen ]);

  const toggle = event => {
    event.preventDefault();
    setIsOpen(prev => !prev);
  };

  /* close when clicked outside */
  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  /* renders */
  const renderList = children => {
    return (
      <Fragment>
        <ul className="ui-card menu__list">
          {React.Children.map(children[0].props.children, item => {
            return (
              <li className="menu-item__action" onClick={toggle}>
                {item}
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  };

  const renderButton = children => {
    return (
      <Fragment>
        {React.Children.map(children[1], child => {
          return (
            <a href="" className="menu__trigger" onClick={toggle}>
              {child}
            </a>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div
      className={`menu ${props.className ? props.className : ""} ${
        props.position ? props.position : "right"
      }`}
      ref={menuRef}
    >
      {isOpen ? renderList(props.children) : null}
      {renderButton(props.children)}
    </div>
  );
}

export default Menu;
