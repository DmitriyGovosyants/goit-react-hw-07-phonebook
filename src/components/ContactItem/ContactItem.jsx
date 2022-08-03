import PropTypes from 'prop-types';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as contactsActions from 'redux/contacts/contactsActions';
import {
  Contact,
  Info,
  InfoText,
  DeleteBtn,
  ApprovalText,
  ApprovalBtnWrapper,
  ApprovalBtn,
} from './ContactItem.styled';
import { Modal } from 'components';

export const ContactItem = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <Contact>
      <Info>
        <BiUser size={20} style={{ flex: '0 0 20px' }} />
        <InfoText>
          {name}: {number}
        </InfoText>
      </Info>
      <DeleteBtn type="button" onClick={() => setShowModal(s => !s)}>
        <RiDeleteBack2Line size={30} />
      </DeleteBtn>
      {showModal && (
        <Modal toggleModal={() => setShowModal(s => !s)}>
          <ApprovalText>
            Do you really want to delete this contact?
          </ApprovalText>
          <ApprovalBtnWrapper>
            <ApprovalBtn
              type="button"
              autoFocus
              onClick={() => setShowModal(s => !s)}
            >
              NO
            </ApprovalBtn>
            <ApprovalBtn
              type="button"
              onClick={() => dispatch(contactsActions.deleteContact(id))}
              lastEl={true}
            >
              YES
            </ApprovalBtn>
          </ApprovalBtnWrapper>
        </Modal>
      )}
    </Contact>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
