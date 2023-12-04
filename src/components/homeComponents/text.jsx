import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faClose, faCopy, faMinus, faPercentage, faArrowRightArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons"

export const rates = {
    caption: 'Rates',
    localCurrencyHeading: 'Location',
    col1Heading: 'Currency',
    col2Heading: 'BUY',
    col3Heading: 'SELL',
    addRow: <FontAwesomeIcon icon={faPlus}/>,
    closeRow: <FontAwesomeIcon icon={faClose}/>,
    resetRow: <FontAwesomeIcon icon={faRefresh}/>
}

export const converterDetails = {
    tab1Caption: 'Convert',
    tab2Caption: 'Find Out',
    leftHeading: 'From',
    rightHeading: 'To',
    addRow: <FontAwesomeIcon icon={faPlus}/>,
    copyOutput: <FontAwesomeIcon icon={faCopy}/>,
    closeRow: <FontAwesomeIcon icon={faClose}/>,
    resetRow: <FontAwesomeIcon icon={faRefresh}/>,
    switchButton: <FontAwesomeIcon icon={faArrowRightArrowLeft}/>,
    tab1DescriptionText: 'Convert to another currency',
    tab2DescriptionText: 'Find out the cost of a currency before conversion'
}

export const commissionDetails = {
    tab1Caption: 'Remove',
    tab2Caption: 'Add',
    tab1Icon: <FontAwesomeIcon icon={faMinus}/>,
    tab2Icon: <FontAwesomeIcon icon={faPlus}/>,
    addRow: <FontAwesomeIcon icon={faPlus}/>, 
    heading1: 'Amount',
    heading2: <FontAwesomeIcon icon={faPercentage}/>,
    heading3: 'Commission',
    heading4: 'Result',
    copyOutput: <FontAwesomeIcon icon={faCopy}/>,
    closeRow: <FontAwesomeIcon icon={faClose}/>,
    resetRow: <FontAwesomeIcon icon={faRefresh}/>,
    tab1DescriptionText: 'Remove percentage from an amount',
    tab2DescriptionText: 'Add percentage to an amount before deduction'
}

export const ratesTooltips = {
    ttLocationbutton: 'Set your local currency',    
    ttAddRow: 'Add an extra row',
    ttCurrencyButton: 'Select a currency',
    ttResetButton: 'Reset ',
    ttCloseButton: 'Close '
}

export const converterTooltips = {
    ttCurrencyButton: 'Select a currency',
    ttAddRow: 'Add an extra row',
    ttCopyResult: 'Copy ',
    ttReset: 'Reset',
    ttCloseButton: 'Close ',
    ttSwitchValues: 'Switch currency values'
}

export const commissionTooltips = {
    ttAddRow: 'Add an extra row',
    ttCopyResult: 'Copy ',
    ttReset: 'Reset ',
    ttCloseButton: 'Close ',
}