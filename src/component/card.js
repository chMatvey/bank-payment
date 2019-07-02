import React from 'react'
import {connect} from "react-redux"
import Input from 'arui-feather/input'
import Button from 'arui-feather/button'
import CardInput from 'arui-feather/card-input'
import Select from 'arui-feather/select'

class Card extends React.Component {
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
        const months = [
            { value: '01', text: '01' },
            { value: '02', text: '02' },
            { value: '03', text: '03' },
            { value: '04', text: '04' },
            { value: '05', text: '05' },
            { value: '06', text: '06' },
            { value: '07', text: '07' },
            { value: '08', text: '08' },
            { value: '09', text: '09' },
            { value: '10', text: '10' },
            { value: '11', text: '11' },
            { value: '12', text: '12' },
        ];

        const thisYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 10; i++) {
            years.push({value: '0' + i, text: thisYear + i})
        }

        return (
            <div className='card'>
                <div className='row'>
                    <CardInput size='xl' placeholder='Введите номер карты'/>
                </div>
                <div className='row'>
                    <Input placeholder='Введите имя держателя карты'
                           error={ this.state.isCorrectName ? 'Только латинские символы' : null }
                           view='line'
                           size='xl'
                           value={ this.state.name }
                           onChange={ value => this.setState({
                               name: value,
                               isCorrectName: value.search(/(?<! )[-a-zA-Z' ]{1,26}/) === -1
                           }) }
                    />
                </div>
                <div className='row'>
                    <div className='column'>
                        <Select size='l' mode='radio' options={ months }/>
                    </div>
                    <div className='column'>
                        <Select size='l' mode='radio' options={ years }/>
                    </div>
                    <div className='column'>
                        <Input size='l' placeholder='CVC'
                               error={ this.state.isCorrectCVC ? 'Три цифры, на обратной стороне карты' : null }
                               view='line'
                               onChange={ value => this.setState({
                                   cvc: value,
                                   isCorrectCVC: value.search(/\d{3}/) === -1
                               }) }
                        />
                    </div>
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
)(Card)
