import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from '../heart-filled.svg';

const Container = styled.div`
  background: #fff;
  width: 15em;
  border-radius: 0.6em;
  margin: 1em;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  transition: all ease 200ms;

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
  background: url(${(props) => props.image});
  min-height: 18em;
  background-size: 'cover';
`;

const FavoriteIcon = styled(Icon)`
  fill: ${(props) => (props.isFavorite ? 'palevioletred' : 'white')};
  stroke: ${(props) => (props.isFavorite ? 'none' : '#646464')};
  stroke-width: 0.1em;
  margin: 0.6em;
`;

const Name = styled.h2`
  color: #222;
  margin-top: -0.2em;
  line-height: 1.4;
  font-size: 1.3em;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

export function Character({
  isFavorite,
  onToggleFavorite,
  id,
  name,
  gender,
  image,
  species,
  status,
  url,
}) {
  return (
    <Container>
      <Image image={image} alt="character">
        <FavoriteIcon isFavorite={isFavorite(id)} onClick={onToggleFavorite} />
      </Image>
      <CardBody>
        <Name>{name}</Name>
        <p>
          {gender}, {species}, {status}
        </p>
      </CardBody>
    </Container>
  );
}
