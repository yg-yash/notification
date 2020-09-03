import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Platform,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import InputCard from '../inputCardView/Input';
import { DyScanModule } from '@dyneti/react-native-dyscan';

import InputText from '../inputView/Input';
import * as screenImages from '../../../../config/ImageProperties';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import DropDownV2 from '../../../../common/Components/DropDownV2';
import DropDown from 'react-native-picker-select';
import HTML from 'react-native-render-html';
// import Modal from 'react-native-modal';
import { default as Modal } from '../../../../common/ModalWrapper';

// import {ComparedProductDetails} from '../comparedProductDetails/view/index.js';
// import {ComparedProductDescription} from '../comparedProductDescription/view/index.js';
import { CustomLogger } from '../../../../utils/customLogger';
import { AddCardViewStyle } from './style.js';
import CardScanner from '../../../../common/functional/CardScanner';
// import DropDownPicker from 'react-native-dropdown-picker'
import DropDownPicker from 'react-native-material-dropdown';
import { zip } from 'rxjs';

const styles = StyleSheet.create(AddCardViewStyle);

export class GuestAddCreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBenifitsSelection: false,
      isCompareEnabled: false,
      cardSelection: false,
      isCVVEntered: false,
      isCardVisible: false,
      emptyFiledsErroForGiftNo: false,
      emptyFiledsErroForCardNo: false,
      emptyFiledsErroForMonth: false,
      emptyFiledsErroForYear: false,
      emptyFiledsErroForCVV: false,
      errorFieldCVV: false,
      monthVal: '',
      yearVal: '',
      cardNumber: '',
      cvvNo: '',
      active: false,
      cardImageType: '',
      isAddInfoModal: false,
      resetCVV: false,
      focusCVV: false,
      cardImageSource: '',
      myMonth: false,
      isMonth: false,
      isMonthVisible: false,
      pickerMonth: '05',
    };
    this.selectedInfoIndex = 0;
    this.savedCardsDetails = [{}, {}, {}];
    this.cardDetails = { cardName: '', cardType: '', month: '', year: '' };
    this.month = [
      { value: '01' },
      { value: '02' },
      { value: '03' },
      { value: '04' },
      { value: '05' },
      { value: '06' },
      { value: '07' },
      { value: '08' },
      { value: '09' },
      { value: '10' },
      { value: '11' },
      { value: '12' },
    ];
    // this.month = [
    //   {label:"01", value: '01' },
    //   {label:"02", value: '02' },
    //   {label:"03", value: '03' },
    //   {label:"04", value: '04' },
    //   {label:"05", value: '05' },
    //   {label:"06", value: '06' },
    //   {label:"07", value: '07' },
    //   {label:"08", value: '08' },
    //   {label:"09", value: '09' },
    //   {label:"10", value: '10' },
    //   {label:"11", value: '11' },
    //   {label:"12", value: '12' },

    // ];
    this.year = [
      { value: '2020' },
      { value: '2021' },
      { value: '2022' },
      { value: '2023' },
      { value: '2024' },
      { value: '2025' },
      { value: '2026' },
      { value: '2027' },
      { value: '2028' },
      { value: '2029' },
      { value: '2030' },
      { value: '2031' },
    ];
    this.source = '';
    this.saveCheckBoxTapped = this.saveCheckBoxTapped.bind(this);
    this.sendVerifiedData = this.sendVerifiedData.bind(this);
    this.tscBussinessCardAdded = false;
    this.cardName = '';
    this.ddMonth = React.createRef();
    this.handleCardBenifitsSelection = this.handleCardBenifitsSelection.bind(
      this,
    );
    this.monthRef = React.createRef();
  }
  _removeErrorText() {
    this.setState({
      emptyFiledsErroForGiftNo: false,
      emptyFiledsErroForCardNo: false,
      emptyFiledsErroForMonth: false,
      emptyFiledsErroForYear: false,
      emptyFiledsErroForCVV: false,
      errorFieldCVV: false,
    });
  }
  closeModal() {
    this.props.closeAddCardModal();
  }
  saveCheckBoxTapped() {
    this.setState({
      isCompareEnabled: !this.state.isCompareEnabled,
    });
    var saveCardEnable = !this.state.isCompareEnabled;
    //CustomLogger.log("savedCardForNextUse>>",saveCardEnable);
    if (saveCardEnable === true) {
      this.props.savedCardForNextUse(saveCardEnable);
    }
  }

  sendVerifiedData() {
    let cardNumber = this.state.cardNumber.length;
    CustomLogger.log('sendVerifiedData>>', cardNumber);
    if (cardNumber < 19) {
      cardNumber = '';
    }
    this.props.placeOrderAction(
      cardNumber,
      this.state.monthVal,
      this.state.yearVal,
      this.state.cvvNo,
    );
  }

  //this.props.savedCardInfo()
  onCardChange(txt) {
    let text = txt;
    if (text !== '') {
      this.setState({ cardNumber: text, resetCVV: false });
    } else {
      this.setState({ resetCVV: true, cvvNo: '' });
      this.props.savedCardCvv('');
    }

    //CustomLogger.log("text>>",text);
    text = text.split(' ').join('');

    if (text !== '') {
      //CustomLogger.log('text', text);
      var tscBcc = new RegExp('6035301[0-9]');
      var tscCard = new RegExp('^6011575[0-9]');
      var visaCard = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
      var amexCard = new RegExp('^3[47][0-9]{13}$');
      var masterCard = new RegExp('^5[1-5][0-9]{14}$');
      var discoverCard = new RegExp('^6011[0-9]{12}|65[0-9]{14}$');

      if (text !== '') {
        if (visaCard.test(text)) {
          //CustomLogger.log('visa card', visaCard.test(text));
          this.source = screenImages.images.visaCard;
          isvalid = true;
          this.props.savedCardName('VISA');
          this.cardName = 'VISA';
          this.tscBussinessCardAdded = false;
        } else if (masterCard.test(text)) {
          this.source = screenImages.images.mastercard;
          isvalid = true;
          this.props.savedCardName('Master Card');
          this.cardName = 'Master Card';
          this.tscBussinessCardAdded = false;
        } else if (amexCard.test(text)) {
          this.source = screenImages.images.americalExpCard;
          isvalid = true;
          this.props.savedCardName('AMEX');
          this.cardName = 'AMEX';
          this.tscBussinessCardAdded = false;
        } else if (
          discoverCard.test(text) &&
          text.startsWith('60115750') === false
        ) {
          this.source = screenImages.images.discoverCard;
          isvalid = true;
          this.props.savedCardName('Discover');
          this.cardName = 'Discover';
          this.tscBussinessCardAdded = false;
        } else if (tscCard.test(text)) {
          this.source = screenImages.images.tscCard;
          isvalid = true;
          this.props.savedCardName('TSC Card');
          this.cardName = 'TSC Card';
          this.tscBussinessCardAdded = true;
          if (text && text.length === 16) {
            // Call the API only when valid card no: is added
            this.props.getFinanceList();
          }
        } else if (tscBcc.test(text)) {
          this.source = screenImages.images.tscBussiness;
          isvalid = true;
          this.props.savedCardName('TSC Business Card');
          this.cardName = 'TSC Business Card';
          this.tscBussinessCardAdded = true;
        } else {
          this.source = '';
          isvalid = false;
        }
        this.setState({ isCardVisible: isvalid, cardImageSource: this.source });
      } else {
        this.setState({ isCardVisible: false });
      }
    }

    if (text === '') {
      this.setState({ monthVal: null, yearVal: null, cvvNo: '' });
    }
  }

  //toggle picker month
  togglePicker = () =>
    this.setState(prevState => ({ showMonth: !prevState.showMonth }));

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.financeListOption !== this.props.financeListOption) {
      if (
        this.props.financeListOption &&
        this.props.financeListOption.financeList &&
        this.props.financeListOption.financeList.financePlansList.length == 0
      ) {
        this.props.refreshPaymentInfoCall();
      }
      this.setState({
        refresh: !this.state.refresh,
        cardBenifitsSelection: '',
      });
    }
  }

  onCvvChange(cvvNumber) {
    const cvvDigits = this.cardName === 'AMEX' ? 4 : 3;
    const cvv = new RegExp('[0-9]{' + cvvDigits + '}');

    if (cvvNumber !== '') {
      if (
        !cvv.test(cvvNumber) ||
        (cvvDigits === 3 && cvvNumber === '000') ||
        (cvvDigits === 4 && cvvNumber === '0000')
      ) {
        this.setState({ errorFieldCVV: true });
        this.props.savedCardCvv('');
      } else {
        this.props.savedCardCvv(cvvNumber);
      }
    } else {
      this.props.savedCardCvv('');
    }
  }

  onSaveAction = () => {
    if (this.state.cardNumber === '') {
      this.setState({
        emptyFiledsErroForCardNo: true,
      });
    }
    if (this.state.monthVal === '') {
      this.setState({
        emptyFiledsErroForMonth: true,
      });
    }
    if (this.state.yearVal === '') {
      this.setState({
        emptyFiledsErroForYear: true,
      });
    }
    if (this.state.cvvNo === '') {
      this.setState({
        emptyFiledsErroForCVV: true,
      });
    }
  };

  handleCardBenifitsSelection(cardSelectionIndex, item) {
    //CustomLogger.log('enterd no>>', cardSelectionIndex);
    this.props.refreshPaymentInfoCall(item.customerSegmentName);
    this.props.setSelectedFinancePlan(item.planNum);
    this.setState({
      cardBenifitsSelection: cardSelectionIndex,
      // isCVVEntered: false,
    });
  }

  viewFinanceInfo = index => {
    this.selectedInfoIndex = index;
    this.setState({
      isAddInfoModal: !this.state.isAddInfoModal,
    });
  };

  closeInfoModal = () => {
    return this.setState(prevState => ({
      ...prevState,
      isAddInfoModal: false,
    }));
  };

  agreeEvent = () => {
    this.setState({
      isAddInfoModal: false,
    });
  };

  declineEvent = () => {
    this.props.setSelectedFinancePlan('');
    this.setState({
      cardBenifitsSelection: '',
      // isCVVEntered: false,
    });
    this.setState({
      isAddInfoModal: false,
    });
  };

  _renderInfoModalView = () => {
    if (
      this.props.financeListOption !== '' &&
      this.props.financeListOption !== undefined &&
      this.props.financeListOption.financeList !== undefined
    ) {
      return (
        <View style={styles.infoModalBody}>
          <TouchableOpacity
            style={styles.infoModalClose}
            onPress={() => this.closeInfoModal()}>
            <Image
              style={styles.closeIcon}
              source={screenImages.images.closeXLg}
            />
          </TouchableOpacity>
          {this.props.financeListOption &&
          this.props.financeListOption.financeList &&
          this.props.financeListOption.financeList.financePlansList.length >
            0 ? (
            <HTML
              html={
                this.props.financeListOption.financeList.financePlansList[
                  this.selectedInfoIndex
                ].disclosureText
              }
            />
          ) : null}
          {this.props.isAgreeDeclineForPLCCEnabled === 'true' && (
            <View style={{ flexDirection: 'row', marginTop: 40 }}>
              <TouchableOpacity onPress={() => this.agreeEvent()}>
                <View
                  style={{
                    width: 140,
                    height: 40,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontFamily: 'Roboto-Bold',
                    }}>
                    Agree
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.declineEvent()}>
                <View
                  style={{
                    width: 140,
                    height: 40,
                    marginLeft: 10,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontFamily: 'Roboto-Bold',
                    }}>
                    Decline
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
  };

  _renderCardBenifitView() {
    return (
      <View>
        <View style={styles.dividerView} />
        <Text
          style={{
            marginLeft: 24,
            marginTop: 24,
            fontSize: 14,
            letterSpacing: 0.5,
            color: 'black',
            fontFamily: 'Roboto-Bold',
          }}>
          TSC Cardmember Benefits
        </Text>
        <Text
          style={{
            marginLeft: 24,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 12,
            letterSpacing: 0.4,
            color: '#3D3D3F',
            fontFamily: 'Roboto-Regular',
          }}>
          Use one of the following offers:
        </Text>
        <FlatList
          style={{ marginTop: 0 }}
          data={
            this.props.financeListOption !== undefined &&
            this.props.financeListOption.financeList !== undefined
              ? this.props.financeListOption.financeList.financePlansList
              : null
          }
          renderItem={this._renderCardBenifits}
          extraData={this.state}
        />
      </View>
    );
  }

  _renderCardBenifits = ({ item, index }) => (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', marginLeft: 18 }}>
        <TouchableOpacity
          accessibilityLabel={
            this.state.cardBenifitsSelection !== index
              ? item.displayName + ' is not selected radio button'
              : item.displayName + ' is selected radio button'
          }
          onPress={() => this.handleCardBenifitsSelection(index, item)}>
          {this.state.cardBenifitsSelection !== index ? (
            <Image
              style={styles.radioButtonStyle}
              source={screenImages.images.radioButtonUnselected}
            />
          ) : (
            <Image
              style={styles.radioButtonStyle}
              source={screenImages.images.radioButtonSelected}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.cardBenifitText}>{item.displayName}</Text>

        <TouchableOpacity
          onPress={() => this.viewFinanceInfo(index)}
          style={{ marginLeft: 50, marginRight: 14 }}
          accessibilityLabel={'Info Button'}>
          <Image
            style={styles.infoIconStyle}
            source={screenImages.images.info}
          />
        </TouchableOpacity>
      </View>
      {this.savedCardsDetails.length - 1 !== index ? (
        <View style={styles.rightSideDividerView} />
      ) : (
        <View style={styles.dividerView} />
      )}
    </View>
  );

  checkFinacingOptionAvaibility = () => {};

  // openScanner () {
  //   DyScanModule
  //     .scanCard({apiKey:'H4dGlDlNYhq4SWYFpCmJiIzb6vt4ExbLNbhkhcLELiIzR0tVLrCzJ2At0336'})
  //     .then(card => {
  //       // the scanned card
  //       // Access the fields cardNumber, expiryMonth, or expiryYear
  //       console.log(JSON.stringify(card))
  //       console.log(card.cardNumber);
  //       console.log(card.expiryYear);
  //       console.log(card.expiryMonth)
  //       this.setState({cardNumber: card.cardNumber, monthVal: this.twoDigitsOnly(card.expiryMonth), yearVal: '20'+card.expiryYear}, () => {
  //         console.log('Card number after set: ' + this.state.cardNumber);
  //         this.forceUpdate();
  //       })
  //     })<dyscan
  //     .catch(() => {
  //       // the user cancelled
  //     })
  // }

  twoDigitsOnly(n) {
    return n > 9 ? '' + n : '0' + n;
  }
  onCardScan = card => {
    console.log('onCardScan in Guest: ' + JSON.stringify(card));
    if (card) {
      this.setState(
        {
          cardNumber: card.cardNumber,
          monthVal: this.twoDigitsOnly(card.expiryMonth),
          yearVal:
            Platform.OS == 'android'
              ? card.expiryYear.toString()
              : `20${card.expiryYear}`,
        },
        () => {
          this.forceUpdate();
          if (
            card.cardNumber &&
            card.cardNumber != '' &&
            card.cardNumber != 0
          ) {
            this.onCardChange(card.cardNumber);
          }

          if (
            !card.cardNumber ||
            card.cardNumber === '' ||
            card.cardNumber == null
          ) {
            console.log('cardNumber is Emptyyyyyy');

            // focus on Card Number
            this.inputFieldCardNumber.blur();
            setTimeout(
              () => {
                this.inputFieldCardNumber.focus();
              },
              Platform.OS === 'android' ? 100 : 0,
            );
          } else if (
            !card.expiryMonth ||
            card.expiryMonth === '' ||
            card.expiryMonth == null ||
            card.expiryMonth == 0
          ) {
            // focus on Month
            //this.toggleMonth();
            // this.ddMonth.blur();
            // setTimeout(() => { this.ddMonth.focus()}, Platform.OS === 'android' ? 100 : 0)
            console.log('Month is Emptyyyyyy');
            setTimeout(() => {
              this.setState({ myMonth: true });
            }, 1000);
            //this.setState({myMonth : true});
            // this.ddMonth.current.toggleMe();

            // this.ddMonth.focus();
            // this.ddMonth.current.forEach(child => {
            //   child.toggleMe(); // you can access child method here
            // });
          } else if (
            !card.expiryYear ||
            card.expiryYear === '' ||
            card.expiryYear == null ||
            card.expiryYear == 0
          ) {
            console.log('Year is Emptyyyyyy');

            // focus on Year
            //   this.ddYear?.blur();
            //setTimeout(() => { this.ddYear.focus()}, Platform.OS === 'android' ? 100 : 0)
            //this.setState({myMonth : true});
            // this.ddYear.focus();
            //  this.ddYear.current.forEach(child => {
            //    child.toggleMe(); // you can access child method here
            // });
          } else if (card.cardNumber && card.expiryMonth && card.expiryYear) {
            console.log('Nothinggg is Emptyyyyyy');

            this.inputFieldCVV.blur();
            setTimeout(
              () => {
                this.inputFieldCVV.focus();
              },
              Platform.OS === 'android' ? 1000 : 0,
            );
          }
        },
      );
    }
  };
  toggleMonth = () =>
    this.setState(prevState => ({ isMonthVisible: !prevState.isMonthVisible }));

  render() {
    //CustomLogger.log("list>>", this.props.financeListOption);
    console.log(this.pickerRef);
    const {
      selectedProducts,
      changeCompareProduct,
      store,
      goToProductDetails,
    } = this.props;
    return (
      <View
        pointerEvents={this.props.isPaypalSuccess ? 'none' : 'auto'}
        style={
          this.props.isPaypalSuccess
            ? styles.ParentViewDisabld
            : styles.ParentView
        }>
        <View style={{ marginTop: 28 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.cardLabel}>Credit or Debit Card</Text>
            <CardScanner onCardScan={this.onCardScan} />
          </View>
          <View style={{ marginLeft: 16 }}>
            <InputCard
              ref={input => {
                this.inputFieldCardNumber = input;
              }}
              showCardType={this.state.isCardVisible}
              viewWidth={296}
              width={87}
              name="Card Number*"
              placeholder="Card Number*"
              placeOrderAction={this.sendVerifiedData}
              removeFields={() => this._removeErrorText()}
              savedCardInfo={this.props.savedCardInfo}
              // savedCardName={this.savedCardName}
              // savedCardMonth={this.savedCardMonth}
              // savedCardYear={this.savedCardYear}
              error={
                this.state.emptyFiledsErroForCardNo === true ? true : false
              }
              keyboardType="number-pad"
              //style={styles.placeHolderStyle}
              //digitLimit={20}
              onChangeText={text => {
                this.onCardChange(text);
                //this.ddMonth.current.toggleMe();
                //  if(text.length ==3)
                //    this.setState({myMonth : true});
              }}
              cardImageType={this.state.cardImageSource}
              value={this.state.cardNumber}
            />
          </View>
          {this.state.emptyFiledsErroForCardNo === true ? (
            // <Text style={compStyle.invalidText}>INVALID NUMBER</Text>
            <Text style={styles.invalidText}>REQUIRED</Text>
          ) : null}
        </View>

        {/* <View style={styles.cardDetailsStyle1}> */}
        <View style={{ flexDirection: 'row', flex: 3 }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            {/* <View style={styles.textinputLayout}>
              <InputDropdown
                data={this.month}
                value="MM*"
                name='MM*'
                itemCount={7}
                placeOrderAction={this.sendVerifiedData}
                style={styles.shipmentDuration}
                containerStyle={styles.dropDownView}
                pickerStyle={styles.pickerStyleMonth}
                onSubmitSave={this.onSubmitSave}
                baseColor="white"
                itemColor="rgba(0, 0, 0, 0.87)"
                itemTextStyle={styles.duration}
                textColor="rgb(61, 61, 63)"
                savedCardMonth={this.props.savedCardMonth}
                savedCardYear={this.props.savedCardYear}
                bussinessCardAdded={this.tscBussinessCardAdded}
                viewWidth={82}
                width={34}
                accessibilityLabel="Month dropdown"
                placeholder="MM"
                removeFields={() => this._removeErrorText()}
                error={
                  this.state.emptyFiledsErroForMonth === true ? true : false
                }
                onChangeText={monthValue =>
                  this.setState({monthVal: monthValue, active: true})
                }
              />
            </View> */}
            <View style={styles.textinputLayout}>
              {/* <DropDownV2


items={this.month.map(item => ({
  ...item,
  label: item.value
}))}
pickerRef={e=>this.pickerRef=e}

label={this.state.monthVal && "MM*"}
placeholderLabel={"MM"}
accessibilityLabel={`Month Dropdown ${this.state.monthVal? this.state.monthVal:''}`}
onValueChange={(value) => {
  this.setState({ monthVal: value, active: true });
  this.props.savedCardMonth(value);
}}
cardAdded={this.tscBussinessCardAdded}
style={{
  viewContainer: {
    borderColor: this.state.emptyFiledsErroForMonth ? '#B5121B' : '#807F83',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderRadius: 8,
    height: 48,
    display: 'flex',
  }
}}
value={this.state.monthVal}
onSelect = {this.state.myMonth}
/>  */}

              {/* <DropDownPicker
items={this.month}
// zIndex={500}

isVisible={this.state.isMonthVisible}

containerStyle={{
  borderColor: this.state.emptyFiledsErroForMonth ? '#B5121B' : '#807F83',

  borderWidth: 1.5,
  borderRadius: 8,
  height: 48,

}}

placeholder="MM"
placeholderStyle={{
  fontSize:12,
  lineHeight:16,
 fontStyle:'italic',
  color: Platform.OS === 'android' ? "#989898": "#BEBDBF"
}}

style={{
    backgroundColor:'white',
  // marginBottom:20
}}
dropDownStyle={{

  backgroundColor:'white',
  // marginBottom:20

}}
itemStyle={{
  // marginLeft: '5%',
 justifyContent: 'flex-start',

}}


// listProps={{
//   nestedScrollEnabled: true
// }}

arrowColor="#B5121B"
onChangeItem={(item) => {
  this.setState({ pickerMonth: item.value });
  this.props.savedCardMonth(item.value);
}}
onOpen={this.toggleMonth}
onClose={this.toggleMonth}
/> */}
              {/* 
<DropDownPicker
data={this.month}
// zIndex={500}
label="MM"

containerStyle={{
  borderColor: this.state.emptyFiledsErroForMonth ? '#B5121B' : '#807F83',

  borderWidth: 1.5,
  borderRadius: 8,
  height: 48,

}}





// arrowColor="#B5121B"
onChangeItem={(item) => {
  this.setState({ pickerMonth: item.value });
  this.props.savedCardMonth(item.value);
}}
onOpen={this.toggleMonth}
onClose={this.toggleMonth}
/> */}
            </View>
            {this.state.emptyFiledsErroForMonth === true ? (
              // <Text style={compStyle.invalidText}>INVALID NUMBER</Text>
              <Text style={styles.invalidText}>REQUIRED</Text>
            ) : null}
            {/* </View> */}
          </View>

          <View style={{ flexDirection: 'column', flex: 1.25 }}>
            <View style={styles.textInputYearStyle}>
              <DropDownV2
                items={this.year.map(item => ({
                  ...item,
                  label: item.value,
                }))}
                label={this.state.yearVal && 'YYYY*'}
                placeholderLabel={'YYYY'}
                accessibilityLabel={`Year Dropdown ${
                  this.state.yearVal ? this.state.yearVal : ''
                }`}
                onValueChange={value => {
                  this.setState({ yearVal: value, active: true });
                  this.checkFinacingOptionAvaibility();
                  this.props.savedCardYear(value);
                }}
                cardAdded={this.tscBussinessCardAdded}
                style={{
                  viewContainer: {
                    borderColor: this.state.emptyFiledsErroForMonth
                      ? '#B5121B'
                      : '#807F83',
                    backgroundColor: 'white',
                    borderWidth: 1.5,
                    borderRadius: 8,
                    height: 48,
                    display: 'flex',
                  },
                }}
                value={this.state.yearVal}
              />

              {/* <DropdownV2
                items={this.year.map(item => ({
                  ...item,
                  label: item.value
                }))}
                placeholderLabel={"YYYY"}
                label={this.state.yearVal && "YYYY*"}
                accessibilityLabel={`Year Dropdown ${this.state.yearVal? this.state.yearVal : ''}`}
                onValueChange={(value) => {
                  this.setState({ yearVal: value, active: true });
                  this.checkFinacingOptionAvaibility();
                  this.props.savedCardYear(value);
                }}
                cardAdded={this.tscBussinessCardAdded}
                style={{
                  viewContainer: {
                    borderColor: this.state.emptyFiledsErroForYear ? '#B5121B' : '#807F83',
                    backgroundColor: 'white',
                    borderWidth: 1.5,
                    borderRadius: 8,
                    height: 48,
                    display: 'flex',
                  }
                }}
                value={this.state.yearVal}
              /> */}
              {/* <InputDropdown
                data={this.year}
                value="YYYY*"
                name='YYYY*'
                itemCount={7}
                style={styles.yearDuration}
                placeOrderAction={this.sendVerifiedData}
                savedCardMonth={this.props.savedCardMonth}
                savedCardYear={this.props.savedCardYear}
                containerStyle={styles.yeardropDownView}
                // selectedItemColor='rgba(0, 0, 0, 0.87)'
                baseColor="white"
                itemColor="rgba(0, 0, 0, 0.87)"
                itemTextStyle={styles.duration}
                pickerStyle={styles.pickerStyleYear}
                textColor="rgb(61, 61, 63)"
                viewWidth={92}
                width={45}
                bussinessCardAdded={this.tscBussinessCardAdded}
                accessibilityLabel="Year dropdown"
                placeholder="YYYY"
                removeFields={() => this._removeErrorText()}
                error={
                  this.state.emptyFiledsErroForYear === true ? true : false
                }
                onChangeText={yearValue =>
                  this.setState({yearVal: yearValue, active: true})
                }
              /> */}
            </View>
            {this.state.emptyFiledsErroForYear === true ? (
              // <Text style={compStyle.invalidText}>INVALID NUMBER</Text>
              <Text style={styles.invalidText}>REQUIRED</Text>
            ) : null}
          </View>

          <View style={{ flexDirection: 'column', flex: 1.25 }}>
            <InputText
              //viewWidth={106}
              ref={input => {
                this.inputFieldCVV = input;
              }}
              focus={this.state.focusCVV}
              width={36}
              placeholder="CVV"
              name={'CVV*'}
              resetCVV={this.state.resetCVV}
              placeOrderAction={this.sendVerifiedData}
              savedCardCvv={() => this.onCvvChange(this.state.cvvNo)}
              removeFields={() => this._removeErrorText()}
              error={
                this.state.emptyFiledsErroForCVV || this.state.errorFieldCVV
              }
              keyboardType="number-pad"
              //style={styles.placeHolderStyle}
              digitLimit={this.cardName === 'AMEX' ? 4 : 3}
              onChangeText={cvvNumber => {
                this.setState({ cvvNo: cvvNumber });
              }}
              value={this.state.cvvNo}
            />
            {this.state.emptyFiledsErroForCVV === true ? (
              // <Text style={compStyle.invalidText}>INVALID NUMBER</Text>
              <Text style={styles.invalidText}>REQUIRED</Text>
            ) : null}
            {this.state.errorFieldCVV === true ? (
              <Text style={styles.invalidText}>INVALID CVV</Text>
            ) : null}
          </View>
        </View>
        {/* </View> */}

        {/* savedCardForNextUse={this.savedCardForNextUse} */}
        <View style={styles.labelViewCls1}>
          <TouchableOpacity
            onPress={() => this.saveCheckBoxTapped()}
            accessible={true}
            accessibilityLabel={`Save Card For Future Use checkbox ${
              this.state.isCompareEnabled ? 'checked' : 'unchecked'
            }`}
            style={styles.compareView}>
            <Image
              style={
                this.state.isCompareEnabled
                  ? styles.compareIconChecked
                  : styles.compareIcon
              }
              source={
                this.state.isCompareEnabled
                  ? screenImages.images.enabledCheckbox
                  : screenImages.images.offCheckBox
              }
            />
            <Text style={styles.compareText}>Save Card For Future Use</Text>
          </TouchableOpacity>
        </View>

        {this.state.cardNumber.startsWith('60115750') &&
        this.props.financeListOption !== undefined &&
        this.props.financeListOption.financeList !== undefined &&
        this.props.financeListOption.financeList !== '' &&
        this.props.financeListOption.financeList.financePlansList.length > 0 &&
        this.props.isPLCCEnabled === 'true'
          ? this._renderCardBenifitView()
          : null}

        <Modal
          useNativeDriver={true}
          isVisible={this.state.isAddInfoModal}
          style={styles.infoModalStyle}>
          {this._renderInfoModalView()}
        </Modal>
      </View>
    );
  }
}
