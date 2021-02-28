import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { DetailModal } from './DetailModal';

const Background = styled.div`
  z-index: 222222;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  overflow-y: auto;
  width: 45em;
  height: 25em;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = ({
  ref,
  name,
  gender,
  image,
  species,
  status,
  url,
  origin,
  location,
  children,
  showModal,
  setShowModal,
}) => {
  const closeModal = (e) => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal}>
          <ModalWrapper showModal={showModal}>
            <ModalImg src={image} iconImage={image} alt="character" />
            <ModalContent>
              <DetailModal
                name={name}
                gender={gender}
                image={image}
                species={species}
                status={status}
                url={url}
                origin={origin}
                location={location}
              />
            </ModalContent>
            <CloseModalButton
              arial-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

Modal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.func,
  gender: PropTypes.string,
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
