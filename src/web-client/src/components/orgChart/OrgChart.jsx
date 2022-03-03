import React, { useEffect, useState, Fragment } from 'react';
import './styles.css';
import styled from 'styled-components';
import randomcolor from 'randomcolor';
import faker from 'faker';
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
  return alphabetPosition(letter) % 2 === 0 ? 'men' : 'women';
}

const Card = ({ persons }) => {
  const [levelColor, setLevelColor] = useState('');
  const [face, setFace] = useState(1);
  useEffect(() => {
    setLevelColor(randomcolor());
    setFace(randomIntFromInterval(1, 9));
  }, []);
  return (
    <ul>
      {persons.length &&
        persons.map((item, index) => (
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
                  <h4>{item.name}</h4>
                  <p>{item.path}</p>
                </div>
                <div
                  className="card-footer"
                  style={{ background: levelColor }}
                ></div>
                <div></div>
              </div>
              {item.children?.length && <Card persons={item.children} />}
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
    search: '',
    user: '',
    parent: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    console.log('value :>> ', value);
    console.log('name :>> ', name);
    setNodes((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('onFormSubmit e :>> ', e.target);
    console.log('{nodes} :>> ', { nodes });

    const response = await api.put(
      `/api/org-persons/update-parent-connect-children/?name=${nodes.user}&newParent=${nodes.parent}`
    );
    console.log('response.data :>> ', response.data);
    const tree = await api.get('/api/org-persons/root');
    console.log('tree.data :>> ', tree.data);
    if (tree.data) {
      setPersons(tree.data);
    }
    setIsLoading(false);
    setNodes({ user: '', parent: '' });
  };

  const handleFetchDescendents = async (e) => {
    e.preventDefault();
    console.log('handleFetchDescendents called :>> ');
    const search = nodes.search === '' ? 'root' : nodes.search;
    try {
      const response = await api.get(`/api/org-persons/${search}`);
      console.log('response.data :>> ', response.data);
      if (response.data) {
        setPersons(response.data);
      }

      setIsLoading(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    (async () => {
      const search = nodes.search === '' ? 'root' : nodes.search;
      try {
        const response = await api.get(`/api/org-persons/${search}`);
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
          <form onSubmit={handleFormSubmit}>
            <input
              name="user"
              type="text"
              placeholder="User to move"
              onChange={handleInput}
              value={nodes.user}
            />
            <input
              name="parent"
              type="text"
              placeholder="New parent"
              onChange={handleInput}
              value={nodes.parent}
            />
            <button type="submit">Change parent node</button>
          </form>
        </span>
        <span className="follow">
          <form onSubmit={handleFetchDescendents}>
            <input
              name="search"
              type="text"
              placeholder="person"
              onChange={handleInput}
              // value={nodes.search}
            />
            <button type="submit">Fetch descendents</button>
          </form>
        </span>
      </div>
      <div className="org-tree">{!isLoading && <Card persons={persons} />}</div>
    </>
  );
};
