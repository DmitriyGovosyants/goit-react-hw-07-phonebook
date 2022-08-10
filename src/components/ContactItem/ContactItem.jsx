import PropTypes from 'prop-types';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { useState } from 'react';
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
import { useDeleteContactMutation } from 'redux/contacts/contactsApi';

export const ContactItem = ({ name, phone, id }) => {
  const [deleteContact, result] = useDeleteContactMutation();
  const [showModal, setShowModal] = useState(false);

  return (
    <Contact>
      <Info>
        <BiUser size={20} style={{ flex: '0 0 20px' }} />
        <InfoText>
          {name}: {phone}
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
              onClick={() => deleteContact(id)}
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
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
