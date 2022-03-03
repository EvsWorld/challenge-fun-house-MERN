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
  return alphabetPosition(letter) % 2 === 0 ? 'men' : 'women';
}

const Card = ({ persons }) => {
  const [levelColor, setLevelColor] = useState('');
  const [face, setFace] = useState(1);
  useEffect(() => {
    setLevelColor(randomcolor());
    setFace(randomIntFromInterval(1, 9));
  }, []);
  // const content = isLoading ? ()
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
    search: 'root',
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
    const r = await api.get('/api/org-persons/root');
    console.log('response.data :>> ', r.data);
    if (r.data) {
      setPersons(r.data);
    }
    setIsLoading(false);
    setNodes({ user: '', parent: '' });
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

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await api.put(
  //         `/api/org-persons/update-parent-connect-children/?name=${nodes.user}&newParent=${nodes.parent}`
  //       );
  //       console.log('response.data :>> ', response.data);
  //       if (response.data) {
  //         setPersons(response.data);
  //       }

  //       setIsLoading(false);
  //     } catch (ex) {
  //       console.error(ex);
  //     }
  //   })();
  // }, [nodes]);

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
            <button type="submit">Submit</button>
          </form>
        </span>
      </div>
      <div className="org-tree">{!isLoading && <Card persons={persons} />}</div>
    </>
  );
};

// function UseForm() {
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setInputValue((previousValue) => {
//       if (name === 'search') {
//         return {
//           search: value,
//           contactName: previousValue.contactName,
//           contact: previousValue.contact,
//         };
//       }
//     });
//   }

//   function onFormSubmit(event) {
//     let updatedInputVal = setInputValue(inputValue.search);
//     event.preventDefault();
//     return updatedInputVal; //Want to fetch this value and use it in the ApiData.js component
//   }

//   return (
//     <div className="form-container">
//       <div className="input-div">
//         <form onSubmit={onFormSubmit}>
//           <input
//             className="form-input"
//             onChange={handleChange}
//             type="text"
//             name="search"
//             value={inputValue.search}
//             placeholder="Search TV Shows"
//           />
//         </form>
//       </div>
//       <div className="btn-div">
//         <button type="submit" className="btn">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
