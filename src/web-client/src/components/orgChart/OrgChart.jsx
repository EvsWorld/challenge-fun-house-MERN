import React, { useEffect, useState, Fragment } from 'react';
import './styles.css';
import styled from 'styled-components';
import randomcolor from 'randomcolor';
import faker from 'faker';
import call from './icons8-call-50.png';
import video from './icons8-video-24.png';
import chat from './icons8-chat-50.png';
import api from '../../utils/axiosConfig';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const Card = (props) => {
  const levelColor = randomcolor();

  return (
    <ul>
      {props.data.map((item, index) => (
        <Fragment key={item.name}>
          <li>
            <div className="card">
              <div className="image">
                <img
                  src={
                    'https://randomuser.me/api/portraits/lego/' +
                    randomIntFromInterval(1, 9) +
                    '.jpg'
                  }
                  alt="Profile"
                  style={{ borderColor: levelColor }}
                />
              </div>
              <div className="card-body">
                {/* <h4>{faker.name.findName()}</h4> */}
                <h4>{item.name}</h4>
                {/* <p>{faker.name.jobTitle()}</p> */}
                <p>{item.path}</p>
              </div>
              <div className="card-footer" style={{ background: levelColor }}>
                {/* <img src={chat} alt="Chat" />
                <img src={call} alt="Call" />
                <img src={video} alt="Video" /> */}
              </div>
              <div></div>
            </div>
            {item.children?.length && <Card data={item.children} />}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

export const OrgChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/api/org-persons/root');
        console.log('response.data :>> ', response.data);
        if (response.data) {
          setData(response.data);
        }

        setIsLoading(false);
      } catch (ex) {
        console.error(ex);
      }
    })();
  }, []);

  return (
    <>
      <div className="header">
        React Employee Hierarchy Chart
        <span className="follow">
          <div>input boxes</div>
          <div>input boxes</div>
        </span>
      </div>
      <div className="org-tree">
        <Card data={data} />
      </div>
    </>
  );
};
