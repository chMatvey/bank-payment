import React from 'react'
import {connect} from "react-redux"
import Input from 'arui-feather/input'
import RadioGroup from 'arui-feather/radio-group'
import Radio from 'arui-feather/radio'
import Card from './component/card'

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
        };

        this.handleMoneyChange = this.handleMoneyChange.bind(this)
    }

    handleMoneyChange(money) {
        this.setState({money: money});
    }

    render() {
        return (
            <div className='payment-component'>
                <div className='row'>
                    <Input size='xl' placeholder='Введите сумму' type='number' rightAddons={
                        <RadioGroup type='button'>
                            {
                                ['₽', '$', '€'].map(item => (
                                    <Radio
                                        key={item}
                                        size='s'
                                        type='button'
                                        text={item}
                                        onChange={this.handleMoneyChange}
                                    />
                                ))
                            }
                        </RadioGroup>
                    }/>
                </div>
                <div className='row'>
                    <Card/>
            </div>
            </div>
        )
    }
}

export default connect(
    null,
    null
)(App)
