import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import colors from './colors';
import fonts from './fonts';

var { height, width } = Dimensions.get("window");
export default StyleSheet.create({
  button: {
    backgroundColor: '#33aaff',
    borderWidth: 10,
    borderRadius: 20,
    width: 200,
    borderColor: '#33aaff',
    padding: 5
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  baseText: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 14,
    lineHeight: 20,
  },
  baseBoldText: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 14,
    lineHeight: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000066'
  },
  welcomePress: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  button: {
    backgroundColor: colors.darkGrey3,
    borderColor: colors.darkGrey3,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonPress: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  holeTypeContainer: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  lieTypeContainer: {
    width: width - 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultsContainer: {
    width: width - 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  enterShotContainer: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
    width: width - 40,
    marginTop: 20
  },
  puttingContainer: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
    width: width - 40,
    marginTop: 20
  },
  holeSummaryContainer: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
    width: width - 40,
  },
  scrollViewContainer: {
    // flex: 1,
    paddingBottom: 100,
    width: width - 40,
    marginLeft: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  card: {
    marginRight: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10
  },
  bgHome: {
    width: width,
    height: height,
    position: 'absolute',
    overflow: 'hidden'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.primary,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerContainerCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },

  //Home
  titleHeaderHome: {
    fontSize: 25,
    fontFamily: fonts.custom.regularMs,
  },
  titleHeaderBoldHome: {
    fontSize: 25,
    fontFamily: fonts.custom.boldMs,
    fontWeight: 'bold'
  },
  textHeaderHome: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 17
  },
  buttonNew: {
    color: colors.white,
    fontFamily: fonts.custom.boldMs,
    fontSize: 18,
    fontWeight: 'bold'
  },
  textTitleHome: {
    fontFamily: fonts.custom.boldMs,
    fontSize: 18,
    fontWeight: 'bold'
  },
  containerImageHome: {
    width: width - 40,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20
  },
  styleImageGolfer: {
    width: width - 40,
    height: 180
  },
  buttonNewRound: {
    width: width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 25,
    marginBottom: 20
  },
  containerEmptyDataHome: {
    width: width - 80,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingProgress: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
  loading: {
    width: width,
    height: height,
    position: "absolute",
    backgroundColor: colors.secondary,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },

  //RoundHistory
  cardHistory: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10
  },
  textTitleHistory: {
    fontSize: 20,
    fontFamily: fonts.custom.regularMs,
  },
  textTitleHistoryBold: {
    fontSize: 20,
    fontFamily: fonts.custom.boldMs,
    fontWeight: 'bold'
  },
  boxSubTitleHistory: {
    width: width - 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center'
  },
  textTitleCardRight: {
    fontSize: 14,
    textAlign: 'right',
    color: colors.darkGrey1,
    fontFamily: fonts.custom.regularOs,
  },
  contentBoxHistory: {
    width: width - 40,
    marginTop: -100,
    marginLeft: 20
  },
  containerEmptyDataRH: {
    width: width - 40,
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //RoundHistoryDetail
  cardHistoryDetail: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginLeft: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
    width: width - 40
  },
  textTitleRightRH: {
    fontSize: 16,
    textAlign: 'right',
    color: colors.black,
    fontFamily: fonts.custom.regularOs,
  },
  titleRHD: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 20
  },
  textSubTitleRHD: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 16,
  },
  textSubTitleRightRHD: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 16,
  },
  textTitleBoxRHD: {
    color: colors.primary,
    fontFamily: fonts.custom.boldOs,
    fontSize: 18,
  },
  textBoldSubBoxRHD: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 16,
  },
  textSubBoxRHD: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 16,
    lineHeight: 23,
  },
  textTitleSmallBoxRHD: {
    color: colors.white,
    fontFamily: fonts.custom.boldOs,
    fontSize: 16
  },
  textSmallBoxRHD: {
    color: colors.white,
    fontFamily: fonts.custom.regularOs,
    fontSize: 12
  },
  containerBoxHorizontal: {
    width: width / 4,
    // height: 60,
    height: 40,
    backgroundColor: colors.black,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  lineHeaderRHD: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    marginTop: 10,
    marginBottom: 10
  },

  //Globaal
  textTitleCard: {
    color: colors.secondary,
    fontFamily: fonts.custom.boldOs,
    fontSize: 18
  },
  textCard: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 16
  },
  textTitleBase: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 16
  },
  longButton: {
    width: width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.black
  },
  textLongButton: {
    fontSize: 18,
    fontFamily: fonts.custom.boldMs,
    color: colors.white
  },
  longSaveButton: {
    width: width - 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.black
  },
  textTitleInput: {
    color: colors.darkGrey,
    fontSize: 14,
    fontFamily: fonts.custom.regularOs,
  },
  containerSubHeader: {
    height: 120, 
    backgroundColor: colors.primary, 
    marginBottom: 40
  },
  contentSubHeader: {
    flex: 1, 
    flexDirection: 'column', 
    paddingTop: 10, 
    marginLeft: 40
  },
  containerBoxHeader: {
    flex: 1, 
    backgroundColor: colors.white, 
    overflow: "hidden"
  },
  iconBack: {
    width: 20,
    height: 20
  },
  subLittleBoxContainer: {
    width: width - 40, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginLeft: ((width/4)-20)/2,
  },

  //EnterRound
  headerContainerER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonSmall: {
    width: (width - 60) / 3,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeaderER: {
    fontSize: 20,
    fontFamily: fonts.custom.regularMs,
  },
  textBoldHeaderER: {
    fontSize: 20,
    fontFamily: fonts.custom.boldMs,
  },
  baseLongButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  redText: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 16,
    color: colors.red
  },

  //EnterShot
  subButtonSmall: {
    width: (width - 100) / 3,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSubBoxES: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.custom.regularOs,
  },
  subButtonSmallCustom: {
    width: (width - 100) / 3,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
    // alignItems: 'flex-start',
  },
  iconLieES: {
    width: 25, 
    height: 25, 
    marginRight: 5
  },
  contentButtonSmallES: {
    // marginLeft: 5, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSubBoxCustomES: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fonts.custom.regularOs,
    // flexWrap: 'wrap',
  },

  //RoundSummary
  contentBoxRS: {
    width: width - 40,
    marginTop: -100,
    marginLeft: 20
  },
  cardRS: {
    // height: 220, 
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10
  },
  cardSummary: {
    // height: 290, 
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10
  },
  boxInputName: {
    height: 50,
    width: width - 60,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20
  },
  textTitleModalBold: {
    fontSize: 20,
    fontFamily: fonts.custom.boldOs,
    fontWeight: 'bold'
  },
  baseTextRS: {
    fontFamily: fonts.custom.regularOs,
    fontSize: 16,
    color: colors.black
  },
  baseBoldTextRS: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 16,
    color: colors.black
  },
  containerFullModal: {
    width: width,
    height: height,
    justifyContent: 'center'
  },
  containerBackImage: {
    width: width - 40,
    height: 50,
    alignItems: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20
  },
  containerBoxContentModal: {
    width: width - 60,
    height: (height / 2) - 100,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageModalGolfer: {
    width: (width - (width / 3)), 
    height: (height / 2) + 30
  },
  containerImageModalRS: {
    width: width, 
    height: (height / 2) + 30, 
    alignItems: 'flex-end', 
    marginTop: 20
  },
  textSubTitleModalRS: {
    fontFamily: fonts.custom.boldOs,
    fontSize: 20,
    textAlign: 'center'
  },
  containerModalRS: {
    width: width-30, 
    borderRadius:10, 
    justifyContent:'center', 
    alignItems:'center'
  },
  containerContentModalRS: {
    marginTop:20, 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems:'center'
  },
  boxTwoModalRS: {
    flexDirection:'row', 
    justifyContent: 'center', 
    marginTop: 30, 
    marginBottom:20
  },
  buttonModalRS: {
    width: 100, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: colors.primary
  },

  //Login
  footerContent: {
    height: 50,
    width: width,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 50,
  },
  footerText: {
    fontFamily: fonts.custom.regularMs,
    fontSize: 14,
    textAlign: "center"
  },
  footerTextTwo: {
    fontFamily: fonts.custom.boldMs,
    fontSize: 14,
    textAlign: "center",
    marginTop: Platform.OS === "android" ? 5 : 0,
    marginBottom: Platform.OS === "android" ? 5 : 0
  },

  //Register
  containerImageRegister: {
    width: width - 40,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
    marginLeft: 20
  },

  //Globall
  boxInputAuth: {
    height: 50,
    width: width - 40,
    backgroundColor: colors.white,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10
  },
  textTitleAuth: {
    fontFamily: fonts.custom.boldMs,
    fontSize: 25,
    fontWeight: 'bold'
  },
  styleBgImage: {
    width: width, 
    // height: height+90, 
    height: height+20,
    position: 'absolute',
    overflow: 'hidden',
    // backgroundColor: colors.white
  },
  textInputAuth: {
    paddingLeft: 20,
    fontFamily: fonts.custom.regularOs,
    fontSize: 16,
  },

  //Drill
  containerBox: {
    width: width-40,
    height: 100,
    flexDirection: 'row',
    marginBottom: 20
  },
  smallBox: {
    width: (width-60)/2,
    height: 100,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSmallBoxDrill: {
    color: colors.black,
    fontFamily: fonts.custom.boldOs,
    fontSize: 18
  },

  //DrillHistory
  containerBoxDH: {
    width: width-40,
    height: 100,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtonBottom: {
    height: 70, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: colors.white
  }
});
