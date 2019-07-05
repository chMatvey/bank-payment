import React from 'react'
import {connect} from "react-redux"
import Input from 'arui-feather/input'
import RadioGroup from 'arui-feather/radio-group'
import Radio from 'arui-feather/radio'
import Card from './component/card/card'
import Button from "arui-feather/button";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: '',
            cardNumber: '',
            ownerName: '',
            cvc: '',
            isCorrectSum: false,
            isCorrectCardNumber: false,
            isCorrectOwnerName: false,
            isCorrectCVC: false,
            money: '₽'
        };

        this.handleMoneyChange = this.handleMoneyChange.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);
    }

    handleMoneyChange(money) {
        this.setState({money: money, sum: this.state.sum + ' ' + money});
    }

    handleSumChange(value) {

    }

    render() {
        return (
            <div className='payment-component'>
                <div className='row'>
                    <Input size='xl' placeholder='Введите сумму' type='number'
                           ref={(input) => {
                               this.sumInput = input;
                           }}
                           onChange={value => this.handleSumChange(value)}
                           rightAddons={
                               <RadioGroup type='button'>
                                   {
                                       ['₽', '$', '€'].map(item => (
                                           <Radio
                                               key={item}
                                               size='s'
                                               type='button'
                                               text={item}
                                               value={item}
                                               onChange={value => this.handleMoneyChange(value)}
                                           />
                                       ))
                                   }
                               </RadioGroup>
                           }/>
                </div>
                <div className='row'>
                    <Card/>
                </div>
                <div className='row'>
                    <Button view='extra' size='xl'>Оплатить</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    null
)(App)


