import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import lang from '../languages';
import Link from '../components/Link';
import BaseLayout from '../layouts/base';
import Card from '../components/Card';
import Column from '../components/Column';
import SubscribeForm from '../components/SubscribeForm';
import Button from '../components/Button';
import MetamaskLogo from '../components/MetamaskLogo';
// import WalletConnectLogo from '../components/WalletConnectLogo';
import LedgerLogo from '../components/LedgerLogo';
import TrezorLogo from '../components/TrezorLogo';
import metamaskWhite from '../assets/metamask-white.png';
// import walletConnectWhite from '../assets/walletconnect-white.svg';
import { getLocal } from '../helpers/utilities';
import { accountConnectMetamask, accountUpdateWalletConnect } from '../reducers/_account';
import { modalOpen } from '../reducers/_modal';
import { responsive } from '../styles';

const StyledCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (${responsive.sm.max}) {
    flex-direction: column;
    justify-content: ;
  }
`;

const StyledMetamaskConnect = styled(Column)`
  padding: 15px;
  & > * {
    margin: 24px;
  }
`;

// const StyledWalletConnect = styled(Column)`
//   padding: 15px;
//   & > * {
//     margin: 24px;
//   }
// `;

const StyledHardwareWallets = styled(Column)`
  padding: 15px;
  & > * {
    margin: 10px;
  }
  & > div:last-child {
    margin-top: 32px;
  }
`;

class Home extends Component {
  onWalletConnectInit = () => {
    const storedAddress = getLocal('walletconnect');
    if (storedAddress) {
      this.props.accountUpdateWalletConnect(storedAddress);
      this.props.history.push('/wallet');
    } else {
      this.props.modalOpen('WALLET_CONNECT_INIT', null);
    }
  };
  render = () => (
    <BaseLayout>
      <Card>
        <StyledCardContainer>
          <StyledHardwareWallets>
            <LedgerLogo />
            <TrezorLogo />
            <SubscribeForm />
          </StyledHardwareWallets>

          {/* <StyledWalletConnect>
            <WalletConnectLogo />
            <Button
              left
              color="walletconnect"
              icon={walletConnectWhite}
              onClick={this.onWalletConnectInit}
            >
              {lang.t('button.connect_walletconnect')}
            </Button>
          </StyledWalletConnect> */}

          <StyledMetamaskConnect>
            <MetamaskLogo />
            <Link to="/metamask">
              <Button left color="orange" icon={metamaskWhite} onClick={accountConnectMetamask}>
                {lang.t('button.connect_metamask')}
              </Button>
            </Link>
          </StyledMetamaskConnect>
        </StyledCardContainer>
      </Card>
    </BaseLayout>
  );
}

Home.propTypes = {
  accountConnectMetamask: PropTypes.func.isRequired,
  accountUpdateWalletConnect: PropTypes.func.isRequired,
  modalOpen: PropTypes.func.isRequired
};

export default connect(null, {
  modalOpen,
  accountConnectMetamask,
  accountUpdateWalletConnect
})(Home);
