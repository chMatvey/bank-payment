import React from 'react';
import {connect} from "react-redux";
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import CardInput from 'arui-feather/card-input';
import Select from 'arui-feather/select';
import './card.css';
import contrast from 'contrast';
import banksDB from 'banks-db';
import Label from 'arui-feather/label'

const defaultBackgroundColor = '#eee';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sum: '',
            cardNumber: '',
            ownerName: '',
            cvc: '',
            bankName: '',
            backgroundColor: defaultBackgroundColor,
            isCorrectSum: true,
            isCorrectCardNumber: true,
            isCorrectOwnerName: true,
            isCorrectCVC: true,
        };

        this.handleMoneyChange = this.handleMoneyChange.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    }

    handleMoneyChange(money) {
        this.setState({money: money});
        this.billingForm = this.billingForm.bind(this)
    }

    handleCardNumberChange(value) {
        const bank = banksDB(value);
        if (bank.code) {
            this.setState({
                bankName: (bank.country === 'ru' ? bank.localTitle : bank.engTitle),
                backgroundColor: bank.color,
                isCorrectCardNumber: true
            })
        } else {
            this.setState({
                bankName: '',
                backgroundColor: defaultBackgroundColor,
                isCorrectCardNumber: false
            })
        }
    }

    render() {
        const thisYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 10; i++) {
            years.push({value: '0' + i, text: thisYear + i})
        }

        const months = [];
        for (let i = 1; i <= 12; i++) {
            const value = i < 10 ? '0' + i : i
            months.push({value: value, text: value})
        }

        return (
            <div className='card'
                 style={{backgroundColor: this.state.backgroundColor, fontColor: this.state.backgroundColor}}>
                <div className='row'>
                    <Label size='xl' isNoWrap={true}>{this.state.bankName}</Label>
                </div>
                <div className='row'>
                    <CardInput className='long-input' size='xl'
                               placeholder='Введите номер карты'
                               error={!this.state.isCorrectCardNumber ? 'Неверный номер карты' : null}
                               onChange={value => this.handleCardNumberChange(value)}/>
                </div>
                <div className='row'>
                    <Input className='long-input' theme='alfa-on-white' maxLength={26}
                           placeholder='Введите имя держателя карты'
                           error={!this.state.isCorrectOwnerName ? 'Только латинские символы' : null}
                           view='line'
                           size='xl'
                           value={this.state.name}
                           onChange={value => this.setState({
                               name: value,
                               isCorrectOwnerName: /^[a-zA-Z]{1,26}$/i.test(value)
                           })}
                    />
                </div>
                <div className='row'>
                    <div className='column'>
                        <Select size='l' mode='radio' options={months}/>
                    </div>
                    <div className='column'>
                        <Select size='l' mode='radio' options={years}/>
                    </div>
                    <div className='column'>
                        <Input className='cvc-input' size='l'
                               placeholder='CVC' maxLength={3}
                               error={!this.state.isCorrectCVC ? 'Три цифры, на обратной стороне карты' : null}
                               onChange={value => this.setState({
                                   cvc: value,
                                   isCorrectCVC: /^\d{3}$/i.test(value)
                               })}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    null
)(Card)
