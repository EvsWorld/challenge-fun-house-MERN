import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  width: 15em;
  border-radius: 0.6em;
  margin: 1em;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12),
      0 8px 32px -8px hsla(0, 0%, 0%, 0.14),
      0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
  }
`;

const CardBody = styled.div`
  padding: 1.2em;
`;

const Image = styled.div`
  display: flex;
  justify-content: flex-end;
  background: url(${(props) => props.iconImage});
  min-height: 18em;
  background-size: 'cover';
`;

const Name = styled.h2`
  color: #222;
  margin-top: -0.2em;
  line-height: 1.4;
  font-size: 1.3em;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

export function Company({ specialties, city, company_name, logo }) {
  const renderDetails = () =>
    specialties.filter((detail) => detail !== 'unknown').join(',  ');

  return (
    <>
      <Card>
        <Image iconImage={logo} alt="character"></Image>
        <CardBody>
          <Name>{company_name}</Name>
          <Name>{city}</Name>
          <p>{renderDetails()}</p>
        </CardBody>
      </Card>
    </>
  );
}
