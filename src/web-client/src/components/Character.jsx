import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from '../heart-filled.svg';
import { useComponentVisible } from './hooks/useComponentVisible';
import { NiceButton } from './LoginSignUpBoxComponents';
import { Modal } from './Modal';

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

const FavoriteIcon = styled(Icon)`
  fill: ${(props) => (props.$isFavorite ? 'palevioletred' : 'white')};
  stroke: ${(props) => (props.$isFavorite ? 'none' : '#646464')};
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
  _id,
  isFavorite,
  onToggleFavorite,
  name,
  gender,
  image,
  species,
  status,
  url,
  origin,
  location,
}) {
  const renderDetails = () =>
    [gender, species, status]
      .filter((detail) => detail !== 'unknown')
      .join(',  ');

  const [isDetailViewOpen, setIsDetailViewOpen] = useComponentVisible(false);

  return (
    <>
      <Card>
        <Image iconImage={image} alt="character">
          <FavoriteIcon $isFavorite={isFavorite()} onClick={onToggleFavorite} />
        </Image>
        <CardBody>
          <Name>{name}</Name>
          <p>{renderDetails()}</p>
          <NiceButton onClick={() => setIsDetailViewOpen(true)}>
            Click for details
          </NiceButton>
        </CardBody>
      </Card>
      <Modal
        showModal={isDetailViewOpen}
        setShowModal={setIsDetailViewOpen}
        name={name}
        gender={gender}
        image={image}
        species={species}
        status={status}
        url={url}
        origin={origin}
        location={location}
      />
    </>
  );
}

Character.propTypes = {
  gender: PropTypes.string,
  _id: PropTypes.string,
  image: PropTypes.string,
  isFavorite: PropTypes.func,
  name: PropTypes.string,
  onToggleFavorite: PropTypes.func,
  species: PropTypes.string,
  status: PropTypes.string,
  url: PropTypes.string,
  location: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  origin: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};
