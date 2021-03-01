import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderAndFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataButton = styled.a`
  background-color: transparent;
  color: #262626;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  padding: 3px 9px;
  text-transform: capitalize;
  font-size: 14px;
  margin-left: 20px;
`;

const HeadingThreeText = styled.h3`
  line-height: 4em;
`;
const ParagraphText = styled.div``;

const ProfileDetailsMeta = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 2em;
`;

export function CharacterDetailsExtended({
  name,
  gender,
  image,
  species,
  status,
  url,
  origin,
  location,
}) {
  return (
    <DetailsContainer>
      <HeaderAndFooter>
        <HeadingThreeText>{name}</HeadingThreeText>
      </HeaderAndFooter>

      <ProfileDetailsMeta>
        <ParagraphText>
          Species: <strong>{species}</strong>
        </ParagraphText>
        <ParagraphText>
          Gender: <strong>{species}</strong>
        </ParagraphText>
        <ParagraphText>
          From: <strong>{origin.name}</strong>,
        </ParagraphText>
        <ParagraphText>
          Current Location: <strong>{location.name}</strong>
        </ParagraphText>
        <ParagraphText>
          Living: <strong>{status === 'Alive' ? 'Yes' : 'No'}</strong>
        </ParagraphText>
      </ProfileDetailsMeta>
      <HeaderAndFooter>
        <DataButton target="_blank" href={url}>
          Data
        </DataButton>
      </HeaderAndFooter>
    </DetailsContainer>
  );
}

CharacterDetailsExtended.propTypes = {
  gender: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
  name: PropTypes.string,
  origin: PropTypes.shape({
    name: PropTypes.string,
  }),
  species: PropTypes.string,
  status: PropTypes.string,
  url: PropTypes.string,
};
