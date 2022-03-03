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
function alphabetPosition(text) {
  var result = '';
  for (var i = 0; i < text.length; i++) {
    var code = text.toUpperCase().charCodeAt(i);
    if (code > 64 && code < 91) result += code - 64 + ' ';
  }

  return result.slice(0, result.length - 1);
}
function manOrWoman(letter) {
  const number = alphabetPosition(letter);
  console.log('number :>> ', number);
  const r = number % 2 === 0 ? 'men' : 'women';
  console.log('r :>> ', r);
  return r;
}
console.log('manOrWoman: ', manOrWoman('b'));

const Card = (props) => {
  const [levelColor, setLevelColor] = useState('');
  const [face, setFace] = useState(1);
  useEffect(() => {
    setLevelColor(randomcolor());
    setFace(randomIntFromInterval(1, 9));
  }, []);

  return (
    <ul>
      {props.data.map((item, index) => (
        <Fragment key={item.name}>
          <li>
            <div className="card">
              <div className="image">
                <img
                  src={`https://randomuser.me/api/portraits/${manOrWoman(
                    item.name
                  )}/${alphabetPosition(item.name)}.jpg`}
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
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nodes, setNodes] = useState({
    user: '',
    parent: '',
  });

  const handleInput = (event) => {
    event.preventDefault();
    console.log('event.target.value :>> ', event.target.value);
    console.log('event.target.name :>> ', event.target.name);
    setNodes((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/api/org-persons/root');
        console.log('response.data :>> ', response.data);
        if (response.data) {
          setPersons(response.data);
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
        Org Chart
        <span className="follow">
          <input
            name="user"
            type="text"
            placeholder="User to move"
            onChange={handleInput}
          />
          <input
            name="parent"
            type="text"
            placeholder="New parent"
            onChange={handleInput}
          />
        </span>
      </div>
      <div className="org-tree">
        <Card data={persons} />
      </div>
    </>
  );
};
