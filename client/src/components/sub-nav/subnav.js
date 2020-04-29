import React from 'react';
import { Accordion, AccordionPanel, AccordionDivider, AccordionSummary, AccordionFull } from '../accordion';
import './subnav.css';

export const SubNav = () => {
  return (
    <Accordion size="large">
      <AccordionPanel active activeBgColor="#65034F" bgColor="#292852">
        <AccordionSummary>
          <div className="subnav-tab">
            <div className="subnav-tab-wrapper">
              <i className="icon computer" />
            </div>
            <p>Historical Data</p>
          </div>
        </AccordionSummary>
        <AccordionDivider />
        <AccordionFull>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </AccordionFull>
      </AccordionPanel>
      <AccordionPanel activeBgColor="#FF7600" bgColor="#36355C">
        <AccordionSummary>
          <div className="subnav-tab">
            <div className="subnav-tab-wrapper">
              <i className="icon flask" />
            </div>
            <p>Create New Project</p>
          </div>
        </AccordionSummary>
        <AccordionDivider />
        <AccordionFull>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </AccordionFull>
      </AccordionPanel>
      <AccordionPanel activeBgColor="#00BFBF" bgColor="#292852">
        <AccordionSummary>
          <div className="subnav-tab">
            <div className="subnav-tab-wrapper">
              <i className="icon analytics" />
            </div>
            <p>Worksheets</p>
          </div>
        </AccordionSummary>
        <AccordionDivider />
        <AccordionFull>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </AccordionFull>
      </AccordionPanel>
      {/* <AccordionPanel activeBgColor="#00A86E" bgColor="#36355C">
        <AccordionSummary>
          <div className="subnav-tab">
            <div className="subnav-tab-wrapper">
              <i className="icon history" />
            </div>
            <p>Archive</p>
          </div>
        </AccordionSummary>
        <AccordionDivider />
        <AccordionFull>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </AccordionFull>
      </AccordionPanel> */}
    </Accordion>
  );
};
